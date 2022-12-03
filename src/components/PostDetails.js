import { Loader } from "./Loader";
import { NewCommentForm } from "./NewCommentForm";

export const PostDetails = ({ post, comments, commentsLoading, commentsError }) => {
  const postComments = comments?.map((comment) => {
    return (
      <article className="message is-small" data-cy="Comment" key={comment.id}>
        <div className="message-header">
          <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
            {comment.name}
          </a>
          <button
            data-cy="CommentDelete"
            type="button"
            className="delete is-small"
            aria-label="delete">
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {comment.body}
        </div>
      </article>
    );
  });

  const errorMessage = commentsError && (
    <div className="notification is-danger" data-cy="CommentsError">
      Something went wrong
    </div>
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {errorMessage}

          {comments.length === 0 && !commentsLoading && !commentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {commentsLoading ? (
            <Loader />
          ) : (
            comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>
                <div className="mb-5">{postComments}</div>
              </>
            )
          )}

          <button data-cy="WriteCommentButton" type="button" className="button is-link">
            Write a comment
          </button>
        </div>

        {/* <NewCommentForm /> */}
      </div>
    </div>
  );
};
