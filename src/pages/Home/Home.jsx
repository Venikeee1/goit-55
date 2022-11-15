import { Container } from '../../components/Container/Container';
import { Hero } from '../../components/Hero/Hero';
import { Pagination } from '../../components/Pagination/Pagination';
import { Posts } from '../../components/Posts/Posts';

const Homepage = () => {
  return (
    <>
      <Hero />
      <Container>
        <Pagination />
      </Container>
      <Posts />
    </>
  );
};

export default Homepage;
