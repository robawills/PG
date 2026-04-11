import classNames from 'classnames/bind';
import styles from './Hero.module.scss';

const cx = classNames.bind(styles);

interface HeroProps {
  signpost?: string;
  heading: string;
  subheading?: string;
}

export default function Hero({ signpost, heading, subheading }: HeroProps) {
  return (
    <section className={cx('hero')}>
      <div className={cx('inner')}>
        {signpost && <span className={cx('signpost')}>{signpost}</span>}
        <h1 className={cx('heading')}>{heading}</h1>
        {subheading && <p className={cx('subheading')}>{subheading}</p>}
      </div>
    </section>
  );
}
