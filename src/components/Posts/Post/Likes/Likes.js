import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const Likes = ({ amount, isLiked = false, onLike }) => {
  const ref = useRef(null);
  const [isShown, setIsShown] = useState(true);

  const handleClick = () => {
    setIsShown((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
      {isShown ? (
        <span ref={ref}>
          <button onClick={onLike}>{isLiked ? '❤️' : '♡'}</button>
          {amount}
        </span>
      ) : (
        <span>hello</span>
      )}
    </div>
  );
};

Likes.propTypes = {
  amount: PropTypes.number,
  isLiked: PropTypes.bool,
  onLike: PropTypes.func,
};
