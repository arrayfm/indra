export const getPathname = async (type: string, path: string) => {
  if (type === 'page' && path === '/home') return `/`

  switch (type) {
    case 'page':
      return path
    case 'article':
      return `/modules/${path}`
    case 'resource':
      return `/resources/${path}`
    case 'people':
      return `/people/${path}`
    default:
      return `/${type}/${path}`
  }
}
