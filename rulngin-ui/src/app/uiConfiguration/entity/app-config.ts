// Application Root URL
let _rootUrl = ''
export const appRootUrl = (): string => {
  return _rootUrl
}
_rootUrl = window.location.origin // default (local)

// Application Name
let _appName = ''
export const appName = (): string => {
  return _appName
}
_appName = 'TechEule - RulNgin' // default (local)

// Application Name
let _appVersion = ''
export const appVersion = (): string => {
  return _appVersion
}
_appVersion = '0.0.0' // default (local)
