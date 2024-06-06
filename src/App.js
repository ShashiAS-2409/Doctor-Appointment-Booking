//src 
import React, {useState} from 'react';
import { connect } from 'react-redux';
import Form from './components/appointment';
import Details from './components/details';
import './App.css';
import { bookAppointment, updateAppointment, deleteAppointment } from './components/actions/appointmentActions';
function App({ appointments, dispatch }) {
 

  const [editedAppointmentIndex, setEditedAppointmentIndex] = useState(null);

  const handleBookAppointment = (newAppointment) => {
    console.log(editedAppointmentIndex);
    if (editedAppointmentIndex !== null) {
      dispatch(updateAppointment({ appointment: newAppointment, index: editedAppointmentIndex }));
      setEditedAppointmentIndex(null);
    } else {
      dispatch(bookAppointment(newAppointment));
    }
  };
  

  const handleDelete = (index) => {
    dispatch(deleteAppointment(index));
  };

  const handleEdit = (index) => {
    setEditedAppointmentIndex(index);
  };

  return (
    <div className='App'>
      <Form
        handleBookAppointment={handleBookAppointment}
        editedAppointmentData={editedAppointmentIndex !== null ? appointments[editedAppointmentIndex] : null}
      />
      <div style={{ width: "100%", height: '3px', backgroundColor: 'black' }} />
      <Details appointments={appointments} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  appointments: state.appointment.appointments,
});

export default connect(mapStateToProps)(App);
