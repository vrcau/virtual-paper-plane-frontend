import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
    ssr: true,
    blueprint: md3,
    theme: {
      themes: {
        dark: {
          colors: {
            primary: '#009688',
            secondary: '#00695C',
          },
        },
        light: {
          colors: {
            primary: '#009688',
            secondary: '#00695C',
          },
        },
      },
    },
  })

  app.use(vuetify)
}
