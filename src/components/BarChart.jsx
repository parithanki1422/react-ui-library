import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function MyBarChart({ data, height = 250 }) {
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
        bar: isDark ? "#818cf8" : "#4f46e5",          
        tooltipBg: isDark ? "#374151" : "#ffffff",
        tooltipText: isDark ? "#f3f4f6" : "#111827",
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
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
                <Bar dataKey="value" fill={colors.bar} />
            </BarChart>
        </ResponsiveContainer>
    );
}
