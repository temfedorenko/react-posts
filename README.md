# React Dynamic List of Posts (task from Mate.academy)

Implement the App with ability to show posts of a selected user. Each post can
be opened in the sidebar with its comments. There should delete a comment and a
form to add new comments.

1. Learn the `utils/fetchClient.ts` and use it to interact with the API (tests expect that you each API request is sent after 300 ms delay);
2. Initially the `App` shows the `UserSelector` and a paragraph `No user selected` in the main content block.
   - load users from the API on page load;
   - implement the `UserSelector` as a dropdown using the given markup;
3. When a user is selected load the user's posts form [the API](https://mate-academy.github.io/fe-students-api/) and show them using a table in the main content clock;
   - show the `<Loader>` while waiting for the API response;
   - show an error notification if `posts` loading fails;
   - if the user has no posts show the `No posts yet` notification.
4. Add the `Sidebar--open` class to the sidebar when a post is selected;
   - the post details should appear there immediately;
   - the post commnets should be loaded from the API;
   - the `Loader` is shown before comments are loaded;
   - `CommentsError` notification is show on loading error;
   - `NoComments` message is shown if the post does not have comments yet;
