import React, { useState, useEffect } from 'react';
import './TrainerPage.css';
import { FaTrashAlt, FaGoogle, FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TrainerPage = () => {
  const MySwal = withReactContent(Swal);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/meetings'); // Update with your actual endpoint
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        setError('Failed to fetch meetings');
      }
    };

    fetchMeetings();
  }, []);


  const handleDeleteMeeting = async (meetingId) => {

    try {
      const response = await fetch(`http://localhost:8080/api/meetings/${meetingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
        MySwal.fire({
          title: 'Success',
          text: 'Meeting deleted successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error('Failed to delete meeting');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="trainer-page">
      <h1><strong>Trainer Dashboard</strong></h1>
      {error && <div className="error">{error}</div>}
      <div className="meetings-container">
        {meetings.length === 0 ? (
          <p>No meetings available.</p>
        ) : (
          meetings.map(meeting => (
            <div className="meeting-card" key={meeting.id}>
              <div className="meeting-info">
                <h2>{meeting.title}</h2>
                <p><strong>User:</strong> {meeting.fullName}</p>
                <p><strong>Date:</strong> {meeting.date}</p>
                <p><strong>Time:</strong> {meeting.time}</p>
                <p><strong>Reason:</strong> {meeting.reason}</p>
                <p><strong>Contact:</strong> {meeting.email}</p>
              </div>
              <div className="meeting-actions">
                <a href={`https://meet.google.com/?authuser=${meeting.userEmail}`} target="_blank" rel="noopener noreferrer">
                  <FaGoogle size={24} className="contact-icon google-icon" />
                </a>
                <a href={`tel:${meeting.userPhone}`}>
                  <FaPhone size={24} className="contact-icon phone-icon" />
                </a>
                <button onClick={() => handleDeleteMeeting(meeting.meetingId)} className="delete-button">
                  <FaTrashAlt size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TrainerPage;
