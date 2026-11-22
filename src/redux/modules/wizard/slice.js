import { createSlice } from '@reduxjs/toolkit'

// Values shared by the artist search, seed data and generated song pages.
// Replaces the former redux-form 'wizard' form state.
const initialState = {
  search: '',
  artistId: undefined,
  fistThreeWords: '',
  termsAndConditions: false,
}

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    changeField: (state, action) => {
      state[action.payload.field] = action.payload.value
    },
    resetWizard: () => initialState,
  },
})

export const { changeField, resetWizard } = wizardSlice.actions

export const selectWizard = state => state.wizard

export default wizardSlice.reducer
