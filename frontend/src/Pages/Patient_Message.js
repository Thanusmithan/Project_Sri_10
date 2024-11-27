// // User_messages.js----------------------Corrected---------------------------------------------------------
// import React, { useState, useEffect } from 'react'; // Import useEffect
// import './Css/Patient_Message.css';
// import Header from './Componets/Patientdashboard_Header';
// import Footer from './Componets/Footer';
// import Alert from 'react-bootstrap/Alert';
// import { FaPaperPlane, FaInbox, FaEdit, FaTrash, FaBullhorn } from "react-icons/fa";

// const PatientMessagingPage = () => {
//   const [sentMessages, setSentMessages] = useState([]);
//   const [receivedMessages, setReceivedMessages] = useState([
//     { id: 1, sender: "Admin", content: "Please arrive 15 minutes early for your appointment." }
//   ]);
//   const [announcements, setAnnouncements] = useState([
//     { id: 101, content: "Clinic closed on public holidays." }
//   ]);
//   const [recipient, setRecipient] = useState('');
//   const [messageContent, setMessageContent] = useState('');
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   // Auto dismiss alert after 2 seconds
//   useEffect(() => {
//     if (alert.show) {
//       const timer = setTimeout(() => {
//         handleCloseAlert();
//       }, 2000); // 2000 milliseconds = 2 seconds

//       return () => clearTimeout(timer); // Clear timeout if the component unmounts
//     }
//   }, [alert.show]);

//   // Handle sending or updating a message
//   const handleSendMessage = () => {
//     // Check if recipient or message content is empty
//     if (!recipient || !messageContent) {
//       setAlert({ show: true, message: 'Please enter both a recipient and a message.', type: 'danger' });
//       return;
//     }

//     if (editingMessage) {
//       const updatedMessages = sentMessages.map(msg =>
//         msg.id === editingMessage.id ? { ...msg, content: messageContent } : msg
//       );
//       setSentMessages(updatedMessages);
//       setEditingMessage(null);
//     } else {
//       const newMessage = { id: Date.now(), recipient, content: messageContent };
//       setSentMessages([...sentMessages, newMessage]);
//     }

//     setRecipient('');
//     setMessageContent('');
//     setAlert({ show: true, message: 'Message sent successfully!', type: 'success' });
//   };

//   // Handle editing an existing message
//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setRecipient(message.recipient);
//     setMessageContent(message.content);
//   };

//   // Handle deleting a message (either sent or received)
//   const handleDeleteMessage = (id, isSent) => {
//     if (isSent) {
//       setSentMessages(sentMessages.filter(msg => msg.id !== id));
//     } else {
//       setReceivedMessages(receivedMessages.filter(msg => msg.id !== id));
//     }
//   };

//   // Handle alert close
//   const handleCloseAlert = () => {
//     setAlert({ show: false, message: '', type: '' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 ">
//         <h2 className="text-center-center">Send a Message</h2>

//         {/* Alert for empty inputs */}
//         {/* {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             style={{ maxWidth: '500px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//             className='patient-service-alert'
//           ><i class="bi bi-x-circle-fill"></i>
//             <strong>{alert.message}</strong>
//           </Alert>
//         )} */}
//         {/* Alert for empty inputs */}
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             className="patient-message-alert d-flex justify-content-between align-items-center p-3"
//             style={{ maxWidth: '500px' }}
//           >
//             <i className="bi bi-x-circle-fill me-2"></i>
//             <strong className="flex-grow-1">{alert.message}</strong>
//           </Alert>
//         )}

//         {/* Messaging section */}
//         <div className="messaging-section p-4 rounded shadow">
//           <h4><FaPaperPlane className="me-2" />{editingMessage ? "Edit Message" : "Message the Admin"}</h4>
//           <input
//             type="text"
//             className="form-control mt-3"
//             placeholder="Enter Admin's name or Admin ID"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           />
//           <textarea
//             className="form-control mt-3"
//             value={messageContent}
//             onChange={(e) => setMessageContent(e.target.value)}
//             placeholder="Enter message here..."
//           ></textarea>
//           <button className="btn btn-success mt-3" onClick={handleSendMessage}>
//             <FaPaperPlane className="me-2" /> {editingMessage ? "Update Message" : "Send Message"}
//           </button>
//         </div>

//         {/* Sent Messages section */}
//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Messages</h4>
//           <ul className="list-group">
//             {sentMessages.map((msg) => (
//               <li key={msg.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <span>To: {msg.recipient} - {msg.content}</span>
//                 <div>
//                   <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                   <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id, true)} />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Received Messages section */}
//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Received Messages from Admin</h4>
//           <ul className="list-group">
//             {receivedMessages.map((msg) => (
//               <li key={msg.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <span>From: {msg.sender} - {msg.content}</span>
//                 <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id, false)} />
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Announcements section */}
//         <div className="announcements-section mt-5 p-4 rounded shadow">
//           <h4><FaBullhorn className="me-2" />Admin Announcements</h4>
//           <ul className="list-group">
//             {announcements.map((announcement) => (
//               <li key={announcement.id} className="list-group-item">
//                 {announcement.content}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PatientMessagingPage;



