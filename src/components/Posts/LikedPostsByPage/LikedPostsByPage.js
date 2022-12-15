import * as SC from './LikedPostsByPage.styled';

export const LikedPostsByPage = ({ items }) => {
  return (
    <SC.LikedList>
      <h2>Liked Posts</h2>
      {items.map((post) => (
        <li key={post.objectID}>{post.title}</li>
      ))}
    </SC.LikedList>
  );
};
