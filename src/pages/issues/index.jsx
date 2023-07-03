import React, { useState, useEffect } from "react";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";
import serverAPI from "@/api/axios";
import Pagination from "@/components/Pagination";
import { GoSearch } from "react-icons/go";

const Issues = ({ issues }) => {
    // Searchbar Functionality
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredIssues, setFilteredIssues] = useState(issues);
    const [showClosedIssues, setShowClosedIssues] = useState(false);

    useEffect(() => {
        // Filter issues based on search term
        const handleSearch = () => {
            const newFilteredIssues = issues.filter(
                (issue) =>
                    issue.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    issue.project_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredIssues(newFilteredIssues);
        };

        handleSearch();
    }, [searchTerm, issues]);

    // Filter closed issues
    const allIssues = filteredIssues;
    const onlyOpenIssues = filteredIssues.filter(
        (issue) => issue.status != "closed"
    );
    const displayedIssues = showClosedIssues ? allIssues : onlyOpenIssues;

    // Setting up pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Get current issues
    const indexOfLastIssue = currentPage * itemsPerPage;
    const indexOfFirstIssue = indexOfLastIssue - itemsPerPage;
    const currentIssues = displayedIssues.slice(
        indexOfFirstIssue,
        indexOfLastIssue
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="h-[100vh] w-[100%] text-text">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <section className="flex flex-col">
                        <h1 className="text-2xl font-bold">Issues</h1>

                        <section className="flex justify-start gap-2">
                            <input
                                checked={showClosedIssues}
                                onChange={(e) =>
                                    setShowClosedIssues(e.target.checked)
                                }
                                className="w-5"
                                type="checkbox"
                                name="show_closed_issues"
                                id="show_closed_issues"
                            />
                            <label htmlFor="show_closed_issues">
                                Show Closed Issues
                            </label>
                        </section>
                    </section>

                    {/* Searchbar */}
                    <form className="sm:flex items-center gap-2 bg-slate-200 relative hidden rounded-md">
                        <GoSearch
                            className="absolute left-2 top-2"
                            size={18}
                            color={"black"}
                        />
                        <input
                            className="w-full focus:border-2 focus:border-accent outline-none rounded-md px-12 h-8 text-background"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder="Search for issues."
                            aria-label="Search bar"
                        />
                    </form>

                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/issues/new"
                            className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-md"
                        >
                            Add Issue
                        </Link>
                    </div>
                </header>

                {/* Sorting Row */}
                <table className="w-full">
                    <tbody>
                        <tr className="bg-primary h-10 text-xs sm:text-[16px]">
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
                    totalItems={displayedIssues.length}
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
