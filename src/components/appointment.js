import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bookAppointment, updateAppointment } from './actions/appointmentActions';

function Appointment(props) {
  const [userData, setUserData] = useState({
    patientName: '',
    phoneNumber: '',
    doctorName: '',
    gender: '',
    date: '',
    status: '',
    age: '',
    time: '',
    image: '',
  });

  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM/PM');
  const periods = ['AM/PM', 'AM', 'PM'];

  const timeRegex = /^(0?[1-9]|1[0-2]):([0-5]?[0-9]) (AM|PM|AM\/PM)$/;

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const alphaRegex = /^[a-zA-z ]*$/;
  const numericRegex = /^[0-9]*$/;

  const handleBookAppointment = (e) => {
    e.preventDefault();

    if (isFormValid(userData)) {
      props.handleBookAppointment(userData);

      // Reset form fields after booking appointment
      setUserData({
        patientName: '',
        phoneNumber: '',
        doctorName: '',
        gender: '',
        date: '',
        status: '',
        age: '',
        time: '',
        image: '',
      });

      setSelectedHour('01');
      setSelectedMinute('00');
      setSelectedPeriod('AM/PM');
    }
  };

  const isFormValid = (userData) => {
    let isValid = true;

    if (userData.patientName === '') {
      isValid = false;
    }
    if (userData.phoneNumber === '') {
      isValid = false;
    }
    if (userData.doctorName === '') {
      isValid = false;
    }
    if (userData.gender === '') {
      isValid = false;
    }
    if (userData.date === '') {
      isValid = false;
    }
    if (userData.status === '') {
      isValid = false;
    }
    if (userData.age === '') {
      isValid = false;
    }
    if (userData.time === '') {
      isValid = false;
    }
    return isValid;
  };
  useEffect(() => {
    if (props.editedAppointmentData) {
      setUserData(props.editedAppointmentData);

      const [hours, minutes, period] = props.editedAppointmentData.time.split(/:| /);

      setSelectedHour(hours);
      setSelectedMinute(minutes);
      setSelectedPeriod(period);
    }
  }, [props.editedAppointmentData]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Handle different input fields
    if (field === 'patientName' && (alphaRegex.test(value) || value === '')) {
      setUserData({ ...userData, patientName: value });
    } else if (field === 'doctorName' && (alphaRegex.test(value) || value === '')) {
      setUserData({ ...userData, doctorName: value });
    } else if (field === 'phoneNumber' && (numericRegex.test(value) || value === '')) {
      setUserData({ ...userData, phoneNumber: value });
    } else if (field === 'age' && value > 0) {
      setUserData({ ...userData, age: value });
    } else if (field === 'date') {
      setUserData({ ...userData, date: value });
    } else if (field === 'status') {
      setUserData({ ...userData, status: value });
    }
  };

  const handleTimeChange = (field, value) => {
    if (timeRegex.test(`${selectedHour}:${selectedMinute} ${selectedPeriod}`) || value === '') {
      if (field === 'hour') {
        setSelectedHour(value);
      } else if (field === 'minute') {
        setSelectedMinute(value);
      } else if (field === 'period') {
        setSelectedPeriod(value);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
      }));
    }
  };

  return (
    <>
      <div className='heading'>
        Welcome to Devil's Doctor Appointment Booking
      </div>
      <form className='form' onSubmit={handleBookAppointment}>
        <input
          type='text'
          placeholder='Patient Name *'
          value={userData.patientName}
          onChange={(e) => handleInputChange(e, 'patientName')}
          required
        />

        <input
          type='tel'
          placeholder='Phone Number *'
          value={userData.phoneNumber}
          onChange={(e) => handleInputChange(e, 'phoneNumber')}
          required
        />

        <input
          type='text'
          placeholder='Doctor Name *'
          value={userData.doctorName}
          onChange={(e) => handleInputChange(e, 'doctorName')}
          required
        />
        
        <select
          id='select'
          value={userData.gender}
          onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
          required
        >
          <option name='select' hidden>Select Gender</option>
          <option name='male' value={'Male'}>Male</option>
          <option name='female' value={'female'}>Female</option>
          <option name='Transgender' value={'Transgender'}>Transgender</option>
        </select>

        <input
          type='date'
          id='select'
          placeholder='Date *'
          value={userData.date}
          onChange={(e) => handleInputChange(e, 'date')}
          required
        />

        <select
          className='status'
          id='select'
          value={userData.status}
          onChange={(e) => handleInputChange(e, 'status')}
          required
        >
          <option name='status' hidden>select status</option>
          <option name='Consult' value={'Consult'}>Consult</option>
          <option name='Revisit' value={'Revisit'}>Revisit</option>
        </select>

        <input
          type='number'
          placeholder='Age *'
          value={userData.age}
          onChange={(e) => handleInputChange(e, 'age')}
          required
        />
        
        <div className='time'>
          <select className='timer' value={selectedHour} onChange={(e) => handleTimeChange('hour', e.target.value)} required>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>

          <select className='timer' value={selectedMinute} onChange={(e) => handleTimeChange('minute', e.target.value)} required>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>

          <select className='timers' value={selectedPeriod} onChange={(e) => handleTimeChange('period', e.target.value)} required>
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        {props.editedAppointmentData ? (
          <div>
            <br />
          </div>
        ) : (
          <div>
            {/* Input box for Doctor Name when not editing */}
            <input
              type='text'
              placeholder='Image address *'
              value={userData.image}
              onChange={(e) => setUserData({ ...userData, image: e.target.value })}
            />
          </div>
        )}
        
        <button className='button' type='submit'>
          {props.editedAppointmentData ? 'Update Appointment' : 'Book Appointment'}
        </button>
      </form>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleBookAppointment: (appointment) => dispatch(bookAppointment(appointment)),
  handleUpdateAppointment: (appointment) => dispatch(updateAppointment(appointment)),
});

export default connect(null, mapDispatchToProps)(Appointment);
