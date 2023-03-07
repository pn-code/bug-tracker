import React from "react";

const NewIssue = () => {
    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <form className="px-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">New Issue Form</h1>
                    <div className="text-[16px] font-semibold">
                        <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md">
                            Return to Issues
                        </button>
                    </div>
                </header>

                <fieldset>
                    <section>
                        <label htmlFor="project">Project: </label>
                        <input id="project" type="text" placeholder="project" />
                    </section>
                    <section>
                        <label htmlFor="summary">Summary: </label>
                        <input id="summary" type="text" placeholder="summary" />
                    </section>
                    <section>
                        <label htmlFor="">Description: </label>
                        <input
                            id="description"
                            type="text"
                            placeholder="description"
                        />
                    </section>
                    <section>
                        <label htmlFor="identifiedDate">
                            Identified Date:{" "}
                        </label>
                        <input
                            id="identifiedDate"
                            type="text"
                            placeholder="identified date"
                        />
                    </section>
                    <section>
                        <label htmlFor="targetResolutionDate">
                            Target Resolution Date:{" "}
                        </label>
                        <input
                            id="targetResolutionDate"
                            type="text"
                            placeholder="target resolution date"
                        />
                    </section>
                    <section>
                        <label htmlFor="assignedUser">Assigned User: </label>
                        <input id="assignedUser" type="text" placeholder="assigned user" />
                    </section>
                    <section>
                        <label htmlFor="status">Status:</label>
                        <select id="status">
                            <option value={0}>New</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Needs Review</option>
                            <option value={3}>Under Review</option>
                            <option value={4}>Completed</option>
                        </select>
                    </section>
                    <section>
                        <label htmlFor="priority">Priority: </label>
                        <select id="priority">
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
