import React, { useState } from "react";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";
import serverAPI from "@/api/axios";
import Pagination from "@/components/Pagination";

const Issues = ({ issues }) => {
    // Setting up pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get current issues
    const indexOfLastIssue = currentPage * itemsPerPage;
    const indexOfFirstIssue = indexOfLastIssue - itemsPerPage;
    const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-100 h-[100vh] w-[100%]">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Issues</h1>

                    {/* Searchbar */}
                    <form>
                        <label htmlFor="search">Search: </label>
                        <input
                            onChange={(e) => setText(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder="Search..."
                        />
                    </form>

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
                            ? currentIssues.map((issue) => (
                                  <IssueCard issue={issue} key={issue.id} />
                              ))
                            : "No Issues Found"}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={issues.length}
                    paginate={paginate}
                />
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
            issues: issuesRes.data.issues,
        },
    };
}
