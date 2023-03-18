import React, { useState } from "react";
import Link from "next/link";
import HistoryCard from "@/components/HistoryCard";
import CommentSection from "@/components/CommentSection";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";

const IssueDetails = ({ issue, logs, comments }) => {
  const [currentComments, setCurrentComments] = useState(comments);

  const router = useRouter();

  const deleteIssue = async () => {
    try {
      await serverAPI.delete(`/api/v1/issues/${issue.id}`);
      router.push("/issues");
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToUpdateIssue = () => {
    router.push(`/issues/update/${issue.id}`);
  };

  return (
    <div>
      <div className="bg-gray-100 h-[100vh] w-full">
        <section className="mx-4 pt-5 flex flex-col gap-4">
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{issue.title}</h1>
            <div className="text-[16px] font-semibold flex gap-2">
              <Link
                href="/issues"
                className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-gray-50 rounded-md"
              >
                Back to Issues
              </Link>
            </div>
          </header>

          {/* Issue Information */}
          <div className="flex w-full gap-2 justify-between flex-col">
            <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full">
              <h1 className="font-semibold text-xl">Issue Information</h1>
              <article className="flex gap-2">
                <h2 className="font-semibold">Title:</h2>
                <p>{issue.title}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Description:</h2>
                <p>{issue.description}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Related Project</h2>
                <p>{issue.related_project}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Priority:</h2>
                <p>{issue.priority}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Identifier (user):</h2>
                <p>{issue.created_by}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Identified Date:</h2>
                <p>{issue.created_on.substring(0, 10)}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Assigned User:</h2>
                <p>{issue.assigned_to}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Target Resolution Date:</h2>
                <p>{issue.target_resolution_date.substring(0, 10)}</p>
              </article>
              <article className="flex gap-2">
                <h2 className="font-semibold">Actual Resolution Date:</h2>
                <p>{issue.actual_resolution_date?.substring(0, 10) || null}</p>
              </article>

              <section className="flex gap-4">
                <button
                  onClick={navigateToUpdateIssue}
                  type="button"
                  className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={deleteIssue}
                  type="button"
                  className="bg-red-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </section>
            </section>

            {/* Issue History */}
            <section className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-md w-full">
              <h1 className="font-semibold text-xl">Issue History</h1>
              <table className="text-left">
                <tbody>
                  <tr>
                    <th>Modified By</th>
                    <th>Date Modified</th>
                    <th>Assigned To</th>
                    <th>Actual Resolution Date</th>
                    <th>Status</th>
                  </tr>
                  {logs?.map((log) => (
                    <HistoryCard key={log.id} log={log} />
                  ))}
                </tbody>
              </table>
            </section>

            {/* Issue Comments */}
            <CommentSection comments={currentComments} setComments={setCurrentComments} issueId={issue.id} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default IssueDetails;

export async function getServerSideProps({ params }) {
  const issueId = params.id;
  const resIssue = await serverAPI.get(`/api/v1/issues/${issueId}`);
  const resLogs = await serverAPI.get(`/api/v1/logs/${issueId}`);
  const resComments = await serverAPI.get(`/api/v1/comments/${issueId}`);

  // Pass data to the page via props
  return {
    props: {
      issue: resIssue.data.issue,
      logs: resLogs.data.logs,
      comments: resComments.data.comments,
    },
  };
}
