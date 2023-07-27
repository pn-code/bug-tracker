import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";

const UpdateIssue = ({ issue, users }) => {
    const [loading, setLoading] = useState(false);

    const [updatedIssue, setUpdatedIssue] = useState({
        actualResolutionDate:
            issue.actual_resolution_date?.substring(0, 10) || "",
        assignedTo: Number(issue.assigned_to),
        status: issue.status,
    });

    const router = useRouter();

    const user = useUser().user;

    const submitUpdatedIssue = async (e) => {
        e.preventDefault();
        if (!loading) {
            try {
                setLoading(true);
                await serverAPI.put(`/api/v1/issues/${issue.id}`, {
                    ...updatedIssue,
                });
                await updateLog();
                router.push(`/issues/${issue.id}`);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const updateLog = async () => {
        try {
            const res = await serverAPI.post("/api/v1/logs", {
                modified_by: user.id,
                issue_id: issue.id,
                new_actual_resolution_date: updatedIssue.actualResolutionDate,
                new_assigned_to: updatedIssue.assignedTo,
                new_status: updatedIssue.status,
            });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedIssue((prevUpdatedIssue) => ({
            ...prevUpdatedIssue,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="h-[100vh] w-full text-text">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Update Issue</h1>
                    <div className="text-[16px] font-semibold flex gap-2">
                        <Link
                            href={`/issues/${issue.id}`}
                            className="bg-secondary hover:bg-secondary/80 px-4 py-2 text-background rounded-md"
                        >
                            Return
                        </Link>
                    </div>
                </header>

                <form
                    onSubmit={(e) => submitUpdatedIssue(e)}
                    className="px-4 pt-5 flex flex-col gap-4 bg-gray-700/50 rounded-md sm:w-[360px]"
                >
                    {/* General Information */}

                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">Title: </h2>
                        <p className="text-green-300">{issue.title}</p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">Description:</h2>
                        <p className="text-green-300">{issue.description}</p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">
                            Target Resolution Date:
                        </h2>
                        <span className="text-green-300">
                            {`${issue.target_resolution_date.substring(
                                5,
                                10
                            )}-${issue.target_resolution_date.substring(0, 4)}`}
                        </span>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">Priority: </h2>
                        <span className="text-green-300">{issue.priority}</span>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="actualResolutionDate">
                            Actual Resolution Date:{" "}
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="actualResolutionDate"
                            value={updatedIssue.actualResolutionDate}
                            className="text-background py-1 px-2 rounded-md"
                            id="actualResolutionDate"
                            type="date"
                            placeholder="actual resolution date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="assignedTo">Assigned to: </label>
                        <select
                            className="text-background py-1 px-2 rounded-md"
                            onChange={(e) => handleInputChange(e)}
                            name="assignedTo"
                            id="assignedTo"
                            value={updatedIssue.assignedTo}
                        >
                            {users.map((user) => (
                                <option
                                    value={user.id}
                                    key={user.id}
                                >{`${user.name} (${user.id})`}</option>
                            ))}
                        </select>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="status">Status:</label>
                        <select
                            onChange={(e) => handleInputChange(e)}
                            name="status"
                            value={updatedIssue.status}
                            className="text-background py-1 px-2 rounded-md"
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
                    <button className="bg-primary rounded-md py-2 my-4 w-[280px]">
                        Update Issue
                    </button>
                </form>
            </section>
        </div>
    );
};

export default UpdateIssue;

export async function getServerSideProps({ params }) {
    const issueId = params.id;
    const resIssues = await serverAPI.get(`/api/v1/issues/${issueId}`);
    const resUsers = await serverAPI.get(`/api/v1/users`);

    // Pass data to the page via props
    return {
        props: {
            issue: resIssues.data.issue,
            users: resUsers.data.users,
        },
    };
}
