import React from "react";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <div className="bg-gray-100 h-[100vh] w-full">
                <section className="mx-4 pt-5 flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Project Title</h1>
                        <div className="text-[16px] font-semibold flex gap-2">
                            <Link
                                href="/projects"
                                className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                            >
                                Back to Projects
                            </Link>
                        </div>
                    </header>

                    {/* Project Information */}
                    <div className="flex w-full gap-2 justify-between">
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full flex-[2]">
                            <h1 className="font-semibold text-xl">
                                Project Information
                            </h1>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Project Title:
                                </h2>
                                <p>Project Title</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Start Date:</h2>
                                <p>Start Date:</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Target End Date:
                                </h2>
                                <p>Target End Date</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">
                                    Actual End Date:
                                </h2>
                                <p>Actual End Date</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Created on:</h2>
                                <p>Created on</p>
                            </article>
                        </section>

                        {/* Users Assigned to Project */}
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full flex-1">
                            <h1 className="font-semibold text-xl">
                                Users Assigned
                            </h1>
                            <section className="overflow-scroll-y">
                                <article>User</article> 
                                <article>User</article>
                                <article>User</article> 
                                <article>User</article>
                                <article>User</article>
                                <article>User</article>
                                <article>User</article>
                                <article>User</article>
                            </section>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectDetails;
