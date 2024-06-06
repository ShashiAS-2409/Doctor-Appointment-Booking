import { createSlice } from "@reduxjs/toolkit";

const initialPatientList = []
const patientListSlice = createSlice({
    name: 'patientList',
    initialState: initialPatientList,
    reducers:{
        updatePatientbyID(state, action){
            return state;
        },
        deletePatientByID(state, action){
            return state;
        }
    }
});

export const {updatePatientbyID, deletePatientByID} = patientListSlice.actions;

export default patientListSlice.reducer;