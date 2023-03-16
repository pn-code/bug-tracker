import React from "react";
import Link from "next/link";

const ProjectCard = ({ project }) => {
    return (
        <tr className="w-full font-semibold bg-green-200 rounded-md h-20 text-sm sm:text-[16px] text-center">
            <td>#{project.id}</td>
            <td>
                <Link
                    className="hover:underline"
                    href={`/projects/${project.id}`}
                >
                    {project.name}
                </Link>
            </td>
            <td>{project.created_by}</td>
            <td>{project.created_on.substring(0, 10)}</td>
        </tr>
    );
};

export default ProjectCard;
