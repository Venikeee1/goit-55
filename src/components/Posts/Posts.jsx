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
import { selectPostsState, selectLikedPosts } from '../../redux/posts/slice';
import { fetchPosts } from '../../redux/posts/operations';
import { LikedPostsByPage } from './LikedPostsByPage/LikedPostsByPage';
import {
  addPost,
  removePost,
  selectLikedPostsIds,
} from '../../redux/likedPosts/slice';
import { getLikedPostsDetails } from '../../api/articlesApi';

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const { page, setPage, setTotalPages } = usePaginationContext();
  const dispatch = useDispatch();
  const {
    error,
    loading,
    nbPages,
    items: posts,
  } = useSelector(selectPostsState);

  const likedPostsIds = useSelector(selectLikedPostsIds);
  const likedPosts = useSelector(selectLikedPosts);
  const likedIdsSet = new Set([...likedPostsIds]);

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

      dispatch(addPost(likedPost.objectID));
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

  useEffect(() => {
    getLikedPostsDetails(likedPostsIds).then(console.log, '---posts');
  }, [likedPostsIds]);

  return (
    <div>
      <Container>
        <SC.Form>
          <input type="text" value={query} onChange={handleQueryChange} />
          <button>Add</button>
        </SC.Form>

        {loading && <Loader />}
        {error && <>There was an error</>}

        <LikedPostsByPage items={likedPosts} />
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

let isSingletonCreated = false;
let singleTonEntity = null;

export const createUserSingleton = () => {
  if (!isSingletonCreated) {
    singleTonEntity = {
      name: 'Alex',
      age: 300,
    };

    isSingletonCreated = true;
  }

  return singleTonEntity;
};

createUserSingleton();
createUserSingleton();
createUserSingleton();
createUserSingleton();
createUserSingleton();
