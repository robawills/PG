import classNames from 'classnames/bind';
import styles from './CTABanner.module.scss';

const cx = classNames.bind(styles);

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
    <section className={cx('section')}>
      <div className={cx('inner')}>
        {signpost && <span className={cx('signpost')}>{signpost}</span>}
        <h2 className={cx('heading')}>{heading}</h2>
      </div>
      <a href={href} className={cx('button')}>
        {buttonText}
      </a>
    </section>
  );
}
