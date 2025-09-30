import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function MyLineChart({ data, height = 250 }) {
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

    const colors = {
        grid: isDark ? "#374151" : "#e5e7eb",
        text: isDark ? "#f3f4f6" : "#111827",
        line: isDark ? "#6366f1" : "#4f46e5",
        tooltipBg: isDark ? "#374151" : "#ffffff",
        tooltipText: isDark ? "#f3f4f6" : "#111827",
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={colors.text} />
                <YAxis stroke={colors.text} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: colors.tooltipBg,
                        color: colors.tooltipText,
                        border: "none",
                    }}
                    itemStyle={{ color: colors.tooltipText }}
                />
                <Legend wrapperStyle={{ color: colors.text }} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={colors.line}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
