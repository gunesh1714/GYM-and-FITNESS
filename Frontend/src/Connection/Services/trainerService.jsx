// src/services/trainerService.js
import axiosInstance from '../axiosInstance';

export const getAllTrainers = async () => {
  try {
    const response = await axiosInstance.get('/trainers');
    return response.data;
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};

export const getTrainerById = async (id) => {
  try {
    const response = await axiosInstance.get(`/trainers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trainer with ID ${id}:`, error);
    throw error;
  }
};
