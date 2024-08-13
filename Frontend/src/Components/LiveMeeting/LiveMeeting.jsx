import React, { useState } from 'react';
import './LiveMeeting.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const LiveMeeting = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const MySwal = withReactContent(Swal);

  const handleSchedule = async () => {
    const meeting = {
      fullName,
      email,
      reason,
      date,
      time,
    };

    try {
      const response = await fetch('http://localhost:8080/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meeting),
      });

      if (response.ok) {
        console.log('Meeting Scheduled:', meeting);
        MySwal.fire({
          title: "Meeting scheduled Successfully.",
          text: "You'll receive mail from the trainer.",
          icon: 'success',
          confirmButtonText: 'OK'
      });
        // Optionally reset the form
        setFullName('');
        setEmail('');
        setReason('');
        setDate('');
        setTime('');
      } else {
        console.error('Failed to schedule meeting');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="back-clr flex flex-col items-center p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Details for the trainer :</h2>
      <div className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Enter your name :
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Enter your email :
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
            Enter the reason for meeting :
          </label>
          <input
            id="reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the reason"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSchedule}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMeeting;
