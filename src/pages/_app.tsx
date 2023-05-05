import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Obj } from '@/global/interface';
import store from '@/store';
import Message from '@/components/message';
import DefaultLayout from '@/layouts/default';
// import styles from '@/styles/Theme.module.scss';
import '@/styles/globals.scss';
import '@/styles/auth/FormCollect.scss';

const EmptyLayout = ({ children }: { children: React.ReactElement }) => {
  return children
}
export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as Obj)?.Layout || EmptyLayout;
  return <Provider store={store}>
    {/* <div className={styles.theme}> */}
    <Message />
    <Head>
      <title>MindX</title>
      <link rel="icon" type="image/x-icon" href="/static/logo.png" />
    </Head>
    <DefaultLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DefaultLayout>
    {/* </div> */}
  </Provider>
}
