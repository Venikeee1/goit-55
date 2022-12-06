import React, { useState, useEffect } from 'react';
import { Form, Input, Btn } from './Movies.styled';
import { getMoviesBySearch } from 'api/fetchApi';
import { NavLink } from 'react-router-dom';

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesBySearch(query);
  }, [query]);

  const handleMovieName = (event) => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setQuery(query);
    // console.log(query);
    // setQuery(event.currentTarget);
    if (query.trim() === '') {
      return;
    }

    getMoviesBySearch(query).then((movies) => {
      setMovies(movies.hits);
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleMovieName} />
        <Btn type="submit" value="Search" />
      </Form>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id} id={id}>
            <NavLink>{title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
