import { useEffect, useRef, useState } from 'react';

export const Likes = ({ amount }) => {
  const ref = useRef(null);
  const [isShown, setIsShown] = useState(true);

  const handleClick = () => {
    setIsShown((prevState) => !prevState);
  };

  useEffect(() => {
    // console.log(ref, '-ref');
  }, [isShown]);

  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
      {isShown ? <span ref={ref}>♡ {amount}</span> : <span>hello</span>}
    </div>
  );
};
