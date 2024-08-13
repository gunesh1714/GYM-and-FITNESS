import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './YoutubeVideo.css';

const YoutubeVideo = () => {
  const [videoId, setVideoId] = useState("https://www.youtube.com/watch?v=kAUVOHB3XYM");
  const [currentVideoId, setCurrentVideoId] = useState('');

  useEffect(() => {
    const id = extractVideoId(videoId);
    setCurrentVideoId(id);
  }, [videoId]);

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const handlePlayVideo = () => {
    const id = extractVideoId(videoId);
    setCurrentVideoId(id);
  };

  return (
    <div className="youtube-app">
      <div className="youtube-input-section">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter YouTube video URL or ID"
        />
        <button onClick={handlePlayVideo}>Play Video</button>
      </div>
      <div className="youtube-player-section">
        {currentVideoId && (
          <YouTube
            videoId={currentVideoId}
            opts={{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default YoutubeVideo;
