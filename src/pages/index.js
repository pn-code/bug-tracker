import Head from "next/head";
import DashboardCard from "../components/DashboardCard";
import serverAPI from "@/api/axios";
import { useUserUpdate } from "@/contexts/UserContext";
import { useEffect } from "react";


export default function Home({ projects, issues }) {
    const fetchUserToken = useUserUpdate();
    
    useEffect(() => {
        fetchUserToken()
    }, [])

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

            {/* Dashboard Home */}
            <main className="bg-gray-100 h-[90vh] w-full flex flex-col px-4 pt-5 gap-4">
                <h1 className="text-xl font-bold">Overview</h1>
                <section className="w-full flex gap-2 flex-col md:flex-row">
                    <DashboardCard
                        title="Projects"
                        quantity={projects.length}
                        hrefLink="/projects"
                    />
                    <DashboardCard
                        title="Issues"
                        quantity={issues.length}
                        hrefLink="/issues"
                    />
                </section>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const projectsRes = await serverAPI.get("/api/v1/projects");
    const issuesRes = await serverAPI.get("/api/v1/issues");

    // Pass data to the page via props
    return {
        props: {
            projects: projectsRes.data.data.projects,
            issues: issuesRes.data.data.issues,
        },
    };
}
