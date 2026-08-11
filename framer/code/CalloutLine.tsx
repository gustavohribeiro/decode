import { addPropertyControls, ControlType } from "framer"
import { useMemo, type CSSProperties } from "react"

interface CalloutLineProps {
    points: string
    color: string
    thickness: number
    dotAt: "start" | "end" | "none"
    dotSize: number
    dotColor: string
    style?: CSSProperties
}

/**
 * Thin callout line (polyline) with an endpoint dot, like the
 * SONIQ feature annotations. Points are "x,y x,y ..." percentages
 * of the component's box.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 300
 * @framerIntrinsicHeight 200
 */
export default function CalloutLine(props: CalloutLineProps) {
    const {
        points = "0,100 40,100 100,0",
        color = "rgba(255,255,255,0.35)",
        thickness = 1,
        dotAt = "end",
        dotSize = 5,
        dotColor = "#ffffff",
        style,
    } = props

    const parsed = useMemo(() => {
        return points
            .trim()
            .split(/\s+/)
            .map((pair) => {
                const [x, y] = pair.split(",").map(Number)
                return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0 }
            })
            .filter((p) => p !== null)
    }, [points])

    const dotPoint =
        dotAt === "none" || parsed.length === 0
            ? null
            : dotAt === "start"
              ? parsed[0]
              : parsed[parsed.length - 1]

    return (
        <div
            style={{
                ...style,
                position: style?.position ?? "relative",
                pointerEvents: "none",
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: "absolute", inset: 0, display: "block", overflow: "visible" }}
            >
                <polyline
                    points={parsed.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            {dotPoint && (
                <div
                    style={{
                        position: "absolute",
                        left: `${dotPoint.x}%`,
                        top: `${dotPoint.y}%`,
                        width: dotSize,
                        height: dotSize,
                        marginLeft: -dotSize / 2,
                        marginTop: -dotSize / 2,
                        borderRadius: "50%",
                        background: dotColor,
                        boxShadow: `0 0 8px 2px ${dotColor}55`,
                    }}
                />
            )}
        </div>
    )
}

addPropertyControls(CalloutLine, {
    points: {
        type: ControlType.String,
        title: "Points",
        defaultValue: "0,100 40,100 100,0",
    },
    color: {
        type: ControlType.Color,
        title: "Line",
        defaultValue: "rgba(255,255,255,0.35)",
    },
    thickness: {
        type: ControlType.Number,
        title: "Width",
        defaultValue: 1,
        min: 0.5,
        max: 4,
        step: 0.5,
    },
    dotAt: {
        type: ControlType.Enum,
        title: "Dot",
        options: ["end", "start", "none"],
        optionTitles: ["End", "Start", "None"],
        defaultValue: "end",
    },
    dotSize: {
        type: ControlType.Number,
        title: "Dot Size",
        defaultValue: 5,
        min: 2,
        max: 12,
        step: 1,
    },
    dotColor: {
        type: ControlType.Color,
        title: "Dot Color",
        defaultValue: "#ffffff",
    },
})
