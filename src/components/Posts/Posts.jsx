import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import * as SC from './Posts.styled';
import { Loader } from '../Loader/Loader';
import { useWatch } from '../../hooks/useWatch';
import { Pagination } from '../Pagination/Pagination';
import { usePaginationContext } from '../../context/pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPost,
  getLikedPosts,
  removePost,
  selectPosts,
} from '../../redux/posts/slice';
import { fetchPosts } from '../../redux/posts/operations';

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const { page, setPage, setTotalPages } = usePaginationContext();
  const dispatch = useDispatch();
  const { error, loading, nbPages, items: posts } = useSelector(selectPosts);
  const likedPosts = useSelector(getLikedPosts);
  const likedIds = likedPosts.map((post) => post.id);
  const likedIdsSet = new Set([...likedIds]);

  const handleQueryChange = useCallback((event) => {
    const { target } = event;
    setQuery(target.value);
  }, []);

  const handleLikeClick = (id) => {
    const isLiked = likedIdsSet.has(id);

    if (isLiked) {
      dispatch(removePost(id));
    } else {
      const likedPost = posts.find((post) => post.objectID === id);

      dispatch(
        addPost({
          id: likedPost.objectID,
          title: likedPost.title,
        })
      );
    }
  };

  // Змінює сьорч параметри в пошуковій стрічці
  useWatch(() => {
    setSearchParams({ query });
    setPage(1);
  }, [query]);

  useEffect(() => {
    setTotalPages(nbPages);
  }, [nbPages, setTotalPages]);

  useEffect(() => {
    dispatch(fetchPosts({ query, page }));
  }, [dispatch, query, page]);

  return (
    <div>
      <Container>
        <SC.Form>
          <input type="text" value={query} onChange={handleQueryChange} />
          <button>Add</button>
        </SC.Form>

        {loading && <Loader />}
        {error && <>There was an error</>}
        <SC.Posts>
          {posts.map(({ title = '', points, objectID }) => (
            <Post
              key={objectID}
              id={objectID}
              likes={points}
              title={title}
              isLiked={likedIdsSet.has(objectID)}
              onLike={handleLikeClick}
            />
          ))}
        </SC.Posts>
        <Pagination />
      </Container>
    </div>
  );
};
