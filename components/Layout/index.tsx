import Head from 'next/head';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

interface LayoutProps {
  children: ReactNode;
  meta?: {
    title?: string;
    description?: string;
  };
}

export default function Layout({ children, meta }: LayoutProps) {
  const title = meta?.title ?? 'New Site';
  const description = meta?.description ?? '';

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={cx('main')}>{children}</main>
    </>
  );
}
