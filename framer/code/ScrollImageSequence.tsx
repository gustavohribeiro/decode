import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useEffect, useMemo, useRef, useState, startTransition, type CSSProperties } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface ScrollImageSequenceProps {
    baseUrl: string
    prefix: string
    extension: string
    frameCount: number
    padding: number
    scrollHeight: number
    objectFit: "cover" | "contain"
    background: string
    preloadWindow: number
    startIndex: number
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
 * Scroll-scrubbed image sequence (SONIQ / Interactive Studio style).
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
        scrollHeight = 320,
        objectFit = "cover",
        background = "#000000",
        preloadWindow = 16,
        startIndex = 1,
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const trackRef = useRef<HTMLDivElement>(null)
    const [frame, setFrame] = useState(startIndex)
    const [ready, setReady] = useState(false)
    const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map())

    const total = Math.max(2, Math.floor(frameCount))
    const endIndex = startIndex + total - 1

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

        const initial: Promise<void>[] = []
        for (let i = startIndex; i < Math.min(startIndex + 10, endIndex + 1); i++) {
            const img = loadOne(i)
            initial.push(
                img.decode?.().catch(() => undefined) ??
                    new Promise<void>((resolve) => {
                        if (img.complete) resolve()
                        else {
                            img.onload = () => resolve()
                            img.onerror = () => resolve()
                        }
                    })
            )
        }

        Promise.all(initial).then(() => {
            if (!cancelled) setReady(true)
        })

        let next = startIndex + 10
        const pump = () => {
            if (cancelled || next > endIndex) return
            const chunkEnd = Math.min(next + 20, endIndex)
            for (let i = next; i <= chunkEnd; i++) loadOne(i)
            next = chunkEnd + 1
            if (next <= endIndex) {
                const ric = (window as any).requestIdleCallback
                if (typeof ric === "function") ric(pump, { timeout: 500 })
                else window.setTimeout(pump, 24)
            }
        }
        pump()

        return () => {
            cancelled = true
        }
    }, [urls, startIndex, endIndex])

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const clamped = Math.min(1, Math.max(0, v))
        const idx = startIndex + Math.round(clamped * (total - 1))
        startTransition(() => {
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

    const src = urls[Math.min(urls.length - 1, Math.max(0, frame - startIndex))] || urls[0]
    const styledHeight =
        typeof style?.height === "string" && style.height !== "auto"
            ? style.height
            : null
    const trackHeight = isStatic
        ? styledHeight ?? "100%"
        : styledHeight ?? `${Math.max(120, scrollHeight)}vh`

    return (
        <div
            ref={trackRef}
            style={{
                ...style,
                position: "relative",
                width: style?.width ?? "100%",
                height: trackHeight,
                background,
                maxWidth: "100%",
            }}
        >
            <div
                style={{
                    position: isStatic ? "relative" : "sticky",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: isStatic ? "100%" : "100vh",
                    overflow: "hidden",
                    background,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={src}
                    alt=""
                    draggable={false}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit,
                        opacity: ready || isStatic ? 1 : 0.9,
                        userSelect: "none",
                        pointerEvents: "none",
                        display: "block",
                    }}
                />
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
        title: "Scroll VH",
        defaultValue: 320,
        min: 120,
        max: 800,
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
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    preloadWindow: {
        type: ControlType.Number,
        title: "Preload",
        defaultValue: 16,
        min: 2,
        max: 40,
        step: 1,
        displayStepper: true,
    },
})
