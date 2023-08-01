import React, { useState } from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

export default function updateProject({ project }) {
    const [updatedProjectName, setUpdatedProjectName] = useState(project.name);

    const router = useRouter();
    const user = useUser().user

    const updateProject = async (e) => {
        e.preventDefault();
        const res = await serverAPI.put(`/api/v1/projects/${project.id}`, {
            updatedProjectName,
            user,
            project
        });

        if (res.status == 200) {
            router.push("/projects");
        }
    };

    return (
        <div className="h-[90vh] w-full text-text">
            <form
                onSubmit={(e) => updateProject(e)}
                className="px-4 pt-5 flex flex-col gap-4"
            >
                <header className="flex justify-center sm:justify-between gap-20">
                    <h1 className="text-2xl font-bold">Update Project</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/projects"
                            className="bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md text-background"
                        >
                            Return
                        </Link>
                    </div>
                </header>

                <fieldset className="flex flex-col gap-4 items-center sm:items-start">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="project">Project Name: </label>
                        <input
                            onChange={(e) => setUpdatedProjectName(e.target.value)}
                            value={updatedProjectName}
                            className="px-2 py-1 rounded-md sm:w-72"
                            id="project"
                            type="text"
                            placeholder="project name"
                        />
                    </section>
                    <button className="bg-primary hover:bg-primary/80 text-white rounded-md py-2 w-[290px]">
                        Update Project
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const projectId = params.id;
    const res = await serverAPI.get(`/api/v1/projects/${projectId}`);

    // Pass data to the page via props
    return {
        props: {
            project: res.data.projects,
        },
    };
}
