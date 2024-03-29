import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import serverAPI from "@/api/axios";
import Pagination from "@/components/Pagination";

const Projects = ({ projects }) => {
    // Setting up pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get current projects
    const indexOfLastProjects = currentPage * itemsPerPage;
    const indexOfFirstProjects = indexOfLastProjects - itemsPerPage;
    const currentProjects = projects.slice(
        indexOfFirstProjects,
        indexOfLastProjects
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="h-[100vh] w-full text-text">
            <section className="mx-4 pt-5 flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <div className="text-[16px] font-semibold flex">
                        <Link
                            href="/projects/new"
                            className="bg-primary hover:bg-primary/80 px-4 py-2 text-text rounded-md"
                        >
                            Add Project
                        </Link>
                    </div>
                </header>

                {/* Sorting Row */}
                <table className="w-full">
                    <tbody>
                        <tr className="bg-primary h-10 text-xs sm:text-[16px]">
                            <th>ID</th>
                            <th>Project Name</th>
                            <th>Created By</th>
                            <th>Created On</th>
                        </tr>
                        {projects &&
                            currentProjects.map((project) => (
                                <ProjectCard
                                    project={project}
                                    key={project.id}
                                />
                            ))}
                    </tbody>
                </table>

                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={projects.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />

            </section>
        </div>
    );
};

export default Projects;

export async function getServerSideProps() {
    const res = await serverAPI.get("/api/v1/projects");

    // Pass data to the page via props
    return {
        props: {
            projects: res.data.projects,
        },
    };
}
