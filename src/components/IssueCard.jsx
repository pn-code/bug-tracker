import React from "react";

const IssueCard = () => {
    return (
        <tr className="w-full font-semibold bg-green-200 rounded-md h-20">
            <td>Summary</td>
            <td>Project</td>
            <td>Priority</td>
            <td>Status</td>
            <td>Assigned</td>
            <td>Date</td>
        </tr>
    );
};

export default IssueCard;
