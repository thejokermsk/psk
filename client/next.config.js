module.exports = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://psk-development.ru/media/:path*' // Proxy to Backend
      }
    ]
  }
}
