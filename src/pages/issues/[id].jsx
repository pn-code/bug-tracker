import React from "react";
import Link from "next/link";
import IssueHistoryCard from "@/components/IssueHistoryCard";
import IssueCommentCard from "@/components/IssueCommentCard";

const IssueDetails = () => {
    return (
        <div>
            <div className="bg-gray-100 h-[100vh] w-full">
                <section className="mx-4 pt-5 flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Issue Title</h1>
                        <div className="text-[16px] font-semibold flex gap-2">
                            <Link
                                href="/issues"
                                className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                            >
                                Back to Issues
                            </Link>
                        </div>
                    </header>

                    {/* Issue Information */}
                    <div className="flex w-full gap-2 justify-between flex-col">
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full">
                            <h1 className="font-semibold text-xl">
                                Issue Information
                            </h1>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Issue Title:</h2>
                                <p>Issue Title</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Issue Summary:
                                </h2>
                                <p>Issue Summary</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Project Title:
                                </h2>
                                <p>Project Title</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Priority:</h2>
                                <p>Priority</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Assigned User</h2>
                                <p>Assigned User</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Identified Date:
                                </h2>
                                <p>Identified Date</p>
                            </article>
                        </section>

                        {/* Issue History */}
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full">
                            <h1 className="font-semibold text-xl">
                                Issue History
                            </h1>
                            <table className="text-left">
                                <tr>
                                    <th>Property</th>
                                    <th>Old Value</th>
                                    <th>New Value</th>
                                    <th>Date Modified</th>
                                </tr>
                                <IssueHistoryCard />
                            </table>
                        </section>

                        {/* Issue Comments */}
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full">
                            <h1 className="font-semibold text-xl">
                                Issue Comments
                            </h1>
                            <table className="text-left">
                                <tr>
                                    <th>User</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                                <IssueCommentCard />
                            </table>
                            <form className="flex flex-col gap-2">
                                <label htmlFor="comment">Comment: </label>
                                <textarea
                                    className="rounded-md px-2 py-1 resize-none"
                                    type="text"
                                    placeholder="comment"
                                    id="comment"
                                ></textarea>
                                <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md">
                                    Submit
                                </button>
                            </form>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default IssueDetails;
