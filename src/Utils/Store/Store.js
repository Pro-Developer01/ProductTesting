import { configureStore } from '@reduxjs/toolkit'
import ideacardReducer from '../Features/IdeacardSlice'
import breadcumReducer from '../Features/breadcumSlice'

export default configureStore({
    reducer: { ideacardReducer, breadcumReducer }
})