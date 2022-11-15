import { Container } from '../Container/Container';
import * as SC from './Hero.styled.js';

export const Hero = () => {
  return (
    <section>
      <Container>
        <SC.Label>HELLO, MY NAME IS MAX</SC.Label>
        <SC.Title as="h2" level="1">
          Helllloo
        </SC.Title>
        <SC.Description>
          I’m a front-end developer and co-founder of Codista, a software studio
          in Vienna.I also write about the web on my Blog and on Twitter.
        </SC.Description>
      </Container>
    </section>
  );
};
