import React from "react";
import Link from "next/link";

const Projects = () => {
    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Projects</h1>
                    <div className="text-[16px] font-semibold flex gap-2">
                        <Link
                            href="/projects/new"
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                        >
                            Add Project
                        </Link>
                    </div>
                </header>

                {/* Sorting Row */}
                <table className="w-full">
                    <tr className="bg-gray-300 h-10 text-sm sm:text-[16px]">
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>Target End Date</th>
                        <th>Actual End Date</th>
                    </tr>
                </table>
            </section>
        </div>
    );
};

export default Projects;
