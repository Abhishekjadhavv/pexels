import { configureStore } from '@reduxjs/toolkit'
import getImageSlice from "./Slices/GetImages"

const store = configureStore({
  reducer:{
    image:getImageSlice,
  }
})

export default store