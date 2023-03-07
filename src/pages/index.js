import Head from "next/head";
import DashboardCard from "../components/DashboardCard";

export default function Home() {
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
                <section className="w-full flex gap-2">
                    <DashboardCard
                        title="Projects"
                        quantity={5}
                        hrefLink="/projects"
                    />
                    <DashboardCard
                        title="Issues"
                        quantity={21}
                        hrefLink="/issues"
                    />
                </section>
            </main>
        </>
    );
}
