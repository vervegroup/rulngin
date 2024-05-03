import {Router} from '@vaadin/router'
import applicationRouter from "./ApplicationRouter.ts";

export const navigate = (path: string | { pathname: string, search?: string, hash?: string }): boolean => {
  return Router.go(path)
}

export const getRouterLocation = () => applicationRouter.location

// export const getRouterSearchParams = () => new URL(document.location).searchParams
