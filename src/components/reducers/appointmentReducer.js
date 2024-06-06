import { createReducer } from '@reduxjs/toolkit';
import { bookAppointment, updateAppointment, deleteAppointment } from '../actions/appointmentActions';

const initialState = {
  appointments: [{
    patientName: 'Shashidhar',
    phoneNumber: '77308723976',
    doctorName: 'sai mani',
    gender: 'male',
    date: '24-02-2024',
    status: 'Revisit',
    age: '24',
    time: '12:30',
    image: '',
  }],
};

const appointmentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bookAppointment, (state, action) => {
      state.appointments.push(action.payload);
    })
    .addCase(updateAppointment, (state, action) => {
      const { index, appointment } = action.payload;
      state.appointments[index] = { ...state.appointments[index], appointment };
    })
    .addCase(deleteAppointment, (state, action) => {
      const index = action.payload;
      state.appointments.splice(index, 1);
    });
});

export default appointmentReducer;
