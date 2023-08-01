import Link from "next/link";
import React from "react";

export default function RecentIssueCard({ issue }) {
    const shortenString = (str) =>
        str.length > 20 ? str.slice(0, 18) + "..." : str;

    const handlePriority = (status) => {
        if (status == "high") {
            return "HIGH";
        } else if (status == "medium") {
            return "MED";
        } else {
            return "LOW";
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td
                scope="row"
                className="hidden sm:table-cell px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {issue.created_by_name}
            </td>
            <td className="px-6 py-4">
                <Link
                    className="underline hover:text-green-500"
                    href={`/issues/${issue.id}`}
                >
                    {issue.title && shortenString(issue.title)}
                </Link>
            </td>
            <td className="hidden sm:table-cell px-6 py-4">
                {issue.priority && handlePriority(issue.priority)}
            </td>
            <td className="px-6 py-4">{issue.status}</td>
        </tr>
    );
}
