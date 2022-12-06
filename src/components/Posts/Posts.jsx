import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import { fetchArticles } from '../../api/articlesApi';
import * as SC from './Posts.styled';
import { Loader } from '../Loader/Loader';
import { useWatch } from '../../hooks/useWatch';
import { useFetch } from '../../hooks/useFetch';
import { Pagination } from '../Pagination/Pagination';
import { usePaginationContext } from '../../context/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedPost, removeLikedPost } from '../../redux/actions';
import { getLikedPosts } from '../../redux/selectors';

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const { page, setPage, setTotalPages } = usePaginationContext();
  const dispatch = useDispatch();
  const likedPosts = useSelector(getLikedPosts);
  const likedIds = likedPosts.map((post) => post.id);
  const likedIdsSet = new Set([...likedIds]);

  const {
    data: articles,
    isLoading,
    error,
  } = useFetch(
    () => fetchArticles(query, page).then((res) => res.data),
    [query, page]
  );

  const handleQueryChange = useCallback((event) => {
    const { target } = event;
    setQuery(target.value);
  }, []);

  const handleLikeClick = (id) => {
    const isLiked = likedIdsSet.has(id);

    if (isLiked) {
      dispatch(removeLikedPost(id));
    } else {
      const likedPost = articles.hits.find((post) => post.objectID === id);
      dispatch(
        // {
        //   type: 'LIKEDPOST/ADD',
        //   payload: {
        //     id: likedPost.objectID,
        //     title: likedPost.title,
        //   },
        // }
        addLikedPost({
          id: likedPost.objectID,
          title: likedPost.title,
        })
      );
    }
  };

  useWatch(() => {
    setSearchParams({ query });
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!articles) return;

    setTotalPages(articles.nbPages);
  }, [articles, setTotalPages]);

  return (
    <div>
      <Container>
        <SC.Form>
          <input type="text" value={query} onChange={handleQueryChange} />
          <button>Add</button>
        </SC.Form>

        {isLoading && <Loader />}
        {error && <>There was an error</>}
        <SC.Posts>
          {articles?.hits?.map(({ title = '', points, objectID }) => (
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
