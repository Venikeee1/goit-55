import styled, { css } from 'styled-components';

const fontSizeLevels = {
  1: 36,
  2: 32,
  3: 28,
  4: 24,
  5: 20,
  6: 16
}

const getHeadingStyles = (level = 1) => {
  return fontSizeLevels[level] + 'px'
}

export const Title = styled.h1`
  font-size: ${(props) => getHeadingStyles(props.level)};
`

export const Label = styled.div`
  font-size: 20px;
  color: red;
`

export const Description = styled.p`
  font-size: 20px;
`
