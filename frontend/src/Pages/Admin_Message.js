// // Admin_Message.js-------------------Corrected-----------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './Css/Message.css';
// import Header from './Componets/Admin_Header';
// import Footer from './Componets/Footer';
// import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
// import Alert from 'react-bootstrap/Alert'; // Import Alert from react-bootstrap

// const AdminMessagingPage = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [sentMessages, setSentMessages] = useState([]);
//   const [receivedMessages, setReceivedMessages] = useState([
//     { id: 1, sender: "Patient123", content: "Can I schedule an appointment?" }
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
//       }, 2000);

//       return () => clearTimeout(timer); // Clear timeout if the component unmounts
//     }
//   }, [alert.show]);

//   const handlePostAnnouncement = () => {
//     if (!announcement) {
//       setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
//       return;
//     }
    
//     setAnnouncement('');
//     setAlert({ show: true, message: 'Announcement posted successfully!', type: 'success' });
//   };

//   const handleSendMessage = () => {
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
//       setAlert({ show: true, message: 'Message updated successfully!', type: 'success' });
//     } else {
//       const newMessage = { id: Date.now(), recipient, content: messageContent };
//       setSentMessages([...sentMessages, newMessage]);
//       setAlert({ show: true, message: 'Message sent successfully!', type: 'success' });
//     }

//     setRecipient('');
//     setMessageContent('');
//   };

//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setRecipient(message.recipient);
//     setMessageContent(message.content);
//   };

//   const handleDeleteMessage = (id, isSent) => {
//     if (isSent) {
//       setSentMessages(sentMessages.filter(msg => msg.id !== id));
//     } else {
//       setReceivedMessages(receivedMessages.filter(msg => msg.id !== id));
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ show: false, message: '', type: '' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 admin-message-container">
//         <h2 className="text-center my-3">Admin Messaging & Announcements</h2>

//         {/* Alert for actions */}
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             className='admin-message-alert'
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}

//         <div className="announcement-section mt-4 p-4 rounded shadow">
//           <h4><FaBullhorn className="me-2" />Post Announcement</h4>
//           <textarea
//             className="form-control mt-3"
//             value={announcement}
//             onChange={(e) => setAnnouncement(e.target.value)}
//             placeholder="Enter announcement here..."
//           ></textarea>
//           <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>Post Announcement</button>
//         </div>

//         <div className="messaging-section mt-5 p-4 rounded shadow">
//           <h4><FaPaperPlane className="me-2" />{editingMessage ? "Edit Message" : "Message Patients"}</h4>
//           <input
//             type="text"
//             className="form-control mt-3"
//             placeholder="Enter patient's username"
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

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Messages</h4>
//           <ul className="list-group">
//             {sentMessages.map((msg) => (
//               <li key={msg.id} className="message-list-group-item d-flex justify-content-between align-items-center">
//                 <span>To: {msg.recipient} - {msg.content}</span>
//                 <div>
//                   <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                   <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id, true)} />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
//           <ul className="list-group">
//             {receivedMessages.map((msg) => (
//               <li key={msg.id} className="message-list-group-item d-flex justify-content-between align-items-center">
//                 <span>From: {msg.sender} - {msg.content}</span>
//                 <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id, false)} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminMessagingPage;



import React, { useState, useEffect } from 'react';
import './Css/Message.css';
import Header from './Componets/Admin_Header';
import Footer from './Componets/Footer';
import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';

const AdminMessagingPage = () => {
  const [announcement, setAnnouncement] = useState('');
  const [sentMessages, setSentMessages] = useState([]); // Initialize as an array
  const [receivedMessages, setReceivedMessages] = useState([]); // Initialize as an array
  const [users, setUsers] = useState([]); // List of users for the dropdown
  const [recipient, setRecipient] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch sent and received messages and user list on component load
  useEffect(() => {
    fetchMessages();
    fetchReceivedMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages/sent'); // Replace with your backend route
      const data = await response.json();
      setSentMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching sent messages:', error);
    }
  };

  const fetchReceivedMessages = async () => {
    try {
      const response = await fetch('/api/messages/received'); // Replace with your backend route
      const data = await response.json();
      setReceivedMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching received messages:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      // Exclude admin-related names
      const filteredUsers = data.filter((user) => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePostAnnouncement = async () => {
    if (!announcement) {
      setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
      return;
    }

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
        },
        body: JSON.stringify({
          title: 'General Announcement', // Provide a default title or input from the user
          content: announcement,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({
          show: true,
          message: errorData.error || 'Error creating announcement.',
          type: 'danger',
        });
        return;
      }

      setAnnouncement('');
      setAlert({ show: true, message: 'Announcement posted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error posting announcement:', error.message);
      setAlert({ show: true, message: 'Error creating announcement.', type: 'danger' });
    }
  };

  const handleSendMessage = async () => {
    if (!recipient || !messageContent) {
      setAlert({ show: true, message: 'Please select a recipient and enter a message.', type: 'danger' });
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
      fetchMessages();
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
          setSentMessages(sentMessages.filter((msg) => msg.id !== id));
        } else {
          setReceivedMessages(receivedMessages.filter((msg) => msg.id !== id));
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
      <div className="container my-5 admin-message-container">
        <h2 className="text-center my-3">Admin Messaging & Announcements</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={handleCloseAlert}
            dismissible
            className="admin-message-alert"
          >
            <strong>{alert.message}</strong>
          </Alert>
        )}

        <div className="announcement-section mt-4 p-4 rounded shadow">
          <h4><FaBullhorn className="me-2" />Post Announcement</h4>
          <textarea
            className="form-control mt-3"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter announcement here..."
          ></textarea>
          <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>
            Post Announcement
          </button>
        </div>

        {/* Sent message section */}
        <div className="messaging-section mt-5 p-4 rounded shadow">
          <h4><FaPaperPlane className="me-2" />{editingMessage ? 'Edit Message' : 'Message Patients'}</h4>
          <select
            className="form-control mt-3"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Select a patient</option>
            {users.map((user) => (
              <option key={user.id || user._id} value={user.id || user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          <textarea
            className="form-control mt-3"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter message here..."
          ></textarea>
          <button className="btn btn-success mt-3" onClick={handleSendMessage}>
            <FaPaperPlane className="me-2" /> {editingMessage ? 'Update Message' : 'Send Message'}
          </button>
        </div>

        {/* Display sections for sent and received messages */}
        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Sent Messages</h4>
          {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
            <ul className="list-group">
              {sentMessages.map((msg) => (
                <li
                  key={msg.id || msg._id}
                  className="message-list-group-item d-flex justify-content-between align-items-center"
                >
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
          <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
          {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
            <ul className="list-group">
              {receivedMessages.map((msg) => (
                <li
                  key={msg.id || msg._id}
                  className="message-list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>From: {msg.sender} - {msg.content}</span>
                  <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, false)} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No received messages to display.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminMessagingPage;
