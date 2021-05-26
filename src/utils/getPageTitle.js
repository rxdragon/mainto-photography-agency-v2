const title = '外包重构'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
