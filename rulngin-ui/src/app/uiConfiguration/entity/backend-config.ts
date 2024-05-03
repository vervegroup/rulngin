// Application Root URL
let _backendRootUrl = ''
export const backendRootUrl = (): string => {
  return _backendRootUrl
}
_backendRootUrl = 'http://localhost:51080/resources' // default (local)
