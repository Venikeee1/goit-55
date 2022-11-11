import { memo } from 'react';
import { Likes } from './Likes/Likes';
import PropTypes from 'prop-types';
import { Heading } from '../../Heading/Heading';
import FALLBACK_THUMB from '../../../assets/screen.avif';
import * as SC from './Post.styled';

export const Post = memo(({ title, likes = 0, thumbSrc = FALLBACK_THUMB }) => {
  console.log('Post rerendered');
  return (
    <SC.Card>
      <SC.Thumbs src={thumbSrc} alt="" />
      {/* <SC.Thumbs src="/images/screen.avif" alt="" /> */}
      <SC.Container>
        <Heading level={2}>{title}</Heading>
        <SC.Likes>
          <Likes amount={likes} />
        </SC.Likes>
      </SC.Container>
    </SC.Card>
  );
});

Post.propTypes = {
  likes: PropTypes.number,
  title: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string,
};
