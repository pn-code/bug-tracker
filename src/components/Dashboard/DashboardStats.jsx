import React from "react";
import StatCard from "./StatCard";

export default function DashboardStats({ projects, issues }) {
    const unsolvedIssues = issues.filter((issue) => issue.status != "closed");
    return (
        <section className="flex flex-col gap-4 w-full h-full flex-1">
            <h2 className="text-xl">Statistics</h2>
            <StatCard
                title={"Total Projects"}
                stat={`${projects.length} projects`}
                color="#f0c816"
                navLink={"/projects"}
            />
            <StatCard
                title={"Open Issues"}
                stat={`${unsolvedIssues.length} issues`}
                color="#eb4646"
                navLink={"/issues"}
            />
            <StatCard
                title={"Closed Issues"}
                stat={`${issues.length - unsolvedIssues.length} issues`}
                color="#4f72ff"
                navLink={"/issues"}
            />
        </section>
    );
}
