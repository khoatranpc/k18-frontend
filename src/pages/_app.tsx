import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Obj } from '@/global/interface';
import store from '@/store';
import Message from '@/components/message';
import DefaultLayout from '@/layouts/default';
// import styles from '@/styles/Theme.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/globals.scss';
import '@/styles/auth/FormCollect.scss';
import Auth from '@/utils/hocs';

const EmptyLayout = ({ children }: { children: React.ReactElement }) => {
  return children
}
export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as Obj)?.Layout || EmptyLayout;
  return <Provider store={store}>
    {/* <div className={styles.theme}> */}
    <Message />
    <DefaultLayout>
      {
        !Layout.isAuth ? <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth> : <Layout>
          <Component {...pageProps} />
        </Layout>
      }

    </DefaultLayout>
    {/* </div> */}
  </Provider>
}
