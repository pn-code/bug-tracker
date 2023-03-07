import React from "react";
import Link from "next/link";

const NewIssue = () => {
    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <form className="px-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">New Issue Form</h1>
                    <div className="text-[16px] font-semibold">
                        <Link href="/issues" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md">
                            Return to Issues
                        </Link>
                    </div>
                </header>

                <fieldset className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="project">Project: </label>
                        <input
                            className="px-2 py-1 rounded-md"
                            id="project"
                            type="text"
                            placeholder="project"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="summary">Summary: </label>
                        <input
                            className="px-2 py-1 resize-none rounded-md"
                            id="summary"
                            type="text"
                            placeholder="summary"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="">Description: </label>
                        <textarea
                            className="px-2 py-1 resize-none rounded-md"
                            id="summary"
                            type="text"
                            placeholder="description"
                            rows={10}
                        ></textarea>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="identifiedDate">
                            Identified Date:{" "}
                        </label>
                        <input
                            className="px-2 py-1 rounded-md"
                            id="identifiedDate"
                            type="date"
                            placeholder="identified date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="targetResolutionDate">
                            Target Resolution Date:{" "}
                        </label>
                        <input
                            className="px-2 py-1 rounded-md"
                            id="targetResolutionDate"
                            type="date"
                            placeholder="target resolution date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="assignedUser">Assigned User: </label>
                        <input
                            className="px-2 py-1 rounded-md"
                            id="assignedUser"
                            type="text"
                            placeholder="assigned user"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="status">Status:</label>
                        <select className="px-2 py-1 rounded-md" id="status">
                            <option value={0}>New</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Needs Review</option>
                            <option value={3}>Under Review</option>
                            <option value={4}>Completed</option>
                        </select>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="priority">Priority: </label>
                        <select className="px-2 py-1 rounded-md" id="priority">
                            <option value={0}>Low</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                        </select>
                    </section>
                </fieldset>
                <button className="bg-blue-400 text-white rounded-md py-2">
                    Submit Issue
                </button>
            </form>
        </div>
    );
};

export default NewIssue;
