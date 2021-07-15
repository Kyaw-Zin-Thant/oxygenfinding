const env = process.env.NODE_ENV || 'local'

const config = {
  test: {
    port: 8383,
    db: 'mongodb://localhost/oxygen'
  },
  local: {
    port: 8383,
    db: 'mongodb://localhost/oxygen'
  },
  dev: {
    port: 8383,
    db: 'mongodb://localhost/oxygen'
  },
  staging: {
    port: 8383,
    db: 'mongodb://localhost/oxygen'
  },
  production: {
    port: 8383,
    db: 'mongodb://localhost/oxygen'
  }
}

export default {
  ...config[env]
}
