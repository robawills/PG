import styles from './CTABanner.module.scss';

interface CTABannerProps {
  signpost?: string;
  heading: string;
  buttonText: string;
  href: string;
}

export default function CTABanner({
  signpost,
  heading,
  buttonText,
  href,
}: CTABannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {signpost && <span className={styles.signpost}>{signpost}</span>}
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      <a href={href} className={styles.button}>
        {buttonText}
      </a>
    </section>
  );
}
