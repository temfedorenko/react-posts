export const UserSelector = ({
  users,
  onToggleMenu,
  isMenuActive,
  onUserSelect,
  selectedUserId,
}) => {
  const selectedUser = users.find((user) => user.id === selectedUserId);

  const elements = users.map((user) => {
    return (
      <a
        href={`#user-${user.id}`}
        className="dropdown-item"
        key={user.id}
        onClick={() => onUserSelect(user.id)}>
        {user.name}
      </a>
    );
  });

  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onToggleMenu}>
          <span>{!selectedUserId ? "Choose a user " : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={isMenuActive ? { display: "block" } : { display: "none" }}>
        <div className="dropdown-content">{elements}</div>
      </div>
    </div>
  );
};
