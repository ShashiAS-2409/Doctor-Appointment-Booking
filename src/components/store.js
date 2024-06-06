// src/components/store.js
import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './reducers/appointmentReducer';
import patientFormReducer from './reducers/patientForm.reducer';

console.log('store File');
const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    patientForm: patientFormReducer,
  },
});

export default store;
