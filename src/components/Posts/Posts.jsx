import { useState, useEffect, useCallback, useMemo } from 'react';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import { fetchArticles } from '../../api/articlesApi';
import * as SC from './Posts.styled';
import { Loader } from '../Loader/Loader';
import { useWatch } from '../../hooks/useWatch';
import { useFetch } from '../../hooks/useFetch';
import { Pagination } from '../Pagination/Pagination';
import { usePaginationContext } from '../../context/pagination';

export const Posts = () => {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('query'));
  const { page, setPage, setTotalPages } = usePaginationContext();
  // const [counter, setCounter] = useState(0);

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

  useWatch(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('query', query);
    window.history.replaceState(null, null, `?${params.toString()}`);
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
        {/* <button onClick={() => setCounter((prevState) => prevState + 1)}>
          Counter + 1
        </button>
        <h2>{counter}</h2> */}

        {isLoading && <Loader />}
        {error && <>There was an error</>}
        <SC.Posts>
          {articles?.hits?.map(({ title, points, objectID }) => (
            <Post key={objectID} likes={points} title={title} />
          ))}
        </SC.Posts>
        <Pagination />
      </Container>
    </div>
  );
};

// const add = () => {};

// add(2)(1)(); // 3
// add(3)(2)(1)(); // 6
// add(3)(2)(1)(5)(); // 11
