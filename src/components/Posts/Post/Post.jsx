import { memo } from 'react';
import { Likes } from './Likes/Likes';
import PropTypes from 'prop-types';
import { Heading } from '../../Heading/Heading';
import FALLBACK_THUMB from '../../../assets/screen.avif';
import * as SC from './Post.styled';
import { LinkWithPrevPageState } from '../../LinkWithPrevPageState/LinkWithPrevPageState';

export const Post = memo(
  ({ title, likes = 0, thumbSrc = FALLBACK_THUMB, id }) => {
    return (
      <SC.Card>
        <SC.Thumbs src={thumbSrc} alt="" />
        {/* <SC.Thumbs src="/images/screen.avif" alt="" /> */}
        <SC.Container>
          <Heading level={2}>{title}</Heading>
          <SC.Likes>
            <Likes amount={likes} />
            <LinkWithPrevPageState to={`/posts/${id}`}>
              View post
            </LinkWithPrevPageState>
          </SC.Likes>
        </SC.Container>
      </SC.Card>
    );
  }
);

Post.propTypes = {
  likes: PropTypes.number,
  title: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string,
};
