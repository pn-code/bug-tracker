import React from "react";

const Issues = () => {
    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <section className="mx-4 pt-5">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Issues</h1>
                    <div className="text-[16px] font-semibold">
                        <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md">
                            Add Issue
                        </button>
                    </div>
                </header>

                {/* Sorting Row */}
                <section className="my-4 font-semibold bg-gray-300 px-4 py-2 text-sm rounded-md">
                    <ul className="flex justify-between">
                        <li>Summary</li>
                        <li>Project</li>
                        <li>Priority</li>
                        <li>Status</li>
                        <li>Assigned to</li>
                        <li>Identified Date</li>
                    </ul>
                </section>

                
            </section>
        </div>
    );
};

export default Issues;
