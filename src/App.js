import { Component } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Posts } from './components/Posts/Posts';
import { Footer } from './components/Footer/Footer';
import './App.css';

class App extends Component {
  state = {
    isPostsShown: true,
  };

  togglePosts = () => {
    this.setState((prevState) => ({
      isPostsShown: !prevState.isPostsShown,
    }));
  };

  render() {
    const { isPostsShown } = this.state;

    return (
      <div className="App">
        <div className="content">
          <Header />
          <Hero />
          <button onClick={this.togglePosts}>SHow posts</button>
          {isPostsShown && <Posts />}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
