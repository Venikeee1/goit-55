import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { loginUser } from '../../redux/auth/operations';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget: formRef } = event;
    const { email, password } = formRef.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => navigate('/', { replace: true }))
      .catch((error) => {});
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" autoComplete="off" />
        <input type="password" name="password" autoComplete="off" />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register user</Link>
    </Container>
  );
};

export default Login;
