import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import { ToastContainer } from "react-toastify";
import { Obj } from "@/global/interface";
import Auth from "@/utils/hocs";
import store from "@/store";
import Message from "@/components/message";
import DrawerComponent from "@/components/Drawer";
import DefaultLayout from "@/layouts/default";
// import styles from '@/styles/Theme.module.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "cropperjs/dist/cropper.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/globals.scss";
import "@/styles/auth/FormCollect.scss";

const EmptyLayout = ({ children }: { children: React.ReactElement }) => {
  return children;
};
export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as Obj)?.Layout || EmptyLayout;
  const Public = (Component as Obj)?.isPublic;
  return (
    <Provider store={store}>

      {/* <div className={styles.theme}> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#bb0409'
          }
        }}
      >
        <Message />
        <DrawerComponent />
        <ToastContainer />
        <DefaultLayout>
          {Public ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : !Layout.isAuth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </DefaultLayout>
        {/* </div> */}
      </ConfigProvider>
    </Provider>
  );
}
