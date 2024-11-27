// // AdminReviewsPage.js-----------------------------------Correcred------------------------------------------
// import React, { useState } from 'react';
// import Header from './Componets/Admin_Header';
// import Footer from './Componets/Footer';
// import './Css/Admin_Reviews.css'; // Custom CSS file
// import Alert from 'react-bootstrap/Alert';
// import RatingStars from './Componets/RatingStars';
// import { FaTrash, FaReply, FaThumbsUp } from 'react-icons/fa';

// const AdminReviewsPage = () => {
//   const [reviews, setReviews] = useState([
//     { id: 1, rating: 5, feedback: 'Great service!', response: '', likes: 0, comments: [] },
//     { id: 2, rating: 4, feedback: 'Very helpful staff.', response: '', likes: 0, comments: [] },
//   ]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });
//   const [response, setResponse] = useState('');
//   const [comment, setComment] = useState('');

//   const handleDeleteReview = (id) => {
//     setReviews(reviews.filter(review => review.id !== id));
//     setAlert({ show: true, message: 'Review deleted successfully!', type: 'success' });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };

//   const handleRespond = (id) => {
//     const updatedReviews = reviews.map(review =>
//       review.id === id ? { ...review, response } : review
//     );
//     setReviews(updatedReviews);
//     setResponse('');
//     setAlert({ show: true, message: 'Response submitted successfully!', type: 'success' });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };

//   const handleLikeReview = (id) => {
//     const updatedReviews = reviews.map(review =>
//       review.id === id ? { ...review, likes: review.likes + 1 } : review
//     );
//     setReviews(updatedReviews);
//     setAlert({ show: true, message: 'You liked the review!', type: 'success' });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };

//   const handleCommentSubmit = (id) => {
//     if (!comment) return;
//     const updatedReviews = reviews.map(review =>
//       review.id === id ? { ...review, comments: [...review.comments, comment] } : review
//     );
//     setReviews(updatedReviews);
//     setComment('');
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 review-container">
//         <h2 className="text-center my-3">Ratings and Reviews</h2>

//         {/* Alert for submission feedback */}
//         {alert.show && (
//           <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible className='admin-review-alert'>
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}

//         <div className="reviews-list mt-4">
//           <h4>Patient Reviews</h4>
//           <ul className="list-group">
//             {reviews.map(review => (
//               <li key={review.id} className="list-group-item d-flex justify-content-between align-items-start">
//                 <div className="flex-grow-1">
//                   <strong>Rating: <RatingStars rating={review.rating} /></strong>
//                   <p>{review.feedback}</p>
//                   {review.response && <p className="text-success"><strong>Response:</strong> {review.response}</p>}

//                   <div className="d-flex align-items-center mt-2">
//                     <button
//                       className="btn btn-primary me-2"
//                       onClick={() => handleLikeReview(review.id)}
//                     >
//                       <FaThumbsUp className="me-1" /> Like ({review.likes})
//                     </button>
//                   </div>
//                 </div>
//                 <button className="btn btn-danger" onClick={() => handleDeleteReview(review.id)}>
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminReviewsPage;





import React, { useState, useEffect } from 'react';
import Header from './Componets/Admin_Header';
import Footer from './Componets/Footer';
import './Css/Admin_Reviews.css'; // Custom CSS file
import Alert from 'react-bootstrap/Alert';
import RatingStars from './Componets/RatingStars';
import { FaTrash, FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [response, setResponse] = useState('');
  const [comment, setComment] = useState('');

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
          },
        });
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
        setAlert({ show: true, message: 'Failed to fetch reviews', type: 'danger' });
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
        },
      });
      setReviews(reviews.filter(review => review._id !== id));
      setAlert({ show: true, message: 'Review deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting review:', error.message);
      setAlert({ show: true, message: 'Failed to delete review', type: 'danger' });
    }
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  const handleRespond = async (id) => {
    try {
      await axios.patch(
        `/api/reviews/${id}/respond`,
        { response },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedReviews = reviews.map(review =>
        review._id === id ? { ...review, response } : review
      );
      setReviews(updatedReviews);
      setResponse('');
      setAlert({ show: true, message: 'Response submitted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error responding to review:', error.message);
      setAlert({ show: true, message: 'Failed to submit response', type: 'danger' });
    }
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  const handleLikeReview = async (id) => {
    try {
      await axios.patch(
        `/api/reviews/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedReviews = reviews.map(review =>
        review._id === id ? { ...review, likes: review.likes + 1 } : review
      );
      setReviews(updatedReviews);
      setAlert({ show: true, message: 'You liked the review!', type: 'success' });
    } catch (error) {
      console.error('Error liking review:', error.message);
      setAlert({ show: true, message: 'Failed to like review', type: 'danger' });
    }
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  const handleCommentSubmit = async (id) => {
    if (!comment) return;
    try {
      await axios.patch(
        `/api/reviews/${id}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedReviews = reviews.map(review =>
        review._id === id ? { ...review, comments: [...review.comments, comment] } : review
      );
      setReviews(updatedReviews);
      setComment('');
      setAlert({ show: true, message: 'Comment added successfully!', type: 'success' });
    } catch (error) {
      console.error('Error adding comment:', error.message);
      setAlert({ show: true, message: 'Failed to add comment', type: 'danger' });
    }
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  return (
    <>
      <Header />
      <div className="container my-5 review-container">
        <h2 className="text-center my-3">Ratings and Reviews</h2>

        {/* Alert for submission feedback */}
        {alert.show && (
          <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible className='admin-review-alert'>
            <strong>{alert.message}</strong>
          </Alert>
        )}

        <div className="reviews-list mt-4">
          <h4>Patient Reviews</h4>
          <ul className="list-group">
            {reviews.map(review => (
              <li key={review._id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <strong>Rating: <RatingStars rating={review.rating} /></strong>
                  <p>{review.feedback}</p>
                  {review.response && <p className="text-success"><strong>Response:</strong> {review.response}</p>}
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleLikeReview(review._id)}
                    >
                      <FaThumbsUp className="me-1" /> Like ({review.likes})
                    </button>
                  </div>
                  {/* Add Response Input */}
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Add response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="form-control mb-2"
                    />
                    <button className="btn btn-secondary" onClick={() => handleRespond(review._id)}>
                      Respond
                    </button>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => handleDeleteReview(review._id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminReviewsPage;
