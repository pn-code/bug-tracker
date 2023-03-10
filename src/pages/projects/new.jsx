import React, { useState } from "react";
import Link from "next/link";

const NewProject = () => {
    const [projectName, setProjectName] = useState("");

    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <form className="px-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">New Project Form</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/projects"
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                        >
                            Return to Projects
                        </Link>
                    </div>
                </header>

                <fieldset className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="project">Project Name: </label>
                        <input
                            onChange={(e) => setProjectName(e.target.value)}
                            value={projectName}
                            className="px-2 py-1 rounded-md"
                            id="project"
                            type="text"
                            placeholder="project name"
                        />
                    </section>
                </fieldset>
                <button className="bg-blue-400 text-white rounded-md py-2">
                    Submit Project
                </button>
            </form>
        </div>
    );
};

export default NewProject;
