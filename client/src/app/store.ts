import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './reducers/AuthReducers'

// Configuration de Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Seulement persister l'auth
}

// Combiner tous les reducers
const rootReducer = combineReducers({
  auth: authReducer
})

// Reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuration du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Persistor pour Redux Persist
export const persistor = persistStore(store)
