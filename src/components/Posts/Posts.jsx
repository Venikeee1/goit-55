import { Component } from 'react';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import { fetchArticles } from '../../api/articlesApi';
import * as SC from './Posts.styled';
import { Loader } from '../Loader/Loader';
import { ApiRequest } from '../ApiRequest';

const POSTS_KEY = 'posts';

export class Posts extends Component {
  state = {
    posts: [],
    articles: [],
    loading: false,
    error: null,
    query: '',
    hasPostError: false,
    x: 0,
    y: 0,
  };

  handleQueryChange = (event) => {
    const { target } = event;
    this.setState({
      query: target.value,
    });
  };

  handlePostCreation = (event) => {
    event.preventDefault();

    const { newTitle } = this.state;
    const newPost = {
      title: newTitle,
    };

    this.setState((prevState) => ({
      posts: [newPost, ...prevState.posts],
      newTitle: '',
    }));
  };

  getPersistedPosts = () => {
    const persistedSerializedPosts = localStorage.getItem(POSTS_KEY);
    let persistedPosts;

    try {
      persistedPosts = JSON.parse(persistedSerializedPosts);
    } catch (error) {
      persistedPosts = null;
    }

    if (persistedPosts && persistedPosts.length > 0) {
      this.setState({
        posts: persistedPosts,
      });
    }
  };

  async searchArticles() {
    const { query } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await fetchArticles(query);
      this.setState({
        articles: data.hits,
        error: null,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.getPersistedPosts();
    // query=query&page=2&filter=true
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query === '') {
      this.searchArticles();
    }

    this.setState({ query: params.get('query') });
  }

  componentDidUpdate(prevProps, prevState) {
    const { posts, query } = this.state;

    if (query !== prevState.query) {
      const params = new URLSearchParams();
      params.set('query', query);
      window.history.replaceState(null, null, `?${params.toString()}`);
      this.searchArticles();
    }

    if (posts === prevState.posts) return;

    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  componentDidCatch(error) {
    this.setState({ hasPostError: true });
  }

  render() {
    const { articles, query, x, y, hasPostError, loading, error } = this.state;

    if (hasPostError) {
      return <span>THere was an error</span>;
    }

    return (
      <div>
        <Container>
          <SC.MouseDecorator style={{ left: x, top: y }} />
          <SC.Form onSubmit={this.handlePostCreation}>
            <input
              type="text"
              value={query}
              onChange={this.handleQueryChange}
            />
            <button>Add</button>
          </SC.Form>

          {loading && <Loader />}
          {error && <>There was an error</>}
          <SC.Posts>
            {articles.map(({ title, points, objectID }) => (
              <Post key={objectID} likes={points} title={title} />
            ))}
          </SC.Posts>
          {/* <ApiRequest request={() => fetchArticles(query)}>
            {({ data, loading, error }) => {
              if (loading) {
                return <Loader />;
              }

              if (error) {
                return <>There was an error</>;
              }

              return data?.hits?.map(({ title, points, objectID }) => (
                <Post key={objectID} likes={points} title={title} />
              ));
            }}
          </ApiRequest> */}
        </Container>
      </div>
    );
  }
}
