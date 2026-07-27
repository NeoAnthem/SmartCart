import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function RevenueChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

        <AreaChart
            data={data}
            margin={{
                top: 20,
                right: 25,
                left: 20,
                bottom: 10
            }}
        >

                <defs>

                    <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.55}
                        />

                        <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                        />

                    </linearGradient>

                </defs>

                <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="rgba(255,255,255,.08)"
                />

                <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                    width={90}
                    tickFormatter={(value) => {

                        if (value >= 10000000)
                            return `₹ ${(value / 10000000).toFixed(1)} Cr -`;

                        if (value >= 100000)
                            return `₹ ${(value / 100000).toFixed(0)} L -`;

                        if (value >= 1000)
                            return `₹ ${(value / 1000).toFixed(0)} K -`;

                        return `₹ ${value}`;

                    }}
                />

                <Tooltip
                    cursor={{
                        stroke: "#8b5cf6",
                        strokeWidth: 2
                    }}
                    contentStyle={{
                        background: "#201a36",
                        border: "1px solid rgba(139,92,246,.35)",
                        borderRadius: "14px",
                        color: "white",
                        boxShadow: "0 12px 35px rgba(0,0,0,.45)"
                    }}
                    labelStyle={{
                        color: "#fff",
                        fontWeight: "600"
                    }}
                    formatter={(value) => [
                        `₹ ${Number(value).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`,
                        "Revenue"
                    ]}
                />

                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                    fill="url(#revenueGradient)"
                    animationDuration={1200}
                    animationEasing="ease-out"
                    dot={{
                        r: 5,
                        fill: "#8b5cf6",
                        stroke: "#fff",
                        strokeWidth: 2
                    }}
                    activeDot={{
                        r: 8,
                        fill: "#a855f7",
                        stroke: "#fff",
                        strokeWidth: 3
                    }}
                />

            </AreaChart>

        </ResponsiveContainer>

    );

}

export default RevenueChart;