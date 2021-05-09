import '@/public/css/bootstrap.min.css'
import 'animate.css'
import '@/public/css/boxicons.min.css'
import '@/public/css/flaticon.css'
import "@/public/css/slick.css"
import 'react-accessible-accordion/dist/fancy-example.css'
import '@/public/css/style.css'
import '@/public/css/responsive.css'

// Multicolor if you want this color comment out 
// import '@/public/css/colors/brink-pink-style.css'
// import '@/public/css/colors/pink-style.css'
// import '@/public/css/colors/purple-style.css'  

import Layout from '@/components/_App/Layout'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import { useStore } from '../store'
import {useRouter} from 'next/router'

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    const router = useRouter()

    return (
        <ToastProvider 
            placement = "bottom-left"
            autoDismissTimeout={6000}
            autoDismiss
        >
            <Provider store={store}>
                <Layout />
                <Component {...pageProps} key={router.asPath}/>
            </Provider>
        </ToastProvider>
    )
}
