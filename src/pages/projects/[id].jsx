import React from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";

const ProjectDetails = ({ project }) => {
    const router = useRouter();

    const deleteProject = async () => {
        const res = await serverAPI.delete(`/api/v1/projects/${project.id}`);
        if (res.status == 200) {
            router.push("/projects");
        }
    };

    return (
        <div>
            <div className="bg-gray-100 h-[100vh] w-full">
                <section className="mx-4 pt-5 flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{project.name}</h1>
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
                    <div className="flex w-full gap-2 justify-between flex-col lg:flex-row">
                        <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full flex-[2]">
                            <h1 className="font-semibold text-xl">
                                Project Information
                            </h1>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Title:</h2>
                                <p>{project.name}</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Created by:</h2>
                                <p>{project.created_by}</p>
                            </article>
                            <article className="flex gap-2">
                                <h2 className="font-semibold">Created on:</h2>
                                <p>{project.created_on.substring(0, 10)}</p>
                            </article>

                            <section className="flex gap-4">
                                <button
                                    type="button"
                                    className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-green-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={deleteProject}
                                    type="button"
                                    className="bg-red-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </section>
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
                            </section>
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
