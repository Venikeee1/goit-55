import styled from 'styled-components';

export const Posts = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const Form = styled.form`
  margin: 15px 0;
`;

export const MouseDecorator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  opacity: 0.3;
  border-radius: 50%;
  background: #fff;
  z-index: 10;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
