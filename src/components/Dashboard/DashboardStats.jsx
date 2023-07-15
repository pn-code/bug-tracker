import React from "react";
import StatCard from "./StatCard";

export default function DashboardStats({ projects, issues }) {
    const unsolvedIssues = issues.filter((issue) => issue.status != "closed");

    const findPreviousMonthDate = () => {
        // Create a new Date object representing today's date
        const today = new Date();

        // Get the month of the previous month
        let previousMonth = today.getMonth() - 1;

        // Adjust the year if the previous month is December (month index is zero-based)
        let year = today.getFullYear();
        if (previousMonth === -1) {
            previousMonth = 11; // December is represented by 11
            year--;
        }

        // Create a new Date object with the previous month and today's day
        const previousMonthDate = new Date(
            year,
            previousMonth,
            today.getDate()
        );
        return previousMonthDate;
    };

    const formatTotalProjectsData = () => {
        const prevMonthDate = findPreviousMonthDate().toISOString();

        const projectsCreatedThisMonth = projects.filter(
            (project) => project.created_on >= prevMonthDate
        );
        return projectsCreatedThisMonth;
    };

    const formatIssuesOpenedData = () => {
        const prevMonthDate = findPreviousMonthDate().toISOString();

        const openIssuesCreatedThisMonth = unsolvedIssues.filter(
            (issue) => issue.created_on >= prevMonthDate
        );
        return openIssuesCreatedThisMonth;
    };

    const closedIssuesPercentage =
        (issues.filter((issue) => issue.status == "closed").length /
        issues.length).toFixed(2) * 100;

    return (
        <section className="flex flex-col gap-4 w-full h-full flex-1">
            <h2 className="text-xl">Statistics</h2>
            <StatCard
                title={"Total Projects"}
                stat={`${projects.length} projects`}
                color="#f0c816"
                navLink={"/projects"}
                data={formatTotalProjectsData()}
            />
            <StatCard
                title={"Issues Opened"}
                stat={`${unsolvedIssues.length} issues`}
                color="#eb4646"
                navLink={"/issues"}
                data={formatIssuesOpenedData()}
            />
            <StatCard
                title={"Closed Issues"}
                stat={`${issues.length - unsolvedIssues.length} issues`}
                color="#4f72ff"
                navLink={"/issues"}
                closedIssuesPercentage={closedIssuesPercentage}
            />
        </section>
    );
}
