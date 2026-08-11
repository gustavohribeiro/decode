import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import {
    Children,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface ScrollFadeScreensProps {
    screens: ReactNode
    vhPerScreen: number
    fadeSpread: number
    background: string
    style?: CSSProperties
}

/**
 * Full-viewport feature screens with scroll-driven crossfade.
 * Solid black stage stays opaque — only screen content fades,
 * matching Interactive Studio Motion Flow (no sticky see-through).
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
export default function ScrollFadeScreens(props: ScrollFadeScreensProps) {
    const {
        screens = null,
        vhPerScreen = 100,
        fadeSpread = 0.35,
        background = "#000000",
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const trackRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)

    const items = useMemo(() => Children.toArray(screens).filter(Boolean), [screens])
    const count = Math.max(1, items.length)
    const per = Math.max(60, vhPerScreen)
    const totalVh = count * per

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    })

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setProgress(Math.min(1, Math.max(0, v)))
    })

    useEffect(() => {
        // Ensure first paint uses current scroll if remounted mid-page
        setProgress(scrollYProgress.get())
    }, [scrollYProgress])

    const opacities = useMemo(() => {
        if (count <= 1) return [1]
        // progress 0→1 maps across screens 0→count-1; adjacent screens crossfade
        const index = progress * (count - 1)
        const spread = Math.min(1, Math.max(0.35, fadeSpread * 2))
        return items.map((_, i) => {
            const dist = Math.abs(index - i)
            return Math.max(0, Math.min(1, 1 - dist / spread))
        })
    }, [progress, count, fadeSpread, items])

    const stage: CSSProperties = {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background,
    }

    const layerBase: CSSProperties = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        pointerEvents: "none",
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
                <div style={{ ...layerBase, opacity: 1, pointerEvents: "auto" }}>
                    {items[0] ?? null}
                </div>
            </div>
        )
    }

    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: style?.width ?? "100%",
                height: style?.height && style.height !== "auto" ? style.height : `${totalVh}vh`,
                minHeight: `${totalVh}vh`,
                maxWidth: "100%",
                background,
            }}
        >
            {/* Sticky opaque stage — screens crossfade inside; never see through */}
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
                {/* Always-on black so fades never reveal page content underneath */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        background,
                        zIndex: 0,
                    }}
                />
                {items.map((child, i) => {
                    const opacity = opacities[i] ?? 0
                    const active = opacity > 0.05
                    return (
                        <div
                            key={i}
                            style={{
                                ...layerBase,
                                opacity,
                                zIndex: i + 1,
                                pointerEvents: active ? "auto" : "none",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {child}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Scroll distance for N screens */}
            <div
                ref={trackRef}
                style={{
                    position: "relative",
                    marginTop: "-100vh",
                    zIndex: 1,
                    width: "100%",
                    height: `${totalVh}vh`,
                    pointerEvents: "none",
                }}
            />
        </div>
    )
}

addPropertyControls(ScrollFadeScreens, {
    screens: {
        type: ControlType.Slot,
        title: "Screens",
    },
    vhPerScreen: {
        type: ControlType.Number,
        title: "VH / Screen",
        defaultValue: 100,
        min: 60,
        max: 200,
        step: 5,
        unit: "vh",
    },
    fadeSpread: {
        type: ControlType.Number,
        title: "Fade",
        defaultValue: 0.35,
        min: 0.1,
        max: 0.45,
        step: 0.01,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
})
