import React from "react";

const IssueCard = ({issue}) => {
    return (
        <tr className="w-full font-semibold bg-green-200 rounded-md h-20 text-sm sm:text-[16px] text-center">
            <td>{issue.title}</td>
            <td>{issue.related_project}</td>
            <td>{issue.priority}</td>
            <td>{issue.status}</td>
            <td>{issue.assigned_to}</td>
            <td>{issue.created_on.substring(0, 10)}</td>
        </tr>
    );
};

export default IssueCard;
