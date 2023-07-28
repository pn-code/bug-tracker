import Head from "next/head";
import serverAPI from "@/api/axios";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import RecentIssues from "@/components/Dashboard/RecentIssues";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import YourAssignedIssues from "@/components/Dashboard/YourAssignedIssues";

export default function Home({ projects, issues }) {
    const router = useRouter();

    const { user, isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!user && !isLoading && !isAuthenticated) {
            router.push("/landing");
        }
    }, [user, isLoading, isAuthenticated, router]);

    return (
        <>
            <Head>
                <title>Bug Tracker</title>
                <meta name="description" content="Track issues with ease!" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading && <LoadingScreen />}

            {/* Dashboard Home */}
            {!isLoading && (
                <main className="h-full sm:h-[90vh] w-full flex flex-col px-4 pt-5 gap-4 text-text">
                    <h1 className="text-2xl font-bold">Dashboard</h1>

                    {/* Dashboard Contents */}
                    <section className="w-full flex flex-col justify-between gap-4 lg:flex-row">
                        <YourAssignedIssues issues={issues} userId={user?.id} />
                        <RecentIssues issues={issues} />
                        <DashboardStats projects={projects} issues={issues} />
                    </section>
                </main>
            )}
        </>
    );
}

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
