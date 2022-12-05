import "bulma/bulma.sass";
import "@fortawesome/fontawesome-free/css/all.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

import "./App.scss";

// import classNames from "classnames";
import { PostsList } from "./components/PostsList";
import { PostDetails } from "./components/PostDetails";
import { UserSelector } from "./components/UserSelector";
import { Loader } from "./components/Loader";

import { client } from "./utils/fetchClient";

const App = () => {
  // Users
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();
  // Posts
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [selectedPostId, setSelectedPostId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const [isMenuActive, setIsMenuActive] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    client
      .get("/users")
      .then((data) => setUsers(data.slice(3, 10)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      client
        .get("/posts")
        .then((data) => setPosts(data.filter((post) => post.userId === selectedUserId)))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId) {
      client
        .get("/comments")
        .then((data) => setComments(data.filter((comment) => comment.postId === selectedPostId)))
        .catch(() => setCommentsError(true))
        .finally(() => setCommentsLoading(false));
    }
  }, [selectedPostId, posts]);

  function onToggleMenu() {
    setIsMenuActive((isMenuActive) => !isMenuActive);
  }

  function handleUserSelect(id) {
    if (id === selectedUserId) {
      setIsMenuActive(false);
      return;
    }

    setLoading(true);
    setSelectedUserId(id);
    setError(false);
    setIsMenuActive(false);
    setSelectedPost(null);
    setSelectedPostId(null);
  }

  function handlePostSelect(id, post) {
    setCommentsLoading(true);
    setCommentsError(false);
    setSelectedPostId(id);
    setSelectedPost(post);
    setIsFormVisible(false);
  }

  function addComment(newComment) {
    client.post("/comments", newComment).then(() => setComments([...comments, newComment]));
  }

  const errorMessage = error && (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      Something went wrong!
    </div>
  );

  const noPostsMessage = posts.length === 0 && !loading && !error && selectedUserId && (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );

  const content = loading ? (
    <Loader />
  ) : (
    posts.length > 0 && (
      <PostsList
        userPosts={posts}
        onPostSelect={handlePostSelect}
        selectedPostId={selectedPostId}
        setIsFormVisible={setIsFormVisible}
      />
    )
  );

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onToggleMenu={onToggleMenu}
                  isMenuActive={isMenuActive}
                  onUserSelect={handleUserSelect}
                  selectedUserId={selectedUserId}
                />
              </div>
              <div className="block">
                {!selectedUserId && <p>No user selected</p>}
                {errorMessage}
                {noPostsMessage}
                {content}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames("tile", "is-parent", "is-8-desktop", "Sidebar", {
              "Sidebar--open": selectedPost,
            })}>
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments}
                commentsLoading={commentsLoading}
                commentsError={commentsError}
                selectedPostId={selectedPostId}
                addComment={addComment}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
