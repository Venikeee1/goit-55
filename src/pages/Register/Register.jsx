import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { registerUser } from '../../redux/auth/operations';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget: formRef } = event;
    const { email, password, name } = formRef.elements;

    const credentials = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    dispatch(registerUser(credentials))
      .unwrap()
      .then(() => navigate('/', { replace: true }))
      .catch((error) => {});
  };

  return (
    <Container>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" autoComplete="off" />
        <input type="text" name="email" autoComplete="off" />
        <input type="password" name="password" autoComplete="off" />
        <button type="submit">Register</button>
      </form>
    </Container>
  );
};

export default Register;
