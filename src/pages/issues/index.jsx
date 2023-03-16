import React from "react";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";
import serverAPI from "@/api/axios";

const Issues = ({ issues }) => {
    return (
        <div className="bg-gray-100 h-[100vh] w-[100%]">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Issues</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/issues/new"
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                        >
                            Add Issue
                        </Link>
                    </div>
                </header>

                {/* Sorting Row */}
                <table className="w-full">
                    <tbody>
                        <tr className="bg-gray-300 h-10 text-sm sm:text-[16px]">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Project</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Assigned User</th>
                            <th>Identified Date</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {issues
                            ? issues.map((issue) => (
                                  <IssueCard issue={issue} key={issue.id} />
                              ))
                            : "No Issues Found"}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Issues;

export async function getServerSideProps() {
    const issuesRes = await serverAPI.get("/api/v1/issues");

    // Pass data to the page via props
    return {
        props: {
            issues: issuesRes.data.data.issues,
        },
    };
}
