// src/components/reducers/patientFormReducer.js
import { createSlice } from '@reduxjs/toolkit';

const patientFormSlice = createSlice({
  name: 'patientForm',
  initialState: {},
  reducers: {
    updatePatientData: (state, action) => {
      // Update state based on your needs
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePatientData } = patientFormSlice.actions;
export default patientFormSlice.reducer;
