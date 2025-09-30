import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const LIGHT_COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
const DARK_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#60a5fa"];

export default function ComparisonChart({ data, series = [], type = "bar", stacked = false }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        setIsDark(html.classList.contains("dark"));

        const observer = new MutationObserver(() => {
            setIsDark(html.classList.contains("dark"));
        });
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    if (!data || !series || series.length === 0) return <div>No data provided</div>;

    const ChartComponent = type === "line" ? LineChart : BarChart;
    const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;
    const textColor = isDark ? "#f3f4f6" : "#111827";

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ChartComponent data={data}>
                <CartesianGrid stroke={isDark ? "#374151" : "#e5e7eb"} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={textColor} />
                <YAxis stroke={textColor} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? "#374151" : "#ffffff",
                        color: textColor,
                        border: "none",
                    }}
                    itemStyle={{ color: textColor }}
                />
                <Legend wrapperStyle={{ color: textColor }} />
                {series.map((key, index) =>
                    type === "line" ? (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={2}
                        />
                    ) : (
                        <Bar
                            key={key}
                            dataKey={key}
                            stackId={stacked ? "a" : undefined}
                            fill={COLORS[index % COLORS.length]}
                        />
                    )
                )}
            </ChartComponent>
        </ResponsiveContainer>
    );
}
