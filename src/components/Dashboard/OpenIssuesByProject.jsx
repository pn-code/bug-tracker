import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function OpenIssuesByProject({ issues }) {
    const getIssuesLengthByProject = () => {
        const openIssues = issues.filter((issue) => issue.status != "closed");

        return openIssues.reduce((acc, currentIssue) => {
            if (acc[currentIssue.project_name]) {
                acc[currentIssue.project_name] += 1;
            } else {
                acc[currentIssue.project_name] = 1;
            }
            return acc;
        }, {});
    };

    const formattedData = () => {
        const array = [];
        for (const [key, value] of Object.entries(getIssuesLengthByProject())) {
            array.push({ name: key.slice(0,9)+"...", issues: value });
        }
        return array;
    };

    return (
        <div className="flex-1 w-full text-gray-900 mb-4 text-sm">
            <h2 className="text-xl mb-4 text-white">Open Issues by Project</h2>
            <BarChart
                width={300}
                height={200}
                data={formattedData()}
                margin={{top: 0, right: 0, left:0, bottom:0}}
            >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="issues" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
