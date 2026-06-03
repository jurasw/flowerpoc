import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { NotFoundPage } from '#/components/NotFoundPage'
import { getDictionary } from '#/lib/i18n/dictionaries'
import { I18nProvider } from '#/lib/i18n/i18n-context'
import { DEFAULT_LOCALE, type Locale } from '#/lib/i18n/locale'
import { getLocale } from '#/server/locale'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  beforeLoad: async (): Promise<{ locale: Locale }> => ({
    locale: await getLocale(),
  }),
  loader: ({ context }): { locale: Locale } => ({ locale: context.locale }),
  head: ({ loaderData }) => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: getDictionary(loaderData?.locale ?? DEFAULT_LOCALE).meta
          .rootTitle,
      },
      {
        name: 'theme-color',
        content: '#7c1f33',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        href: '/favicon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        href: '/favicon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale } = Route.useLoaderData()

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider locale={locale}>{children}</I18nProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
