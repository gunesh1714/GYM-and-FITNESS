import React, { useState } from 'react';
import '../Styles/ReviewComponent.css';

const ReviewComponent = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review && rating) {
      setSubmitted(true);
    } else {
      alert('Please fill in both review and rating.');
    }
  };

  return (
    <div className="review-container">
        <div>
            
        </div>
      {submitted ? (
        <div className="thank-you">
          <h2>Thank you for your review!</h2>
          <p>Your rating: {rating}/5</p>
          <p>{review}</p>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <h2>Share Your Experience</h2>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            className="review-input"
          ></textarea>
          <select value={rating} onChange={handleRatingChange} className="rating-input">
            <option value="0">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewComponent;
