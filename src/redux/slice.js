import {createSlice} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const isLogged = storage.getBoolean('isLogged');

const favoriteListStorage = storage.getString('favoriteList');
const favoriteList = favoriteListStorage && JSON.parse(favoriteListStorage);

const initialState = {
  isLogged: isLogged || false,
  favoriteList: favoriteList || [],
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    login: state => {
      state.isLogged = true;
      storage.set('isLogged', state.isLogged);
    },
    logout: state => {
      state.isLogged = false;
      storage.set('isLogged', state.isLogged);
    },
    clearFavorites: state => {
      state.favoriteList = [];
      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
    changeFavoriteList: (state, action) => {
      const place = action.payload;

      if (!place || !place.id) {
        console.error('Geçersiz place:', place);
        return;
      }

      const isFavorite = state.favoriteList.find(item => item.id === place.id);

      if (isFavorite) {
        state.favoriteList = state.favoriteList.filter(
          item => item.id !== place.id,
        );
      } else {
        state.favoriteList.push(place);
      }

      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
  },
});

export const {
  login,
  logout,
  addFavorite,
  removeFavorite,
  clearFavorites,
  changeFavoriteList,
} = slice.actions;

export default slice.reducer;
