import { Logo } from '../Logo/Logo';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { Container } from '../Container/Container'
import styles from './Header.module.css';

export const Header = () => {
  const isDesktop = window.innerWidth > 800;

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Logo />
          <HeaderNav isDesktop={isDesktop} />
        </div>
      </Container>
    </header>
  );
};
