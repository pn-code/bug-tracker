import React, { useState } from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

const NewProject = () => {
    const [loading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState("");

    const user = useUser()[0];

    const router = useRouter()

    const submitProject = async (e) => {
        e.preventDefault();
        if (!loading && projectName != "") {
            setLoading(true);

            await serverAPI.post("/api/v1/projects", {
                name: projectName,
                // Change to reflect current user shown through user authorization later...
                createdBy: user.id,
            });

            setLoading(false);
            router.push("/projects")
        }
    };

    return (
        <div className="h-[100vh] w-full text-text">
            <form
                onSubmit={(e) => submitProject(e)}
                className="px-4 pt-5 flex flex-col gap-4"
            >
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">New Project</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/projects"
                            className="bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md text-background"
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
                            className="px-2 py-1 rounded-md sm:w-72"
                            id="project"
                            type="text"
                            placeholder="project name"
                        />
                    </section>
                </fieldset>
                <button className="bg-primary text-white rounded-md py-2 sm:w-72">
                    Submit Project
                </button>
            </form>
        </div>
    );
};

export default NewProject;
