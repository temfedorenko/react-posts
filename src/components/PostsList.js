export const PostsList = ({ userPosts, onPostSelect, selectedPost }) => {
  const posts = userPosts.map((userPost) => {
    return (
      <tr key={userPost.id}>
        <td data-cy="PostId">{userPost.id}</td>

        <td data-cy="PostTitle">{userPost.title}</td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={() => onPostSelect(userPost.id, userPost)}>
            Open
          </button>
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
