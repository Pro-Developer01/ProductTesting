import { configureStore } from '@reduxjs/toolkit'
import ideacardReducer from '../Features/IdeacardSlice'

export default configureStore({
    reducer: { ideacardReducer }
})