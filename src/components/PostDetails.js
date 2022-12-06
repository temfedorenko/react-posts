import { Loader } from "./Loader";
import { NewCommentForm } from "./NewCommentForm";

export const PostDetails = ({
  post,
  comments,
  commentsLoading,
  commentsError,
  onFormSubmit,
  selectedPostId,
  addComment,
  setIsFormVisible,
  isFormVisible,
  deleteComment,
}) => {
  const postComments = comments.map((comment) => {
    return (
      <article className="message is-small" key={comment.id}>
        <div className="message-header">
          <a href={`mailto:${comment.email}`}>{comment.name}</a>
          <button
            type="button"
            className="delete is-small"
            aria-label="delete"
            onClick={() => deleteComment(comment)}>
            delete button
          </button>
        </div>

        <div className="message-body">{comment.body}</div>
      </article>
    );
  });

  const errorMessage = commentsError && (
    <div className="notification is-danger">Something went wrong</div>
  );

  return (
    <div className="content">
      <div className="content">
        <div className="block">
          <h2>
            {post?.id}: {post?.title}
          </h2>

          <p>{post?.body}</p>
        </div>

        <div className="block">
          {errorMessage}

          {comments.length === 0 && !commentsLoading && !commentsError && (
            <p className="title is-4">No comments yet</p>
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

          {!isFormVisible && (
            <button type="button" className="button is-link" onClick={() => setIsFormVisible(true)}>
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            onFormSubmit={onFormSubmit}
            selectedPostId={selectedPostId}
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
