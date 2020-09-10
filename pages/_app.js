import 'normalize.css'
import '../styles/globals.scss'

import { ApolloProvider } from '@apollo/client'
import client from '../services/apollo/client'

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
