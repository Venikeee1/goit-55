import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Posts } from './components/Posts/Posts';
import { Footer } from './components/Footer/Footer';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';
import { Container } from './components/Container/Container';

const App = () => {
  return (
    <div className="App">
      <div className="content">
        <Header />
        <Hero />
        <Container>
          <Pagination />
        </Container>
        <Posts />
      </div>
      <Footer />
    </div>
  );
};

export default App;
