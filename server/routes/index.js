const path = require('path')

const routesArr = [
  {
    name: '/',
    routerName: 'root',
    fileName: '/'
  },
  {
    name: '/users',
    routerName: 'users',
    fileName: '/'
  },
  {
    name: '/api',
    routerName: 'upload',
    fileName: '/'
  },
  {
    name: '/api',
    routerName: 'cityList',
    fileName: '/'
  },
  {
    name: '/books',
    routerName: 'index',
    fileName: '/books/'
  }
]

const routes = (app) => {
  for (let router of routesArr.values()) {
    app.use(router.name, require(path.resolve(__dirname, `.${router.fileName}${router.routerName}`)))
  }
}

module.exports = routes
