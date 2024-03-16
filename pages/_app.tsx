import { Provider } from 'react-redux';
import { AppProps } from 'next/app'; // Import the AppProps type
import { store } from '../redux/store/store';
import '../styles/globals.css'

// Use the AppProps type for your component's props
function TalentApp({ Component, pageProps }: AppProps) {
 
  console.log('store ', store)
  // console.log('page props ', pageProps)



  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default TalentApp;