import { Link, useLocation } from 'react-router-dom';

export const BackButton = ({ children }) => {
  const { state } = useLocation();

  if (!state?.from) {
    return null;
  }

  return <Link to={state.from}>{children}</Link>;
};
