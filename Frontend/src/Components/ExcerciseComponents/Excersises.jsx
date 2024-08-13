import React, { useState, useEffect } from 'react';
import { fetchData, exerciseOptions, youtubeOptions } from '../../Utils/fetchData.js';

import './Styles/excercises.css';

import ExcerciseCard from './ExcerciseCard.jsx';

const Exercises = ({input,title}) => {
    
  const [exercises, setExercises] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        let exerciseData;
        if (!input) {
          exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        } else {
          exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${input}`, exerciseOptions);
        }
        setExercises(Array.isArray(exerciseData) ? exerciseData : []);
        setError(null); 
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setError('Invalid body part selected. Please choose a valid body part.');
      }
    };

    const fetchVideos = async () => {
      try {
        const videoData = await fetchData('https://youtube-search-and-download.p.rapidapi.com/search', youtubeOptions);
        setVideos(videoData?.contents || []);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchExercises();
    fetchVideos();
  }, []);

  return (
    <div>
        <div>
       <h1 className='excercises-excerciseHolder-heading'>{title}</h1>
       <div className='excercises-excerciseHolder'>
        {exercises.slice(0, 6).map((exercise) => (
          <div key={exercise.id} className='excercises-excerciseCard-holder'>
            <ExcerciseCard
              title={exercise.name}
              bodyPart={exercise.bodyPart}
              gifUrl={exercise.gifUrl}
              target={exercise.target}
              exercise={exercise}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Exercises;











//   <li key={exercise.id}>
        //     <h2>{exercise.name}</h2>
        //     <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
        //     <p><strong>Equipment:</strong> {exercise.equipment}</p>
        //     <p><strong>Target:</strong> {exercise.target}</p>
        //     <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles.join(', ')}</p>
        //     <p><strong>Instructions:</strong></p>
        //     <ul>
        //       {exercise.instructions.map((instruction, index) => (
        //         <li key={index}> - {instruction}</li>
        //       ))}
        //     </ul>
        //     <img src={exercise.gifUrl} alt={exercise.name} />
        //   </li>
