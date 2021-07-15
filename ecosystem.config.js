module.exports = {
  apps: [
    {
      name: 'Oxygen-api',
      script: 'index.js',
      instances: -1,
      node_args: '-r esm',
      env: {
        NODE_ENV: 'local',
        instance: 0,
        exec_mode: 'cluster'
      },
      env_dev: {
        NODE_ENV: 'dev',
        instance: 0,
        exec_mode: 'cluster'
      },
      env_staging: {
        NODE_ENV: 'staging',
        instance: 0,
        exec_mode: 'cluster'
      },
      env_production: {
        NODE_ENV: 'production',
        instance: 0,
        exec_mode: 'cluster'
      }
    }
  ]
}
