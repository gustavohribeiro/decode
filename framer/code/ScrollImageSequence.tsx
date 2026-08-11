import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface ScrollImageSequenceProps {
    baseUrl: string
    prefix: string
    extension: string
    frameCount: number
    padding: number
    scrollHeight: number
    holdHeight: number
    objectFit: "cover" | "contain"
    objectPosition: string
    background: string
    preloadWindow: number
    startIndex: number
    overlay: ReactNode
    overlayFill: string
    overlayBlur: number
    style?: CSSProperties
}

function padFrame(index: number, padding: number) {
    const n = String(Math.max(0, index))
    return padding > 0 ? n.padStart(padding, "0") : n
}

function frameUrl(
    baseUrl: string,
    prefix: string,
    extension: string,
    padding: number,
    index: number
) {
    const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
    const ext = extension.startsWith(".") ? extension : `.${extension}`
    return `${base}${prefix}${padFrame(index, padding)}${ext}`
}

/**
 * Sticky scroll image sequence. Scrubs frames, then holds the last frame
 * while slotted overlay content (e.g. Designed Around You) scrolls over
 * with a frosted/blurred panel — matching the SONIQ reference.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
export default function ScrollImageSequence(props: ScrollImageSequenceProps) {
    const {
        baseUrl = "https://scroll-sequence-prod.s3.eu-central-1.amazonaws.com/12399f38-2c8e-412a-868a-8e5893122cd5/",
        prefix = "frame",
        extension = ".jpg",
        frameCount = 283,
        padding = 5,
        scrollHeight = 280,
        holdHeight = 120,
        objectFit = "cover",
        objectPosition = "center bottom",
        background = "#000000",
        preloadWindow = 24,
        startIndex = 1,
        overlay = null,
        overlayFill = "rgba(0, 0, 0, 0.22)",
        overlayBlur = 50,
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const trackRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef(startIndex)
    const [frame, setFrame] = useState(startIndex)
    const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map())
    const rafRef = useRef(0)

    const total = Math.max(2, Math.floor(frameCount))
    const endIndex = startIndex + total - 1
    const scrubVh = Math.max(120, scrollHeight)
    const holdVh = Math.max(40, holdHeight)

    // Progress is measured across scrub + hold spacers only.
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    })

    const urls = useMemo(() => {
        const list: string[] = []
        for (let i = startIndex; i <= endIndex; i++) {
            list.push(frameUrl(baseUrl, prefix, extension, padding, i))
        }
        return list
    }, [baseUrl, prefix, extension, padding, startIndex, endIndex])

    useEffect(() => {
        if (typeof window === "undefined") return
        let cancelled = false
        const cache = cacheRef.current
        cache.clear()

        const loadOne = (index: number) => {
            if (cache.has(index)) return cache.get(index)!
            const img = new Image()
            img.decoding = "async"
            img.src = urls[index - startIndex]
            cache.set(index, img)
            return img
        }

        for (
            let i = startIndex;
            i < Math.min(startIndex + 16, endIndex + 1);
            i++
        ) {
            loadOne(i)
        }

        let next = startIndex + 16
        const pump = () => {
            if (cancelled || next > endIndex) return
            const chunkEnd = Math.min(next + 24, endIndex)
            for (let i = next; i <= chunkEnd; i++) loadOne(i)
            next = chunkEnd + 1
            if (next <= endIndex) {
                const ric = (window as any).requestIdleCallback
                if (typeof ric === "function") ric(pump, { timeout: 400 })
                else window.setTimeout(pump, 16)
            }
        }
        pump()

        return () => {
            cancelled = true
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [urls, startIndex, endIndex])

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const scrubPortion = scrubVh / (scrubVh + holdVh)
        const local = Math.min(1, Math.max(0, v / Math.max(0.0001, scrubPortion)))
        const idx = startIndex + Math.round(local * (total - 1))
        if (idx === frameRef.current) return
        frameRef.current = idx

        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
            setFrame(idx)
            const cache = cacheRef.current
            const from = Math.max(startIndex, idx - preloadWindow)
            const to = Math.min(endIndex, idx + preloadWindow)
            for (let i = from; i <= to; i++) {
                if (!cache.has(i)) {
                    const img = new Image()
                    img.decoding = "async"
                    img.src = urls[i - startIndex]
                    cache.set(i, img)
                }
            }
        })
    })

    const src =
        urls[Math.min(urls.length - 1, Math.max(0, frame - startIndex))] ||
        urls[0]

    const imgStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit,
        objectPosition,
        userSelect: "none",
        pointerEvents: "none",
        display: "block",
    }

    if (isStatic) {
        return (
            <div
                style={{
                    ...style,
                    position: "relative",
                    width: "100%",
                    height: style?.height ?? "100%",
                    background,
                    overflow: "hidden",
                }}
            >
                <img src={src} alt="" draggable={false} style={imgStyle} />
            </div>
        )
    }

    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: style?.width ?? "100%",
                height: style?.height && style.height !== "auto" ? style.height : `${scrubVh + holdVh}vh`,
                minHeight: `${scrubVh + holdVh}vh`,
                maxWidth: "100%",
                background,
            }}
        >
            {/* Sticky media plane */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    background,
                    zIndex: 0,
                }}
            >
                <img src={src} alt="" draggable={false} style={imgStyle} />
            </div>

            {/* Scroll track pulled up over the sticky viewport */}
            <div
                ref={trackRef}
                style={{
                    position: "relative",
                    marginTop: "-100vh",
                    zIndex: 1,
                    width: "100%",
                }}
            >
                {/* Scrub distance — frames advance here */}
                <div style={{ height: `${scrubVh}vh`, width: "100%" }} />

                {/* Hold + overlay (Designed Around You) scrolls over last frame */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        minHeight: `${holdVh}vh`,
                        background: overlayFill,
                        backdropFilter: `blur(${overlayBlur}px)`,
                        WebkitBackdropFilter: `blur(${overlayBlur}px)`,
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        boxSizing: "border-box",
                    }}
                >
                    {overlay}
                </div>
            </div>
        </div>
    )
}

