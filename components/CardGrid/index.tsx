import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './CardGrid.module.scss';

const cx = classNames.bind(styles);

interface CardGridProps {
  children: ReactNode;
  signpost?: string;
  heading?: string;
}

export default function CardGrid({ children, signpost, heading }: CardGridProps) {
  return (
    <section className={cx('section')}>
      {(signpost || heading) && (
        <div className={cx('header')}>
          {signpost && <span className={cx('signpost')}>{signpost}</span>}
          {heading && <h2 className={cx('heading')}>{heading}</h2>}
        </div>
      )}
      <div className={cx('grid')}>{children}</div>
    </section>
  );
}
