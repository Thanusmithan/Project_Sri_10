//Componets/CommonAppointmentForm.js
import React, { useState, useEffect } from 'react';
import '../Css/PatientAppointment.css';
import { Alert } from 'react-bootstrap';

const CommonAppointmentForm = ({ formData, setFormData, onSubmit, isAdmin }) => {
  const [services, setServices] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [buttonState, setButtonState] = useState('idle');

  useEffect(() => {
    fetch('/api/services')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    const selectedDoctor = services.find(
      (service) => service.serviceName === selectedService
    )?.doctorName || '';
    setFormData({
      ...formData,
      service: selectedService,
      doctor: selectedDoctor,
    });
  };

  const validateForm = () => {
    const fields = ['patientName', 'age', 'gender', 'date', 'time', 'service', 'doctor'];
    for (let field of fields) {
      if (!formData[field]) {
        setAlert({ show: true, message: `Please fill in the ${field}` });
        return false;
      }
    }
    setAlert({ show: false, message: '' });
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to book appointment.');
      }

      onSubmit();
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    } catch (error) {
      setAlert({ show: true, message: error.message });
    }
  };

  return (
    <form className="appointment-form">
      <div className="row g-3">
        {alert.show && (
          <div className="col-md-12">
            <Alert variant="danger" onClose={() => setAlert({ show: false, message: '' })} dismissible>
              {alert.message}
            </Alert>
          </div>
        )}

        {/* Form Fields */}
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-control"
              placeholder="Enter your name"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="service">Service:</label>
            <select
              id="service"
              name="service"
              className="form-select"
              value={formData.service}
              onChange={handleServiceChange}
            >
              <option value="" disabled>Select a service</option>
              {services.map((service, index) => (
                <option key={index} value={service.serviceName}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="doctor">Doctor:</label>
            <input
              id="doctor"
              name="doctor"
              placeholder="Select a Doctor"
              className="form-control"
              value={formData.doctor}
              readOnly
            />
          </div>
        </div>
        {!isAdmin ? (
          <div className="col-12 text-center">
            <button
              type="button"
              className={`btn btn-success ${buttonState === 'success' ? 'animate-success' : ''}`}
              onClick={handleSubmit}
            >
              {buttonState === 'success' ? '✔ Appointment Booked' : 'Book Appointment'}
            </button>
          </div>
        ) : (
          <div className="col-12 text-center">
            <button type="button" className="btn btn-info" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommonAppointmentForm;


