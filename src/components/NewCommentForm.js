import { useState } from "react";
import classNames from "classnames";

export const NewCommentForm = ({ selectedPostId, addComment }) => {
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isValidationError, setIsValidationError] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  function handleInputChange(inputValue, setInputValue) {
    setInputValue(inputValue);
  }

  function validateFormFields() {
    if (!commentName || !commentEmail || !commentText) {
      setIsValidationError(true);
      return false;
    }
    return true;
  }

  function handleFormSubmit(e, name, email, body) {
    e.preventDefault();

    if (!validateFormFields()) {
      return;
    }

    const newComment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    setIsFormLoading(true);
    addComment(newComment, setIsFormLoading);
    setCommentText("");
  }

  function cleareForm() {
    setIsValidationError(false);
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  }
  return (
    <form onSubmit={(e) => handleFormSubmit(e, commentName, commentEmail, commentText)}>
      <div className="field">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames("input", { "is-danger": !commentName && isValidationError })}
            value={commentName}
            onChange={(e) => handleInputChange(e.target.value, setCommentName)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isValidationError && !commentName && (
            <span className="icon is-small is-right has-text-danger" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isValidationError && !commentName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames("input", { "is-danger": !commentEmail && isValidationError })}
            value={commentEmail}
            onChange={(e) => handleInputChange(e.target.value, setCommentEmail)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isValidationError && !commentEmail && (
            <span className="icon is-small is-right has-text-danger" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isValidationError && !commentEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames("textarea", { "is-danger": !commentText && isValidationError })}
            value={commentText}
            onChange={(e) => handleInputChange(e.target.value, setCommentText)}
          />
        </div>

        {isValidationError && !commentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames("button is-link", { "is-loading": isFormLoading })}>
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light" onClick={() => cleareForm()}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
