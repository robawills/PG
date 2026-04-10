import styles from './Hero.module.scss';

interface HeroProps {
  signpost?: string;
  heading: string;
  subheading?: string;
}

export default function Hero({ signpost, heading, subheading }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {signpost && <span className={styles.signpost}>{signpost}</span>}
        <h1 className={styles.heading}>{heading}</h1>
        {subheading && <p className={styles.subheading}>{subheading}</p>}
      </div>
    </section>
  );
}
