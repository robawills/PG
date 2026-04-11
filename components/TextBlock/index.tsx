import classNames from 'classnames/bind';
import styles from './TextBlock.module.scss';

const cx = classNames.bind(styles);

interface TextBlockProps {
  signpost?: string;
  heading: string;
  body: string;
}

export default function TextBlock({ signpost, heading, body }: TextBlockProps) {
  return (
    <section className={cx('section')}>
      <div className={cx('inner')}>
        {signpost && <span className={cx('signpost')}>{signpost}</span>}
        <h2 className={cx('heading')}>{heading}</h2>
      </div>
      <p className={cx('body')}>{body}</p>
    </section>
  );
}
