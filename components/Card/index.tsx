import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

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
    <a href={href} className={cx('card')} data-row-type="card-block">
      <div className={cx('imageWrap')}>
        <Image
          className={cx('image')}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={cx('content')}>
        {description && <p className={cx('description')}>{description}</p>}
        <h3 className={cx('heading')}>{heading}</h3>
        <span className={cx('link')}>
          {linkText}
          <svg
            className={cx('arrow')}
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
