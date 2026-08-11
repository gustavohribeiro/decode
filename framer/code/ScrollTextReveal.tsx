import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useMemo, useRef, useState, type CSSProperties } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface ScrollTextRevealProps {
    text: string
    trackHeight: number
    fontSize: number
    fontFamily: string
    fontWeight: number
    letterSpacing: string
    lineHeight: string
    maxWidth: number
    color: string
    dimColor: string
    blur: number
    background: string
    style?: CSSProperties
}

/**
 * Sticky full-viewport quote whose words sharpen from blurred/dim to
 * white as the user scrolls — matching the SONIQ immersion quote.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
export default function ScrollTextReveal(props: ScrollTextRevealProps) {
    const {
        text = "True immersion happens when the line between the physical and the digital disappears.",
        trackHeight = 220,
        fontSize = 44,
        fontFamily = "Host Grotesk",
        fontWeight = 300,
        letterSpacing = "-0.02em",
        lineHeight = "130%",
        maxWidth = 760,
        color = "#ffffff",
        dimColor = "rgba(255,255,255,0.16)",
        blur = 6,
        background = "#000000",
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const trackRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    })

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setProgress(Math.min(1, Math.max(0, v)))
    })

    const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

    const textStyle: CSSProperties = {
        fontFamily: `'${fontFamily}', sans-serif`,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight,
        maxWidth,
        textAlign: "center",
        margin: 0,
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <p style={{ ...textStyle, color }}>{text}</p>
            </div>
        )
    }

    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: style?.width ?? "100%",
                height: `${Math.max(120, trackHeight)}vh`,
                minHeight: `${Math.max(120, trackHeight)}vh`,
                background,
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background,
                    overflow: "hidden",
                    padding: "0 48px",
                    boxSizing: "border-box",
                }}
            >
                <p style={textStyle} aria-label={text}>
                    {words.map((word, i) => {
                        // Each word reveals across its slice of scroll progress
                        const per = 1 / words.length
                        const start = i * per * 0.9
                        const t = Math.min(1, Math.max(0, (progress - start) / (per * 1.6)))
                        const revealed = t
                        return (
                            <span
                                key={i}
                                style={{
                                    color:
                                        revealed >= 1
                                            ? color
                                            : revealed <= 0
                                              ? dimColor
                                              : `rgba(255,255,255,${0.16 + 0.84 * revealed})`,
                                    filter:
                                        revealed >= 1
                                            ? "none"
                                            : `blur(${(1 - revealed) * blur}px)`,
                                    transition: "color 0.1s linear, filter 0.1s linear",
                                }}
                            >
                                {word}
                                {i < words.length - 1 ? " " : ""}
                            </span>
                        )
                    })}
                </p>
            </div>
            <div
                ref={trackRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                }}
            />
        </div>
    )
}

addPropertyControls(ScrollTextReveal, {
    text: {
        type: ControlType.String,
        title: "Text",
        displayTextArea: true,
        defaultValue:
            "True immersion happens when the line between the physical and the digital disappears.",
    },
    trackHeight: {
        type: ControlType.Number,
        title: "Track VH",
        defaultValue: 220,
        min: 120,
        max: 400,
        step: 10,
        unit: "vh",
    },
    fontSize: {
        type: ControlType.Number,
        title: "Size",
        defaultValue: 44,
        min: 16,
        max: 96,
        step: 1,
        unit: "px",
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font",
        defaultValue: "Host Grotesk",
    },
    fontWeight: {
        type: ControlType.Number,
        title: "Weight",
        defaultValue: 300,
        min: 100,
        max: 900,
        step: 100,
    },
    letterSpacing: {
        type: ControlType.String,
        title: "Tracking",
        defaultValue: "-0.02em",
    },
    lineHeight: {
        type: ControlType.String,
        title: "Leading",
        defaultValue: "130%",
    },
    maxWidth: {
        type: ControlType.Number,
        title: "Max W",
        defaultValue: 760,
        min: 300,
        max: 1200,
        step: 10,
        unit: "px",
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#ffffff",
    },
    dimColor: {
        type: ControlType.Color,
        title: "Dim",
        defaultValue: "rgba(255,255,255,0.16)",
    },
    blur: {
        type: ControlType.Number,
        title: "Blur",
        defaultValue: 6,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
})
