import { Component } from 'react';
import { Container } from '../Container/Container';
import { Post } from './Post/Post';
import * as SC from './Posts.styled';

const POSTS = [
  {
    title: 'My best project1',
    likes: 5,
  },
  {
    title: 'My best project2',
    likes: 100,
  },
  {
    title: 'My best project3',
    likes: 400,
  },
  {
    title: 'My best project4',
    likes: 150,
  },
  {
    title: 'My best project5',
    likes: 200,
  },
  {
    title: 'My best project6',
    likes: 1,
  },
];

const POSTS_KEY = 'posts';

export class Posts extends Component {
  state = {
    posts: POSTS,
    newTitle: '',
    hasPostError: false,
    x: 0,
    y: 0,
  };

  handleTitleChange = (event) => {
    const { target } = event;
    this.setState({
      newTitle: target.value,
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

  persistPosts = () => {
    const persistedSerializedPosts = localStorage.getItem(POSTS_KEY);
    let persistedPosts;

    try {
      persistedPosts = JSON.parse(persistedSerializedPosts);
    } catch (error) {
      persistedPosts = null;
    }

    this.setState({
      posts: persistedPosts ?? POSTS,
    });
  };

  handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    this.setState({
      x: clientX,
      y: clientY,
    });
  };

  componentDidMount() {
    this.persistPosts();

    // document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentDidUpdate(prevProps, prevState) {
    const { posts } = this.state;

    if (posts === prevState.posts) return;

    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  componentDidCatch(error) {
    console.dir(error);
    this.setState({ hasPostError: true });
  }

  render() {
    const { posts, newTitle, x, y, hasPostError } = this.state;

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
              value={newTitle}
              onChange={this.handleTitleChange}
            />
            <button>Add</button>
          </SC.Form>

          <SC.Posts>
            {posts.map(({ title, likes }) => (
              <Post likes={likes} title={title} key={title} />
            ))}
          </SC.Posts>
        </Container>
      </div>
    );
  }
}
