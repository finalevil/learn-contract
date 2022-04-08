import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import config from './config'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={config.morailsAppId} serverUrl={config.morailsServerUrl}>
      <Component {...pageProps} />;
    </MoralisProvider>
  )
}

export default MyApp
