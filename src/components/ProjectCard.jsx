import React from "react";

const ProjectCard = () => {
    return (
        <tr className="w-full font-semibold bg-green-200 rounded-md h-20 text-sm sm:text-[16px] text-center">
            <td>Title</td>
            <td>Start Date</td>
            <td>Target End Date</td>
            <td>Actual End Date</td>
        </tr>
    );
};

export default ProjectCard;
