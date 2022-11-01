import styled from 'styled-components';

export const Card = styled.section`
  position: relative;
  border-radius: 4px;
  height: 300px;
  overflow: hidden;
`;

export const Container = styled.div`
  height: 100%;
  padding: 15px;
  position: relative;
  box-sizing: border-box;
`;

export const Thumbs = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Likes = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;
`;
