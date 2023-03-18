import React from "react";

const HistoryCard = ({ log }) => {
    return (
        <tr>
            <td>{log.modified_by}</td>
            <td>{log.modified_date.substring(0, 10)}</td>
            <td>{log.new_assigned_to}</td>
            <td>{log.new_actual_resolution_date.substring(0,10)}</td>
            <td>{log.new_status}</td>
        </tr>
    );
};

export default HistoryCard;
