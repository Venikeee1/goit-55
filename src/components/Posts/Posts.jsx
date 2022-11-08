import { useState, useEffect, useCallback } from 'react';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import { fetchArticles } from '../../api/articlesApi';
import * as SC from './Posts.styled';
import { Loader } from '../Loader/Loader';
import { useWatch } from '../../hooks/useWatch';
import { useFetch } from '../../hooks/useFetch';

export const Posts = () => {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('query'));

  const {
    data: articles,
    isLoading,
    error,
  } = useFetch(
    () => fetchArticles(query).then((res) => res.data.hits),
    [query]
  );

  const handleQueryChange = (event) => {
    const { target } = event;
    setQuery(target.value);
  };

  useWatch(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('query', query);
    window.history.replaceState(null, null, `?${params.toString()}`);
  }, [query]);

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
          {articles?.map(({ title, points, objectID }) => (
            <Post key={objectID} likes={points} title={title} />
          ))}
        </SC.Posts>
      </Container>
    </div>
  );
};
