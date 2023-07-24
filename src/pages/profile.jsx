import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { serialize } from "cookie";

const Profile = ({ projects, issues }) => {
    const user = useUser().user;

    const logoutUser = async () => {
        const res = await serverAPI.get("/api/auth/logout");
        if (res.status == 200) {
            const cookieSerialized = serialize("jwt", "", {
                maxAge: -1,
                path: "/",
            });
            document.cookie = cookieSerialized;
            window.location.href = "/";
        }
    };

    const numberOfProjectsCreated = projects.filter(
        (project) => project.created_by == user?.id
    ).length;
    const numberOfIssuesCreated = issues.filter(
        (issue) => issue.created_by == user?.id
    ).length;
    const numberOfCurrentIssuesAssigned = issues.filter(
        (issue) => (issue.assigned_to == user?.id) && (issue.status != "closed")
    ).length;
    const numberOfIssuesClosed = issues.filter(
        (issue) => (issue.assigned_to == user?.id) && (issue.status == "closed")
    ).length;

    return (
        <main className="h-full sm:h-[90vh] w-full flex flex-col px-4 pt-5 gap-4 text-text">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">User Profile</h1>
                <button
                    onClick={() => logoutUser()}
                    className="w-24 px-4 py-2 bg-red-600/90 text-white rounded-md hover:bg-red-600/80"
                >
                    Log Out
                </button>
            </header>

            <section>
                <article>
                    <h2 className="font-semibold">Full Name: </h2>
                    <p className="text-green-300">{user?.name}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Role: </h2>
                    <p className="text-green-300">{user?.role}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Projects Created: </h2>
                    <p className="text-green-300">{numberOfProjectsCreated}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Issues Opened: </h2>
                    <p className="text-green-300">{numberOfIssuesCreated}</p>
                </article>
                <article>
                    <h2 className="font-semibold">
                        Number of Issues Currently Assigned:{" "}
                    </h2>
                    <p className="text-green-300">{numberOfCurrentIssuesAssigned}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Issues Closed: </h2>
                    <p className="text-green-300">{numberOfIssuesClosed}</p>
                </article>
            </section>
        </main>
    );
};

export default Profile;

export async function getServerSideProps() {
    const projectsRes = await serverAPI.get("/api/v1/projects");
    const issuesRes = await serverAPI.get("/api/v1/issues");

    // Pass data to the page via props
    return {
        props: {
            projects: projectsRes.data.projects,
            issues: issuesRes.data.issues,
        },
    };
}
