import defaultSettings from '@/settings'

const title = `云端拍摄中心: ${defaultSettings.title}` || '云端拍摄中心'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
