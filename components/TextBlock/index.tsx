import styles from './TextBlock.module.scss';

interface TextBlockProps {
  signpost?: string;
  heading: string;
  body: string;
}

export default function TextBlock({ signpost, heading, body }: TextBlockProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {signpost && <span className={styles.signpost}>{signpost}</span>}
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      <p className={styles.body}>{body}</p>
    </section>
  );
}
