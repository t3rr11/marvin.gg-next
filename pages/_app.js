import React from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import '../styles/globals.css';

const backgrounds = ["BlueGradient", "GreenGradient", "PureLust", "FeelTheLove", "MidnightGradient", "Lawrencium"];

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout backgrounds={backgrounds}>
      <Component {...pageProps} />
    </Layout>
  );
}