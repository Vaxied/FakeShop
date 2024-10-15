import React from 'react'
import { StoreContextType } from '../../@types/store.js'

export const StoreContext = React.createContext<StoreContextType | null>(null)
