export const PostsList = ({ userPosts, onPostSelect, selectedPostId }) => {
  const posts = userPosts.map((userPost) => {
    return (
      <tr key={userPost.id}>
        <td data-cy="PostId">{userPost.id}</td>
        <td data-cy="PostTitle">{userPost.title}</td>
        <td className="has-text-right is-vcentered">
          {userPost.id === selectedPostId ? (
            <button
              type="button"
              className="button is-link is-primary"
              onClick={() => onPostSelect(null, null)}>
              Close
            </button>
          ) : (
            <button
              type="button"
              className="button is-link is-light"
              onClick={() => onPostSelect(userPost.id, userPost)}>
              Open
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <p className="title">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{posts}</tbody>
      </table>
    </div>
  );
};
