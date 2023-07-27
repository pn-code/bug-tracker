import React from "react";

const HistoryCard = ({ log }) => {
    return (
        <tr>
            <td className="hidden sm:table-cell">{`${log.modified_by_name} (${log.modified_by})`}</td>
            <td>{log.modified_date.substring(0, 10)}</td>
            <td>{`${log.new_assigned_to_name} (${log.new_assigned_to})`}</td>
            <td className="hidden sm:table-cell">{log.new_actual_resolution_date ? log.new_actual_resolution_date.substring(0,10) : "Not resolved"}</td>
            <td>{log.new_status}</td>
        </tr>
    );
};

export default HistoryCard;
