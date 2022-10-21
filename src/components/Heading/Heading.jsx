import PropTypes from 'prop-types';

export const Heading = ({ level = 1, children }) => {
  // if (level === 1) {
  //   return <h1>{children}</h1>;
  // }
  // if (level === 2) {
  //   return <h2>{children}</h2>;
  // }
  // if (level === 3) {
  //   return <h2>{children}</h2>;
  // }

  const Title = `h${level}`;

  return <Title>{children}</Title>;
};

Heading.propTypes = {
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
