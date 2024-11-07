import { createSlice } from '@reduxjs/toolkit'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()
const isLogged = storage.getBoolean('isLogged')
const storedFavorites = storage.getString('favorites') // Favorileri saklamak için yeni alan

const initialState = {
  isLogged: isLogged || false,
  favorites: storedFavorites ? JSON.parse(storedFavorites) : [] // Favoriler dizisi
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    login: state => {
      state.isLogged = true
      storage.set('isLogged', state.isLogged)
    },
    logout: state => {
      state.isLogged = false
      storage.set('isLogged', state.isLogged)
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload)
      storage.set('favorites', JSON.stringify(state.favorites)) // Favorileri güncelle
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite !== action.payload
      )
      storage.set('favorites', JSON.stringify(state.favorites)) // Favorileri güncelle
    }
  }
})

export const { login, logout, addFavorite, removeFavorite } = slice.actions

export default slice.reducer
