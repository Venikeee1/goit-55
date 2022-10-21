import styles from './Logo.module.css';

export const Logo = () => {
  return <div className={styles.container}>
    <img src="https://wallpapercave.com/wp/Ex9MlTC.jpg" alt="" className={styles.img} />
    <span className={styles.name}>Tom</span>
  </div>;
};
