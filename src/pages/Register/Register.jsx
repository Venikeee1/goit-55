import { useDispatch } from 'react-redux';
import { Container } from '../../components/Container/Container';
import { FormContainer } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { registerUser } from '../../redux/auth/operations';

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget: formRef } = event;
    const { email, password, name } = formRef.elements;

    const credentials = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    dispatch(registerUser(credentials));
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Input type="text" name="name" autoComplete="off" />
        <Input type="text" name="email" autoComplete="off" />
        <Input type="password" name="password" autoComplete="off" />
        <button type="submit">Register</button>
      </FormContainer>
    </Container>
  );
};

export default Register;
