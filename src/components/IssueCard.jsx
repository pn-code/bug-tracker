import React from "react";

const IssueCard = () => {
    return (
        <tr className="w-full font-semibold bg-green-200 rounded-md h-20 text-sm sm:text-[16px]">
            <td>Summary</td>
            <td>Project</td>
            <td>Priority</td>
            <td>Status</td>
            <td>Assigned User</td>
            <td>Identified Date</td>
        </tr>
    );
};

export default IssueCard;
