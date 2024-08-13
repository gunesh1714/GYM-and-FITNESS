import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/AddTrainerForm.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AddTrainerForm = () => {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create trainer object without id
    const trainer = {
      name,
      email,
      password,
      number,
      rating: parseInt(rating),  // Convert rating to an integer
    };

    try {
      const response = await fetch('http://localhost:8080/api/trainers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainer),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      MySwal.fire({
        title: "Trainer created successfully !!",
        text: "Let's see him in the training",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/admin');
    } catch (error) {
      console.error('There was an error adding the trainer!', error);
    }
  };

  return (
    <div className='addForm-container'>
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Trainer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Trainer
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddTrainerForm;
