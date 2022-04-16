import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import router from '@/router'

Sentry.init({
  Vue,
  dsn: 'https://6eb911f211ab431fb9e128953d0c7654@o1206780.ingest.sentry.io/6340307',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['lk.playlabirint.ru', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
})
