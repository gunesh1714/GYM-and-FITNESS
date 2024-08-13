import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import exerciseDetailsHeroBanner from '../../Assets/exerciseDetailsHeroBanner.png';
import logo from '../../Assets/logo.png';

import { fetchData, exerciseOptions, youtubeOptions } from '../../Utils/fetchData';
import ExcerciseCard from './ExcerciseCard';
import ExerciseVideos from './ExerciseVideos.jsx';
import PomodoroTimer from '../Timer/PomodoroTimer.jsx';
import YoutubeVideo from '../Youtube/YoutubeVideo.jsx';
import Footer from '../Footer.jsx';

import './Styles/excerciseDetails.css';

const ExcerciseDetails = () => {
    const [similar, setSimilar] = useState([]);
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { exercise } = location.state || {};

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, []);

    useEffect(() => {
        if (!exercise) return; 

        const fetchSimilarExercises = async () => {
            try {
                const exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exercise.bodyPart}`, exerciseOptions);
                setSimilar(Array.isArray(exerciseData) ? exerciseData : []);
            } catch (error) {
                console.error('Error fetching similar exercises:', error);
            }
        };

        const fetchExerciseVideos = async () => {
            try {
                const exerciseVideosData = await fetchData(`https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise.name} exercise`, youtubeOptions);
                setExerciseVideos(exerciseVideosData.contents);
            } catch (error) {
                console.error('Error fetching exercise videos:', error);
            }
        };

        fetchSimilarExercises();
        fetchExerciseVideos();
    }, [exercise]);
    if (!exercise) {
        return <div>No exercise details available</div>;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleClick = (newExercise) => {
      navigate('/excerciseDetails', { state: { exercise: newExercise } });
    };


    return (
        <div className='exerciseDetail-container'>
            <div className='exerciseDetail-logo-container'>
                <img src={logo} alt="" className='exerciseDetail-logo' />
                <div className='exerciseDetail-logo-text'>DynamicFit</div>
            </div>
            <div className='exerciseDetail-top'>
                <div className='exerciseDetail-quote-container'>
                    <div className='exerciseDetail-quote'>
                        Push yourself,<br /> <div className='exerciseDetail-quote-color'>because no one else is</div>
                        going to do it for you.
                    </div>
                    <div className='exerciseDetail-quote-below'>
                        View the workout detail below :
                    </div>
                    <div className='exerciseDetail-quote-below-bar'></div>
                </div>
                <div>
                    <img src={exerciseDetailsHeroBanner} alt="" />
                </div>
            </div>
            <div className='exerciseDetail-exercise-container'>
                <img src={exercise.gifUrl} alt="" className='exerciseDetail-exercise-gif' />
                <div className="exerciseDetail-exercise-content">
                    <p><strong>Name :</strong> {capitalizeFirstLetter(exercise.name)}</p>
                    <p><strong>Body Part :</strong> {capitalizeFirstLetter(exercise.bodyPart)}</p>
                    <p><strong>Equipment :</strong> {capitalizeFirstLetter(exercise.equipment)}</p>
                    <p><strong>Target :</strong> {capitalizeFirstLetter(exercise.target)}</p>
                    <p><strong>Secondary Muscles :</strong> {capitalizeFirstLetter(exercise.secondaryMuscles.join(', '))}</p>
                    <h2><strong>Instructions :</strong></h2>
                    <ol>
                        {exercise.instructions.map((instruction, index) => (
                            <li key={index}> - {instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className='exerciseDetail-timer-container'>
            <PomodoroTimer/>
            <YoutubeVideo/>
            </div>

            <div className='exerciseDetail-video-container'>
                <div className='exerciseDetail-similar-heading'>
                    Guidance videos :
                </div>
                <ExerciseVideos exerciseVideos={exerciseVideos} name={exercise.name} />
            </div>

            <div className='exerciseDetail-similar-heading'>
                Similar exercises :
            </div>
            <div className='excercises-excerciseHolder'>
                {similar.slice(0, 6).map((exercise) => (
                    <div key={exercise.id} className='excercises-excerciseCard-holder' onClick={()=>handleClick(exercise)}>
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
            <div className='exerciseDetail-footer'>
            <Footer/>
            </div>
        </div>
    );
};

export default ExcerciseDetails;
