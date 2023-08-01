import React from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

const ProjectDetails = ({ project }) => {
    const router = useRouter();
    const user = useUser().user;

    const deleteProject = async () => {
        const res = await serverAPI.delete(`/api/v1/projects/${project.id}`);
        if (res.status == 200) {
            router.push("/projects");
        }
    };

    return (
        <div>
            <div className="h-[90vh] w-full text-white">
                <section className="mx-4 pt-5 flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{project.name}</h1>
                        <div className="text-[16px] font-semibold flex gap-2">
                            <Link
                                href="/projects"
                                className="bg-secondary hover:bg-secondary/80 px-4 py-2 text-background rounded-md"
                            >
                                Back to Projects
                            </Link>
                        </div>
                    </header>

                    {/* Project Information */}
                    <div className="flex w-full gap-2 justify-between flex-col lg:flex-row">
                        <section className="flex flex-col bg-gray-700/50 gap-4 px-4 py-4 rounded-md w-full flex-[2]">
                            <header className="flex justify-between">
                                <h1 className="font-semibold text-xl">
                                    Project Info
                                </h1>
                                {(user?.role !== "user" || project.created_by == user.id) && (
                                    <section className="flex gap-4">
                                        <Link
                                            href={`/projects/update/${project.id}`}
                                            className="bg-primary px-4 py-2 rounded-md text-white font-semibold hover:bg-primary/80"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={deleteProject}
                                            type="button"
                                            className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-500/80"
                                        >
                                            Delete
                                        </button>
                                    </section>
                                )}
                            </header>

                            <article className="flex flex-col gap-2">
                                <h2 className="font-semibold">Title:</h2>
                                <p className="text-green-300">{project.name}</p>
                            </article>
                            <article className="flex flex-col gap-2">
                                <h2 className="font-semibold">Created by:</h2>
                                <p className="text-green-300">{`${project.user_name} (${project.created_by})`}</p>
                            </article>
                            <article className="flex flex-col gap-2">
                                <h2 className="font-semibold">Created on:</h2>
                                <p className="text-green-300">
                                    {project.created_on.substring(0, 10)}
                                </p>
                            </article>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectDetails;

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
