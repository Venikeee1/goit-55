import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../api/articlesApi';
import { Container } from '../../components/Container/Container';
import { useFetch } from '../../hooks/useFetch';
import FALLBACK_THUMB from '../../assets/screen.avif';
import { BackButton } from '../../components/BackButton/BackButton';

const PostPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    () => fetchArticleById(id).then(({ data }) => data),
    [id]
  );

  return (
    <Container>
      {isLoading && <>Loading...</>}

      {data && (
        <>
          <div>
            <BackButton>Back</BackButton>
          </div>
          <span>Article id: {data.id}</span>
          <h1>{data.title}</h1>
          <img src={FALLBACK_THUMB} alt="" />
        </>
      )}
    </Container>
  );
};

export default PostPage;
