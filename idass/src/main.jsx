import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-o38m0vc1d4ac37jq.us.auth0.com"
      clientId="SpLB9BifsbXxq8v87BQDiIAIrhVHR17i"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)