import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";

const NewIssue = () => {
    const [loading, setLoading] = useState(false);
    const [issue, setIssue] = useState({
        relatedProject: "",
        title: "",
        description: "",
        targetResolutionDate: "",
        actualResolutionDate: "",
        assignedTo: "",
        status: "",
        priority: "",
    });
    const [projects, setProjects] = useState([]);

    const user = useUser()[0];
    const router = useRouter();

    const fetchProjects = async () => {
        const res = await serverAPI.get("/api/v1/projects");
        setProjects(res.data.data.projects);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const submitIssue = async (e) => {
        e.preventDefault();
        if (!loading) {
            try {
                setLoading(true);
                await serverAPI.post("/api/v1/issues", {
                    ...issue,
                    createdBy: user.id,
                    relatedProject: Number(issue.relatedProject),
                    assignedTo: Number(issue.assignedTo),
                });
                router.push("/issues");
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleInputChange = (e) => {
        setIssue((prevIssue) => ({
            ...prevIssue,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="bg-gray-100 h-[100vh] w-full">
            <form
                onSubmit={(e) => submitIssue(e)}
                className="px-4 pt-5 flex flex-col gap-4"
            >
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">New Issue Form</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href="/issues"
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                        >
                            Return to Issues
                        </Link>
                    </div>
                </header>

                <fieldset className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="project">Related Project: </label>
                        <select
                            onChange={(e) => handleInputChange(e)}
                            name="project"
                            id="project"
                        >
                            <option default value="">SELECT A PROJECT</option>
                            {projects.map((project) => (
                                <option value={project.id} key={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="title">Title: </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="title"
                            value={issue.title}
                            className="px-2 py-1 resize-none rounded-md"
                            id="title"
                            type="text"
                            placeholder="title"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            onChange={(e) => handleInputChange(e)}
                            name="description"
                            value={issue.description}
                            className="px-2 py-1 resize-none rounded-md"
                            id="description"
                            type="text"
                            placeholder="description"
                            rows={10}
                        ></textarea>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="targetResolutionDate">
                            Target Resolution Date:{" "}
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="targetResolutionDate"
                            value={issue.targetResolutionDate}
                            className="px-2 py-1 rounded-md"
                            id="targetResolutionDate"
                            type="date"
                            placeholder="target resolution date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="actualResolutionDate">
                            Actual Resolution Date:{" "}
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="actualResolutionDate"
                            value={issue.actualResolutionDate}
                            className="px-2 py-1 rounded-md"
                            id="actualResolutionDate"
                            type="date"
                            placeholder="actual resolution date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="assignedTo">Assigned to: </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="assignedTo"
                            value={issue.assignedTo}
                            className="px-2 py-1 rounded-md"
                            id="assignedTo"
                            type="text"
                            placeholder="assigned to"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="status">Status:</label>
                        <select
                            onChange={(e) => handleInputChange(e)}
                            name="status"
                            value={issue.status}
                            className="px-2 py-1 rounded-md"
                            id="status"
                        >
                            <option value={null}>SELECT STATUS</option>
                            <option value="open">Open</option>
                            <option value="in progress">In Progress</option>
                            <option value="needs review">Needs Review</option>
                            <option value="under review">Under Review</option>
                            <option value="closed">Closed</option>
                        </select>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="priority">Priority: </label>
                        <select
                            onChange={(e) => handleInputChange(e)}
                            name="priority"
                            value={issue.priority}
                            className="px-2 py-1 rounded-md"
                            id="priority"
                        >
                            <option value={null}>SELECT PRIORITY</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </section>
                </fieldset>
                <button className="bg-blue-400 text-white rounded-md py-2 my-4">
                    Submit Issue
                </button>
            </form>
        </div>
    );
};

export default NewIssue;
