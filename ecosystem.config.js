module.exports = {
  apps: [
    {
      name: 'fanboylove-web',
      script: './bin/www',
      instances: 0,
      exec_mode: 'cluster',
      watch: true
    }
  ]
}
