import SEO from '../components/SEO';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <SEO title="Dev News!" excludeTitleSuffix />
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev!</span>
          <h1>
            Bem-vindo <br />
            ao <span>Dev</span>News!
          </h1>
          <p>
            Um blog com conteúdos extremamente <br />
            <span>interessantes</span> para o seu aprendizado.
          </p>
        </section>
        <img src="/home.svg" alt="Home image" />
      </main>
    </>
  );
}
