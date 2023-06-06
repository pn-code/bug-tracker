import { useState } from "react";
import CommentCard from "@/components/CommentCard";
import { useUser } from "@/contexts/UserContext";
import serverAPI from "@/api/axios";
import Pagination from "./Pagination";

const CommentSection = ({ comments, setComments, issueId }) => {
  const [comment, setComment] = useState("");
  const user = useUser().user;

  // Setting up pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Get current projects
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await serverAPI.post("/api/v1/comments", {
        user_id: user.id,
        issue_id: issueId,
        content: comment,
      });

      if (res.status === 200) {
        const newComment = { ...res.data.comment, user_name: user.name };
        setComments((comments) => [newComment, ...comments]);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col bg-gray-700/50 gap-4 px-4 py-4 rounded-md w-full mb-4">
      <header className="flex justify-between">
        <h1 className="font-semibold text-xl">Issue Comments</h1>
        <Pagination
          itemsPerPage={3}
          totalItems={comments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </header>

      <section className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <form onSubmit={submitComment} className="flex flex-col gap-2 mb-4">
          <label className="font-semibold" htmlFor="comment">
            Add Comment:{" "}
          </label>

          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="rounded-md px-2 py-1 resize-none text-background w-full lg:w-[400px]"
            type="text"
            placeholder="comment"
            id="comment"
            rows={5}
          ></textarea>

          <button className="bg-primary hover:bg-primary/80 px-4 py-2 text-gray-50 rounded-md">
            Submit
          </button>
        </form>

        <section className="text-left lg:w-[700px]">
          <h3 className="font-semibold">Comments</h3>
          {currentComments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default CommentSection;
