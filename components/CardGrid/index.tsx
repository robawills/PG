import { ReactNode } from 'react';
import styles from './CardGrid.module.scss';

interface CardGridProps {
  children: ReactNode;
  signpost?: string;
  heading?: string;
}

export default function CardGrid({ children, signpost, heading }: CardGridProps) {
  return (
    <section className={styles.section}>
      {(signpost || heading) && (
        <div className={styles.header}>
          {signpost && <span className={styles.signpost}>{signpost}</span>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
        </div>
      )}
      <div className={styles.grid}>{children}</div>
    </section>
  );
}
