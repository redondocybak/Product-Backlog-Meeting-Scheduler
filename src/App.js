import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // State for hosts, meetings, and participants
  const [hosts, setHosts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [hostData, setHostData] = useState({ fullName: '', email: '' });
  const [meetingData, setMeetingData] = useState({ name: '', location: '', date: '' });
  const [participantData, setParticipantData] = useState({ fullName: '', email: '' });

  // Create operations
  const createHost = (fullName, email) => {
    const host = {
      id: Date.now(),
      fullName: fullName,
      email: email
    };
    setHosts([...hosts, host]); // Update state with new host
  };

  const createMeeting = (name, location, date) => {
    const meeting = {
      id: Date.now(),
      name: name,
      location: location,
      date: new Date(date)
    };
    setMeetings([...meetings, meeting]); // Update state with new meeting
  };

  const createParticipant = (fullName, email) => {
    const participant = {
      id: Date.now(),
      fullName: fullName,
      email: email
    };
    setParticipants([...participants, participant]); // Update state with new participant
  };

  // Delete operations
  const deleteHost = (hostId) => {
    setHosts(hosts.filter(host => host.id !== hostId)); // Update state by filtering out the host
  };

  const deleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId)); // Update state by filtering out the meeting
  };

  const deleteParticipant = (participantId) => {
    setParticipants(participants.filter(participant => participant.id !== participantId)); // Update state by filtering out the participant
  };

  // Handle form submissions
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
        
        <div className="content-container">
          {/* Host Form */}
          <form onSubmit={handleHostSubmit}>
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
          <form onSubmit={handleMeetingSubmit}>
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
            <input
              type="date"
              value={meetingData.date}
              onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
            />
            <button type="submit">Add Meeting</button>
          </form>

          {/* Participant Form */}
          <form onSubmit={handleParticipantSubmit}>
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
            <h2>Hosts</h2>
            {hosts.map(host => (
              <div key={host.id} className="list-item">
                <span>{host.fullName} ({host.email})</span>
                <button onClick={() => deleteHost(host.id)}>Delete</button>
              </div>
            ))}
          </div>

          <div className="list-section">
            <h2>Meetings</h2>
            {meetings.map(meeting => (
              <div key={meeting.id} className="list-item">
                <span>{meeting.name} - {meeting.location} - {meeting.date.toDateString()}</span>
                <button onClick={() => deleteMeeting(meeting.id)}>Delete</button>
              </div>
            ))}
          </div>

          <div className="list-section">
            <h2>Participants</h2>
            {participants.map(participant => (
              <div key={participant.id} className="list-item">
                <span>{participant.fullName} ({participant.email})</span>
                <button onClick={() => deleteParticipant(participant.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;