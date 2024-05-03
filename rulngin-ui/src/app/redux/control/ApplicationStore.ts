import { configureStore } from '@reduxjs/toolkit'
import storageService from '../../stateStorage/boundary/StorageService.ts'
import rootReducer from './RootReducer.ts'

const preloadedState = storageService.load() ?? {}

const applicationStore = configureStore({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  reducer: rootReducer,
  preloadedState
})

applicationStore.subscribe(() => {
  storageService.save(applicationStore.getState())
})

export default applicationStore
