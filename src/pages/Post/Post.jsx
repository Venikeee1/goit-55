import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../api/articlesApi';
import { Container } from '../../components/Container/Container';
import { useFetch } from '../../hooks/useFetch';

const PostPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(() => fetchArticleById(id), [id]);
  console.log(data);

  return (
    <Container>
      {isLoading && <>Loading...</>}
      Hello
    </Container>
  );
};

export default PostPage;