addPropertyControls(ScrollImageSequence, {
    baseUrl: {
        type: ControlType.String,
        title: "Base URL",
        defaultValue:
            "https://scroll-sequence-prod.s3.eu-central-1.amazonaws.com/12399f38-2c8e-412a-868a-8e5893122cd5/",
    },
    prefix: {
        type: ControlType.String,
        title: "Prefix",
        defaultValue: "frame",
    },
    extension: {
        type: ControlType.String,
        title: "Extension",
        defaultValue: ".jpg",
    },
    frameCount: {
        type: ControlType.Number,
        title: "Frames",
        defaultValue: 283,
        min: 2,
        max: 600,
        step: 1,
        displayStepper: true,
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 5,
        min: 0,
        max: 8,
        step: 1,
        displayStepper: true,
    },
    startIndex: {
        type: ControlType.Number,
        title: "Start #",
        defaultValue: 1,
        min: 0,
        max: 100,
        step: 1,
        displayStepper: true,
    },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scrub VH",
        defaultValue: 280,
        min: 120,
        max: 800,
        step: 10,
        unit: "vh",
    },
    holdHeight: {
        type: ControlType.Number,
        title: "Hold VH",
        defaultValue: 120,
        min: 40,
        max: 300,
        step: 10,
        unit: "vh",
    },
    objectFit: {
        type: ControlType.Enum,
        title: "Fit",
        options: ["cover", "contain"],
        optionTitles: ["Cover", "Contain"],
        defaultValue: "cover",
    },
    objectPosition: {
        type: ControlType.String,
        title: "Position",
        defaultValue: "center bottom",
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    preloadWindow: {
        type: ControlType.Number,
        title: "Preload",
        defaultValue: 24,
        min: 2,
        max: 60,
        step: 1,
        displayStepper: true,
    },
    overlayFill: {
        type: ControlType.Color,
        title: "Overlay Fill",
        defaultValue: "rgba(0,0,0,0.22)",
    },
    overlayBlur: {
        type: ControlType.Number,
        title: "Overlay Blur",
        defaultValue: 50,
        min: 0,
        max: 80,
        step: 1,
        unit: "px",
    },
    overlay: {
        type: ControlType.Slot,
        title: "Overlay",
    },
})
