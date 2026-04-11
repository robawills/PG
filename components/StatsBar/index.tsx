import classNames from 'classnames/bind';
import styles from './StatsBar.module.scss';

const cx = classNames.bind(styles);

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className={cx('section')}>
      {stats.map((stat) => (
        <div key={stat.label} className={cx('stat')}>
          <span className={cx('value')}>{stat.value}</span>
          <span className={cx('label')}>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
