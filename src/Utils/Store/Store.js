import { configureStore } from '@reduxjs/toolkit'
import ideacardReducer from '../Features/IdeacardSlice'
import breadcumReducer from '../Features/breadcumSlice'
import levelCounterReducer from '../Features/levelCounterSlice'
import persistentDrawerReducer from '../Features/persistentDrawerSlice'

export default configureStore({
    reducer: { ideacardReducer, breadcumReducer, levelCounterReducer, persistentDrawerReducer }
})