import React, { useState, useEffect } from 'react';
import './Css/Patient_Message.css';
import Header from './Componets/Patientdashboard_Header';
import Footer from './Componets/Footer';
import Alert from 'react-bootstrap/Alert';
import { FaPaperPlane, FaInbox, FaEdit, FaTrash, FaBullhorn } from "react-icons/fa";

const PatientMessagingPage = () => {
  const [sentMessages, setSentMessages] = useState([]); // Initialize as an array
  const [receivedMessages, setReceivedMessages] = useState([]); // Initialize as an array
  const [announcements, setAnnouncements] = useState([]); // Initialize as an array
  const [recipient, setRecipient] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch messages, announcements, and received messages on component load
  useEffect(() => {
    fetchSentMessages();
    fetchReceivedMessages();
    fetchAnnouncements();
  }, []);

  const fetchSentMessages = async () => {
    try {
      const response = await fetch('/api/messages/sent', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setSentMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching sent messages:', error);
      setSentMessages([]); // Set to empty array on error
    }
  };

  const fetchReceivedMessages = async () => {
    try {
      const response = await fetch('/api/messages/received', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setReceivedMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching received messages:', error);
      setReceivedMessages([]); // Set to empty array on error
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]); // Set to empty array on error
    }
  };

  const handleSendMessage = async () => {
    if (!recipient || !messageContent) {
      setAlert({ show: true, message: 'Please enter both a recipient and a message.', type: 'danger' });
      return;
    }

    try {
      if (editingMessage) {
        const response = await fetch(`/api/messages/${editingMessage.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: messageContent }),
        });
        if (response.ok) {
          setEditingMessage(null);
          setAlert({ show: true, message: 'Message updated successfully!', type: 'success' });
        } else {
          setAlert({ show: true, message: 'Error updating message.', type: 'danger' });
        }
      } else {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ recipient, content: messageContent }),
        });
        if (response.ok) {
          setAlert({ show: true, message: 'Message sent successfully!', type: 'success' });
        } else {
          setAlert({ show: true, message: 'Error sending message.', type: 'danger' });
        }
      }
      fetchSentMessages();
    } catch (error) {
      setAlert({ show: true, message: 'Error sending message.', type: 'danger' });
      console.error('Error sending message:', error);
    }

    setRecipient('');
    setMessageContent('');
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setRecipient(message.recipient);
    setMessageContent(message.content);
  };

  const handleDeleteMessage = async (id, isSent) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        if (isSent) {
          setSentMessages(sentMessages.filter(msg => msg.id !== id));
        } else {
          setReceivedMessages(receivedMessages.filter(msg => msg.id !== id));
        }
        setAlert({ show: true, message: 'Message deleted successfully!', type: 'success' });
      } else {
        setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center my-3">Send a Message</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={handleCloseAlert}
            dismissible
            className="patient-message-alert d-flex justify-content-between align-items-center p-3"
            style={{ maxWidth: '500px' }}
          >
            <i className="bi bi-x-circle-fill me-2"></i>
            <strong className="flex-grow-1">{alert.message}</strong>
          </Alert>
        )}

        <div className="messaging-section p-4 rounded shadow">
          <h4><FaPaperPlane className="me-2" />{editingMessage ? "Edit Message" : "Message the Admin"}</h4>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter Admin's name or Admin ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <textarea
            className="form-control mt-3"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter message here..."
          ></textarea>
          <button className="btn btn-success mt-3" onClick={handleSendMessage}>
            <FaPaperPlane className="me-2" /> {editingMessage ? "Update Message" : "Send Message"}
          </button>
        </div>

        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Sent Messages</h4>
          {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
            <ul className="list-group">
              {sentMessages.map((msg) => (
                <li key={msg.id || msg._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>To: {msg.recipient} - {msg.content}</span>
                  <div>
                    <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
                    <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, true)} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sent messages to display.</p>
          )}
        </div>

        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Received Messages from Admin</h4>
          {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
            <ul className="list-group">
              {receivedMessages.map((msg) => (
                <li key={msg.id || msg._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>From: {msg.sender} - {msg.content}</span>
                  <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, false)} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No received messages to display.</p>
          )}
        </div>

        <div className="announcements-section mt-5 p-4 rounded shadow">
          <h4><FaBullhorn className="me-2" />Admin Announcements</h4>
          {Array.isArray(announcements) && announcements.length > 0 ? (
            <ul className="list-group">
              {announcements.map((announcement) => (
                <li key={announcement.id || announcement._id} className="list-group-item">
                  {announcement.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No announcements to display.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientMessagingPage;
