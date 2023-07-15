import React from "react";
import RecentIssueCard from "./RecentIssueCard";

export default function RecentIssues({ issues }) {
    return (
        <div className="h-full w-full flex-1">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className="text-xl mb-4">Recent Issues</h2>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Issue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Priority
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Display 10 most recent issues */}
                        {issues.slice(0, 10).map((issue) => (
                            <RecentIssueCard key={issue.id} issue={issue} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
