import { Link, useLocation } from 'react-router-dom';

export const LinkWithPrevPageState = ({ children, ...restProps }) => {
  const location = useLocation();
  const { pathname, search } = location;
  const fromPage = `${pathname}${search}`;

  return (
    <Link {...restProps} state={{ from: fromPage }}>
      {children}
    </Link>
  );
};
