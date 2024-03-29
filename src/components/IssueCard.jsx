import Link from "next/link";

const IssueCard = ({ issue }) => {
    const isIssueClosed = issue.status === "closed";

    return (
        <tr
            className={`w-full font-semibold text-xs ${
                isIssueClosed ? "bg-red-900" : "bg-gray-700/50"
            }   rounded-md h-20 text-sm sm:text-[16px] text-center`}
        >
            <td className="hover:underline">
                <Link href={`/issues/${issue.id}`}>#{issue.id}</Link>
            </td>
            <td>{issue.title}</td>
            <td>{issue.project_name}</td>
            <td>{issue.priority}</td>
            <td>{issue.status}</td>
            <td>{`${issue.assigned_to_name} (${issue.assigned_to})`}</td>
            <td>{issue.created_on.substring(5, 10)}</td>
        </tr>
    );
};

export default IssueCard;
