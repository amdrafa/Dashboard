import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage'
import './calendar.css'
import { LoginContextProvider } from '../contexts/LoginContext'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  
    return (
      <NextAuthProvider session={pageProps.session}>
        <LoginContextProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
          
        </ChakraProvider>
      </LoginContextProvider>
      </NextAuthProvider>
      
      
    )
  
  
}

export default MyApp
