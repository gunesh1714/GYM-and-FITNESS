import React from 'react'

import { Box,Typography } from '@mui/material';

import './Styles/exerciseVideos.css';

const ExerciseVideos = ({exerciseVideos,name}) => {
  return (
    <div>
      <div className="exerciseVideos-container">
      {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={item.video.thumbnails[0].url} alt={item.video.title} />
            <div className='exerciseVideos-title'>
            {item.video.title}
            </div>
            <div className='exerciseVideos-channel'>
            {item.video.channelName}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ExerciseVideos
