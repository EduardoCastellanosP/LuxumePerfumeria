import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { ServerUrlProvider } from './lib/router'
import { headHtml, matchRoute, seoFor, staticPaths } from './lib/routes'

export { staticPaths }

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <ServerUrlProvider value={url}>
        <App />
      </ServerUrlProvider>
    </StrictMode>,
  )
  return { html, head: headHtml(seoFor(matchRoute(url), url)) }
}
