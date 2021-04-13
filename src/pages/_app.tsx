import NextNprogress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import '../styles/main.scss'
import React from 'react'
import store from 'store/rootReducer'
import { MainLayout } from 'components/MainLayout'


interface MyAppType {
   Component: React.ComponentType
   pageProps?: any
}
const MyApp: React.FC<MyAppType> = ({ Component, pageProps }) => {
   const progresConfig = {
      color: "red",
      startPosition: 0.3,
      stopDelayMs: 200,
      height: 2
   }
   return (
      <MainLayout>
         <NextNprogress
            {...progresConfig}
         />
         <Provider store={store}>
            <Component {...pageProps} />
         </Provider>
      </MainLayout>
   )
}
export default MyApp