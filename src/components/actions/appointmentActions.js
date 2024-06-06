// src/components/actions/appointmentActions.js
import { createAction } from '@reduxjs/toolkit';

export const bookAppointment = createAction('BOOK_APPOINTMENT');
export const updateAppointment = createAction('UPDATE_APPOINTMENT');
export const deleteAppointment = createAction('DELETE_APPOINTMENT');
