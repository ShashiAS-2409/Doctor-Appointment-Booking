import React, { useState } from 'react';
import logo from './logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Details({ appointments, handleDelete, handleEdit }) {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleEditClick = (index) => {
    handleEdit(index);
  };

  const handleDeleteClick = (index) => {
    handleDelete(index);
  };

  return (
    <>
      <div className="container">
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '420px' }}>Patient</th>
              <th style={{ width: '180px' }}>Status</th>
              <th style={{ width: '180px' }}>Appointment</th>
              <th style={{ width: '180px' }}>Phone</th>
              <th style={{ width: '180px' }}>Doctor</th>
              <th style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
        </table>

        <table className="tbody">
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td style={{ width: '420px' }}>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img src={appointment.image || logo} alt='' style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid black', margin: '10px 30px' }} />
                    </div>
                    <h5>
                      {appointment.patientName}<br />
                      <small>{appointment.age} years</small>
                    </h5>
                  </div>
                </td>
                <th style={{ width: '180px' }}>
                  <span
                    id='status'
                    style={{
                      padding: '5px 10px',
                      color: 'white',
                      borderRadius: '5px',
                      border: appointment.status === 'Consult' ? '1px solid green' : '1px solid blue',
                      backgroundColor: appointment.status === 'Consult' ? 'green' : 'blue',
                    }}
                  >
                    {appointment.status}
                  </span>
                </th>
                <th style={{ width: '180px', height: '30px' }}>
                  <h5 className="mb-0">{appointment.time}<br /><small>{appointment.date}</small></h5>
                </th>
                <th style={{ width: '180px' }}>
                  <h5 className="mb-0">{appointment.phoneNumber}</h5>
                </th>
                <th style={{ width: '180px' }}>
                  <h5 className="mb-0">Dr.{appointment.doctorName}</h5>
                </th>
                <th style={{ width: '100px' }}>
                  <div style={{ textAlign: 'center' }}>
                    {isDropdownOpen ? (
                      <div className="" aria-labelledby="dropdownMenuButton">
                        <button
                          style={{ display: 'block', width: '70px', height: '30px', margin: '10px 5px', backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', fontWeight: 'bold' }}
                          onClick={() => {
                            handleEditClick(index);
                            setDropdownOpen(false);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={{ display: 'block', width: '70px', height: '30px', margin: '10px 5px', backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', fontWeight: 'bold' }}
                          onClick={() => {
                            handleDeleteClick(index);
                            setDropdownOpen(false);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div
                        className="vertical-dots"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Details;
