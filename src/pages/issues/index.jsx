import React from "react";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";

const Issues = () => {
    return (
        <div className="bg-gray-100 h-[100vh] w-[100%]">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Issues</h1>
                    <div className="text-[16px] font-semibold">
                        <Link href="/issues/new" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md">
                            Add Issue
                        </Link>
                    </div>
                </header>

                {/* Sorting Row */}
                <table className="w-full">
                    <tr className="bg-gray-300 h-10 text-sm sm:text-[16px]">
                        <th>Summary</th>
                        <th>Project</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned User</th>
                        <th>Identified Date</th>
                    </tr>
                    <IssueCard/>
                </table>
            </section>
        </div>
    );
};

export default Issues;
