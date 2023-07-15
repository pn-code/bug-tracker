import { ArrowUp, BookMarked } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LineChart, Line } from "recharts";

export default function StatCard({ title, stat, data, navLink, color, closedIssuesPercentage }) {
    // const datas = [
    //     { name: "Page A", uv: 400, amt: 2400 },
    //     { name: "Page B", uv: 600, amt: 2600 },
    //     { name: "Page C", uv: 300, amt: 2200 },
    //     { name: "Page D", uv: 400, amt: 2200 },
    // ];

    // const renderLineChart = (
    //     <LineChart width={120} height={50} data={datas}>
    //         <Line type="monotone" dataKey="uv" stroke={color} />
    //     </LineChart>
    // );

    const textColor = `text-[${color}]`;

    console.log(textColor)

    return (
        <article className="flex min-h-[180px] min-w-[360px] flex-col gap-4 w-full py-4 px-6 border rounded-md border-gray-300">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <BookMarked color={color} />
                    <h2 className="text-lg">{title}</h2>
                </div>
                {/* {renderLineChart} */}
            </header>

            <span className="text-2xl font-semibold">{stat}</span>

            <div className="flex justify-between items-end">
                <Link href={navLink} className="text-gray-200 underline text-sm hover:text-gray-300">
                    View all
                </Link>
                {data && <div className="flex flex-col items-end">
                    <div className="flex gap-1 items-center text-lg font-bold text-green-600"><ArrowUp/> {data ? data.length: "21%"}</div>
                    <span className="text-sm text-gray-400">this month</span>
                </div>}
                {closedIssuesPercentage && <div className="flex flex-col items-end">
                    <div className="flex items-center text-lg font-bold text-green-600">{closedIssuesPercentage}%</div>
                    <span className="text-sm text-gray-400">all time</span>
                </div>}
            </div>
        </article>
    );
}
