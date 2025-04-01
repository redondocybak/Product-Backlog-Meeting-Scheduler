import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Import icons from react-icons (you'll need to install it)
import { FaUser, FaCalendarAlt, FaUsers, FaTrash } from 'react-icons/fa';

function App() {
  const [hosts, setHosts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [hostData, setHostData] = useState({ fullName: '', email: '' });
  const [meetingData, setMeetingData] = useState({ name: '', location: '', date: '' });
  const [participantData, setParticipantData] = useState({ fullName: '', email: '' });

  const createHost = (fullName, email) => {
    const host = { id: Date.now(), fullName, email };
    setHosts([...hosts, host]);
  };

  const createMeeting = (name, location, date) => {
    const meeting = { id: Date.now(), name, location, date: new Date(date) };
    setMeetings([...meetings, meeting]);
  };

  const createParticipant = (fullName, email) => {
    const participant = { id: Date.now(), fullName, email };
    setParticipants([...participants, participant]);
  };

  const deleteHost = (hostId) => {
    setHosts(hosts.filter(host => host.id !== hostId));
  };

  const deleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
  };

  const deleteParticipant = (participantId) => {
    setParticipants(participants.filter(participant => participant.id !== participantId));
  };

  const handleHostSubmit = (e) => {
    e.preventDefault();
    createHost(hostData.fullName, hostData.email);
    setHostData({ fullName: '', email: '' });
  };

  const handleMeetingSubmit = (e) => {
    e.preventDefault();
    createMeeting(meetingData.name, meetingData.location, meetingData.date);
    setMeetingData({ name: '', location: '', date: '' });
  };

  const handleParticipantSubmit = (e) => {
    e.preventDefault();
    createParticipant(participantData.fullName, participantData.email);
    setParticipantData({ fullName: '', email: '' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-title">
          <h1>Meeting Manager</h1>
          <p>Organize your meetings with ease</p>
        </div>
      </header>
      <main className="App-main">
        <div className="content-container">
          {/* Host Form */}
          <form onSubmit={handleHostSubmit} className="form-card">
            <h2>Create Host</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={hostData.fullName}
              onChange={(e) => setHostData({ ...hostData, fullName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={hostData.email}
              onChange={(e) => setHostData({ ...hostData, email: e.target.value })}
            />
            <button type="submit">Add Host</button>
          </form>

          {/* Meeting Form */}
          <form onSubmit={handleMeetingSubmit} className="form-card">
            <h2>Create Meeting</h2>
            <input
              type="text"
              placeholder="Meeting Name"
              value={meetingData.name}
              onChange={(e) => setMeetingData({ ...meetingData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={meetingData.location}
              onChange={(e) => setMeetingData({ ...meetingData, location: e.target.value })}
            />
            <DatePicker
              selected={meetingData.date ? new Date(meetingData.date) : null}
              onChange={(date) => setMeetingData({ ...meetingData, date: date })}
              placeholderText="Select Date"
              dateFormat="MM/dd/yyyy"
              className="date-picker-input"
            />
            <button type="submit">Add Meeting</button>
          </form>

          {/* Participant Form */}
          <form onSubmit={handleParticipantSubmit} className="form-card">
            <h2>Create Participant</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={participantData.fullName}
              onChange={(e) => setParticipantData({ ...participantData, fullName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={participantData.email}
              onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
            />
            <button type="submit">Add Participant</button>
          </form>

          {/* Display Lists */}
          <div className="list-section">
            <h2 className="list-title">
              <FaUser className="list-icon" /> Hosts
            </h2>
            {hosts.length === 0 ? (
              <p className="empty-message">No hosts added yet.</p>
            ) : (
              hosts.map(host => (
                <div key={host.id} className="list-item">
                  <div className="list-item-content">
                    <div className="list-item-header">
                      <span className="list-item-name">{host.fullName}</span>
                    </div>
                    <div className="list-item-details">
                      <span className="list-item-email">{host.email}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteHost(host.id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="list-section">
            <h2 className="list-title">
              <FaCalendarAlt className="list-icon" /> Meetings
            </h2>
            {meetings.length === 0 ? (
              <p className="empty-message">No meetings scheduled yet.</p>
            ) : (
              meetings.map(meeting => (
                <div key={meeting.id} className="list-item">
                  <div className="list-item-content">
                    <div className="list-item-header">
                      <span className="list-item-name">{meeting.name}</span>
                    </div>
                    <div className="list-item-details">
                      <span className="list-item-location">{meeting.location}</span>
                      <span className="list-item-date">{meeting.date.toDateString()}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteMeeting(meeting.id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="list-section">
            <h2 className="list-title">
              <FaUsers className="list-icon" /> Participants
            </h2>
            {participants.length === 0 ? (
              <p className="empty-message">No participants added yet.</p>
            ) : (
              participants.map(participant => (
                <div key={participant.id} className="list-item">
                  <div className="list-item-content">
                    <div className="list-item-header">
                      <span className="list-item-name">{participant.fullName}</span>
                    </div>
                    <div className="list-item-details">
                      <span className="list-item-email">{participant.email}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteParticipant(participant.id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2025 Meeting Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;