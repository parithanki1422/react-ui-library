import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";

const LIGHT_COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#ef2199ff"];
const DARK_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#f29acdff"];

export default function MyPieChart({ data, height = 250 }) {
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

    const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;
    const textColor = isDark ? "#f3f4f6" : "#111827"; 

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? "#374151" : "#ffffff",
                        color: textColor,
                        border: "none",
                    }}
                    itemStyle={{ color: textColor }}
                />
                <Legend wrapperStyle={{ color: textColor }} />
            </PieChart>
        </ResponsiveContainer>
    );
}
