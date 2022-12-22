import { Logo } from '../Logo/Logo';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { Container } from '../Container/Container';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectLikedPostsIds } from '../../redux/likedPosts/slice';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const isDesktop = window.innerWidth > 800;
  const likedPosts = useSelector(selectLikedPostsIds);
  const { logout, isLoggedIn } = useAuth();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Logo />
          <div className={styles.actions}>
            <button className={styles.likedPostsButton}>
              ♡<span className={styles.totalLikes}>{likedPosts.length}</span>
            </button>
            <HeaderNav isDesktop={isDesktop} />

            {!isLoggedIn && (
              <Link className={styles.authLink} to="/login">
                Login
              </Link>
            )}

            {isLoggedIn && (
              <button onClick={logout} className={styles.authLink}>
                Logout
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
