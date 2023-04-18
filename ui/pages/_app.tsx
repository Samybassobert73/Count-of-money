import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RootState, store} from '../store/store';
import {Provider, useSelector} from 'react-redux';
import { ThemeProvider } from 'next-themes';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { UserContext } from '../components/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TokenStorageService } from '../_interceptors/token-storage';
import UserServices from '../_services/user';
import { persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  const userService = new UserServices();
  const tokenStorage = new TokenStorageService();
  const [token, setToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = tokenStorage.getToken();
    
    // @ts-ignore
    setToken(token)

    // if (token) {
    //   const verifyToken = tokenStorage.verifyToken(token);
    //   if (!verifyToken) {
    //     router.push('/login').then(r => null)
    //   }
    // }
  }, [])


  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserContext.Provider value={token}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
            </SessionProvider>
          </UserContext.Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
