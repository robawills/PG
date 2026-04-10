import Image from 'next/image';
import styles from './Card.module.scss';

interface CardProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  heading: string;
  description?: string;
  href: string;
  linkText: string;
}

export default function Card({
  image,
  heading,
  description,
  href,
  linkText,
}: CardProps) {
  return (
    <a href={href} className={styles.card} data-row-type="card-block">
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        {description && <p className={styles.description}>{description}</p>}
        <h3 className={styles.heading}>{heading}</h3>
        <span className={styles.link}>
          {linkText}
          <svg
            className={styles.arrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
