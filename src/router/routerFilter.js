export const mapRoute = (opt) => {
  return opt.map(({
    children = [],
    redirect = '',
    meta = {},
    folderName = 'views',
    component,
    path,
    name,
    key
  } = {}) => {
    return {
      key,
      path: path,
      name: name,
      redirect: redirect,
      children: mapRoute(children),
      meta: meta,
      component: () => import(`@/${folderName}/${component}.vue`)
    }
  })
}
