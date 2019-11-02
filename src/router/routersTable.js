module.exports = [
  {
    path: '/',
    name: 'home',
    component: 'Home',
    folderName: 'views/main',
    redirect: '/bookCity',
    children: [
      {
        // 书架
        path: 'bookshelf',
        name: 'bookshelf',
        component: 'Bookshelf',
        folderName: 'views/main'
      },
      {
        // 书城
        path: 'bookCity',
        name: 'bookCity',
        component: 'BookCity',
        folderName: 'views/main'
      },
      {
        // 我的
        path: 'my',
        name: 'my',
        component: 'My',
        folderName: 'views/main'
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: 'About'
  },
  {
    path: '/readView',
    name: 'readView',
    component: 'ReadView',
    folderName: 'views'
  }
]
