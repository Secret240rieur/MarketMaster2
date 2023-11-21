import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface InfoState {
  categoryFilter: string;
  cityFilter: string;
  category: string;
  city: string;
  imagesUrl: string[];
  uid: string | undefined;
  user: User | undefined;
  activeAds: Ad[] | undefined;
  disabledAds: Ad[] | undefined;
  deletedAds: Ad[] | undefined;
  isDarkMode: boolean;
}

const initialState: InfoState = {
  category: 'Toutes les categories',
  categoryFilter: 'Toutes les categories',
  city: 'Tout le Maroc',
  cityFilter: 'Tout le Maroc',
  imagesUrl: [],
  uid: '',
  user: undefined,
  activeAds: undefined,
  disabledAds: undefined,
  deletedAds: undefined,
  isDarkMode: false,
};

export const InfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setActiveAds: (state, action: PayloadAction<Ad[]>) => {
      state.activeAds = action.payload;
    },
    setDisabledAds: (state, action: PayloadAction<Ad[]>) => {
      state.disabledAds = action.payload;
    },
    setDeletedAds: (state, action: PayloadAction<Ad[]>) => {
      state.deletedAds = action.payload;
    },
    setImagesUrl: (state, action: PayloadAction<string[]>) => {
      state.imagesUrl = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCityFilter: (state, action: PayloadAction<string>) => {
      state.cityFilter = action.payload;
    },
    reset: state => {
      state.city = 'Tout le Maroc';
      state.category = 'Toutes les categories';
      state.imagesUrl = [];
    },
    resetFilter: state => {
      state.cityFilter = 'Tout le Maroc';
      state.categoryFilter = 'Toutes les categories';
    },
    setUid: (state, action: PayloadAction<string | undefined>) => {
      state.uid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsDarkMode,
  setCategory,
  setCategoryFilter,
  setCity,
  setCityFilter,
  setImagesUrl,
  reset,
  resetFilter,
  setUid,
  setUser,
  setActiveAds,
  setDisabledAds,
  setDeletedAds,
} = InfoSlice.actions;

export default InfoSlice.reducer;
