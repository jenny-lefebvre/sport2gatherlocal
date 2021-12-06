/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

const CommentInput = ({
  handleClick,
  value,
  manageChange,
  handleCommentSubmit,
}) => {
  const handleChange = (evt) => {
    manageChange(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('submit test');
    handleCommentSubmit();
  };
  return (
    <form
      className="comment-input"
      onSubmit={handleSubmit}
    >
      <label className="comment-label-column" htmlFor="comment-textarea">Saisir votre commentaire
        <textarea
          autoFocus
          id="comment-textarea"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className="add-comment-button">
        <input
          style={{ cursor: 'pointer' }}
          className="button"
          type="submit"
          value="Publier"
        />
        <button
          type="button"
          className="button cancel"
          onClick={handleClick}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

CommentInput.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  manageChange: PropTypes.func.isRequired,
  handleCommentSubmit: PropTypes.func.isRequired,
};

export default CommentInput;
