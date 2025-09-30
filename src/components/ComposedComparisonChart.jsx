import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";

const chartElementsMap = {
    "bar-line": [
        { type: "Bar", props: { dataKey: "Sales", fill: "#4f46e5" } },
        { type: "Line", props: { dataKey: "Revenue", stroke: "#10b981", strokeWidth: 2 } },
    ],
    "line-scatter": [
        { type: "Line", props: { type: "monotone", dataKey: "Sales", stroke: "#f59e0b", strokeWidth: 2, name: "Sales" } },
        { type: "Scatter", props: { dataKey: "Revenue", fill: "#ef4444", name: "Revenue", r: 6 } }
    ],
    "bar-line-area": [
        { type: "Bar", props: { dataKey: "Sales", barSize: 20, fill: "#3b82f6" } },
        { type: "Line", props: { type: "monotone", dataKey: "Revenue", stroke: "#10b981", strokeWidth: 2 } },
        { type: "Area", props: { type: "monotone", dataKey: "Profit", fill: "#eb9393ff", stroke: "#ef4444" } },
    ],
};

export default function ComposedComparisonChart({ data = [], type = "bar-line" }) {
    const elements = chartElementsMap[type] || [];

    if (!elements.length) return <p>No chart elements found for type: {type}</p>;

    return (
        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {type.replace(/-/g, " ").toUpperCase()}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                    <XAxis dataKey="month" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip
                        wrapperClassName="!bg-white dark:!bg-gray-800 !border !border-gray-200 dark:!border-gray-700 !rounded-md !shadow-lg"
                        contentStyle={{ backgroundColor: "transparent" }}
                        formatter={(value, name, props) => {
                            return [
                                value,
                                name,
                                { color: props?.stroke || props?.fill || "#000" },
                            ];
                        }}
                    />

                    <Legend wrapperStyle={{ color: "inherit" }} />
                    {elements.map((el, idx) => {
                        const { type, props } = el;
                        switch (type) {
                            case "Bar":
                                return <Bar key={idx} {...props} />;
                            case "Line":
                                return <Line key={idx} {...props} />;
                            case "Area":
                                return <Area key={idx} {...props} />;
                            case "Scatter":
                                return <Scatter key={idx} {...props} />;
                            default:
                                return null;
                        }
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
