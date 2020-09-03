// import { AppContext } from "next/app"
import './styles.css';

export default function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

// App.getInitialProps = async ({ Component, ctx }: AppContext) => {
//   //
//   // Check whether the page being rendered by the App has a
//   // static getInitialProps method and if so call it
//   //
//   let pageProps = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   return { pageProps }
// }
