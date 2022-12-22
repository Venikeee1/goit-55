import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { FormContainer, InputContainer } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { loginUser } from '../../redux/auth/operations';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget: formRef } = event;
    const { email, password } = formRef.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    dispatch(loginUser(credentials));
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h1>Login</h1>
        <InputContainer>
          <Input type="text" name="email" autoComplete="off" />
        </InputContainer>
        <InputContainer>
          <Input type="password" name="password" autoComplete="off" />
        </InputContainer>
        <button type="submit">Login</button>
        <Link to="/register">Register user</Link>
      </FormContainer>
    </Container>
  );
};

export default Login;
