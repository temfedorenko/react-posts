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
5. Show the `Write a comment` button below the comments
   - after click hide the button and show the form to add new comment;
   - the form stays visible until the other post is opened;
   - the form should be implemented as a separate component;
6. The form requires an author's name and email and a comment text.
   - show errors only after the form is submitted;
   - remove an error on the field change;
   - keep the `name` and `email` after the successful submit but clear a comment text;
   - The `Clear` button should also clear all errors;
   - Add the `is-loading` class to the submit button while waiting for a response;
   - Add the new comment received as a response from the `API` to the end of the list;
7. Implement comment deletion
   - Delete the commnet immediately not waiting for the server response to improve the UX.
