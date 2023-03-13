import devConsole from '@hakushin/plugin-dev-console'

export default {
  type: 'pc',
  port: 3200,
  plugins: [
    devConsole(),
  ],
}
