import React from "react";

const CommentCard = ({ comment }) => {
    const formattedDate = `${comment.created_on.substring(5, 10)}-${comment.created_on.substring(0, 4)}`;

    return (
        <article className="flex flex-col my-2 border-t-2 border-gray-400/50">
            <section className="flex justify-between mb-2">
                <h2 className="font-semibold">User #{comment.user_id}</h2>
                <p className="font-semibold">{formattedDate}</p>
            </section>

            <p>{comment.content}</p>
        </article>
    );
};

export default CommentCard;
