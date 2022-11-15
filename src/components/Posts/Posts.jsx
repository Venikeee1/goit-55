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

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const { page, setPage, setTotalPages } = usePaginationContext();

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
            <Post key={objectID} id={objectID} likes={points} title={title} />
          ))}
        </SC.Posts>
        <Pagination />
      </Container>
    </div>
  );
};
