import { Likes } from './Likes/Likes';
import PropTypes from 'prop-types';
import { Heading } from '../../Heading/Heading';
import * as SC from './Post.styled';

const FALLBACK_THUMB = 'https://mxb.dev/assets/images/featured/screen.avif';

export const Post = ({ title, likes = 0, thumbSrc = FALLBACK_THUMB }) => {
  return (
    <SC.Card>
      <SC.Thumbs src={thumbSrc} alt="" />
      <SC.Container>
        <Heading level={2}>{title}</Heading>
        <SC.Likes>
          <Likes amount={likes} />
        </SC.Likes>
      </SC.Container>
    </SC.Card>
  );
};

Post.propTypes = {
  likes: PropTypes.number,
  title: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string,
};
