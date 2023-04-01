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
        assignedTo: issue.assigned_to,
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
                await updateLog()
                router.push("/issues");
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
            console.log(res)
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
        <div className="bg-gray-100 h-[100vh] w-full">
            <form
                onSubmit={(e) => submitUpdatedIssue(e)}
                className="px-4 pt-5 flex flex-col gap-4"
            >
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Update Issue</h1>
                    <div className="text-[16px] font-semibold">
                        <Link
                            href={`/issues/${issue.id}`}
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
                        >
                            Return to Issue
                        </Link>
                    </div>
                </header>

                <fieldset className="flex flex-col gap-4">
                    <h2 className="font-semibold">Title: </h2>
                    <p>{issue.title}</p>
                    <h2 className="font-semibold">Description:</h2>
                    <p> {issue.description}</p>
                    <h2 className="font-semibold">Target Resolution Date:</h2>
                    <span>
                        {`${issue.target_resolution_date.substring(
                            5,
                            10
                        )}-${issue.target_resolution_date.substring(0, 4)}`}
                    </span>
                    <h2 className="font-semibold">Priority: </h2>
                    <span>{issue.priority}</span>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="actualResolutionDate">
                            Actual Resolution Date:{" "}
                        </label>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            name="actualResolutionDate"
                            value={updatedIssue.actualResolutionDate}
                            className="px-2 py-1 rounded-md"
                            id="actualResolutionDate"
                            type="date"
                            placeholder="actual resolution date"
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="assignedTo">Assigned to: </label>
                        <select
                            onChange={(e) => handleInputChange(e)}
                            name="assignedTo"
                            id="assignedTo"
                            value={issue.assignedTo}
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
                </fieldset>
                <button className="bg-blue-400 text-white rounded-md py-2 my-4">
                    Submit Issue
                </button>
            </form>
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
