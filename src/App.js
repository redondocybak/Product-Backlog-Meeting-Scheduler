import './App.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaUser, FaCalendarAlt, FaUsers, FaTrash, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';

function App() {
  const [hosts, setHosts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [hostData, setHostData] = useState({ fullName: '', email: '' });
  const [meetingData, setMeetingData] = useState({ name: '', location: '', date: '' });
  const [participantData, setParticipantData] = useState({ fullName: '', email: '' });
  
  // New state variables for Sprint 2
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetingView, setMeetingView] = useState(false);
  const [meetingAssociations, setMeetingAssociations] = useState({});

  const createHost = (fullName, email) => {
    const host = { id: Date.now(), fullName, email };
    setHosts([...hosts, host]);
  };

  const createMeeting = (name, location, date) => {
    const meetingId = Date.now();
    const meeting = { id: meetingId, name, location, date: new Date(date) };
    setMeetings([...meetings, meeting]);
    
    // Initialize meeting associations
    setMeetingAssociations(prev => ({
      ...prev,
      [meetingId]: { hosts: [], participants: [] }
    }));
  };

  const createParticipant = (fullName, email) => {
    const participant = { id: Date.now(), fullName, email };
    setParticipants([...participants, participant]);
  };

  const deleteHost = (hostId) => {
    setHosts(hosts.filter(host => host.id !== hostId));
    
    // Remove host from all meeting associations
    const updatedAssociations = { ...meetingAssociations };
    Object.keys(updatedAssociations).forEach((meetingId) => {
      updatedAssociations[meetingId].hosts = updatedAssociations[meetingId].hosts.filter(
        id => id !== hostId
      );
    });
    setMeetingAssociations(updatedAssociations);
  };

  const deleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    
    // Remove meeting associations
    const updatedAssociations = { ...meetingAssociations };
    delete updatedAssociations[meetingId];
    setMeetingAssociations(updatedAssociations);
    
    // If the deleted meeting was selected, clear selection
    if (selectedMeeting && selectedMeeting.id === meetingId) {
      setSelectedMeeting(null);
      setMeetingView(false);
    }
  };

  const deleteParticipant = (participantId) => {
    setParticipants(participants.filter(participant => participant.id !== participantId));
    
    // Remove participant from all meeting associations
    const updatedAssociations = { ...meetingAssociations };
    Object.keys(updatedAssociations).forEach((meetingId) => {
      updatedAssociations[meetingId].participants = updatedAssociations[meetingId].participants.filter(
        id => id !== participantId
      );
    });
    setMeetingAssociations(updatedAssociations);
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

  // New function to view meeting details
  const viewMeetingDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setMeetingView(true);
  };

  // New function to go back to main view
  const goBackToMain = () => {
    setSelectedMeeting(null);
    setMeetingView(false);
  };

  // New function to toggle host association with selected meeting
  const toggleHostAssociation = (hostId) => {
    const meetingId = selectedMeeting.id;
    const updatedAssociations = { ...meetingAssociations };
    
    if (updatedAssociations[meetingId].hosts.includes(hostId)) {
      // Remove host from meeting
      updatedAssociations[meetingId].hosts = updatedAssociations[meetingId].hosts.filter(
        id => id !== hostId
      );
    } else {
      // Add host to meeting
      updatedAssociations[meetingId].hosts = [...updatedAssociations[meetingId].hosts, hostId];
    }
    
    setMeetingAssociations(updatedAssociations);
  };

  // New function to toggle participant association with selected meeting
  const toggleParticipantAssociation = (participantId) => {
    const meetingId = selectedMeeting.id;
    const updatedAssociations = { ...meetingAssociations };
    
    if (updatedAssociations[meetingId].participants.includes(participantId)) {
      // Remove participant from meeting
      updatedAssociations[meetingId].participants = updatedAssociations[meetingId].participants.filter(
        id => id !== participantId
      );
    } else {
      // Add participant to meeting
      updatedAssociations[meetingId].participants = [...updatedAssociations[meetingId].participants, participantId];
    }
    
    setMeetingAssociations(updatedAssociations);
  };

  // Function to check if a host is associated with a meeting
  const isHostAssociated = (hostId, meetingId) => {
    return meetingAssociations[meetingId]?.hosts.includes(hostId);
  };

  // Function to check if a participant is associated with a meeting
  const isParticipantAssociated = (participantId, meetingId) => {
    return meetingAssociations[meetingId]?.participants.includes(participantId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-title">
          <h1>Meeting Scheduler</h1>
          <p>Organize your meetings with ease</p>
        </div>
      </header>
      <main className="App-main">
        {!meetingView ? (
          <div className="content-container">
            {/* Host Form */}
            <form onSubmit={handleHostSubmit} className="form-card">
              <h2>Create Host</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={hostData.fullName}
                onChange={(e) => setHostData({ ...hostData, fullName: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={hostData.email}
                onChange={(e) => setHostData({ ...hostData, email: e.target.value })}
                required
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
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={meetingData.location}
                onChange={(e) => setMeetingData({ ...meetingData, location: e.target.value })}
                required
              />
              <DatePicker
                selected={meetingData.date ? new Date(meetingData.date) : null}
                onChange={(date) => setMeetingData({ ...meetingData, date: date })}
                placeholderText="Select Date"
                dateFormat="MM/dd/yyyy"
                className="date-picker-input"
                required
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
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={participantData.email}
                onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
                required
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
                    <div className="list-item-actions">
                      <button onClick={() => viewMeetingDetails(meeting)} className="view-btn">
                        <FaInfoCircle />
                      </button>
                      <button onClick={() => deleteMeeting(meeting.id)} className="delete-btn">
                        <FaTrash />
                      </button>
                    </div>
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
        ) : (
          /* Meeting Detail View */
          <div className="detail-view-container">
            <div className="detail-view-header">
              <button onClick={goBackToMain} className="back-btn">
                <FaArrowLeft /> Back to Meetings
              </button>
              <h2 className="detail-view-title">{selectedMeeting.name}</h2>
              <div className="detail-view-info">
                <div className="detail-view-location">{selectedMeeting.location}</div>
                <div className="detail-view-date">{selectedMeeting.date.toDateString()}</div>
              </div>
            </div>

            <div className="meeting-associations-container">
              {/* Meeting Hosts Section */}
              <div className="association-section">
                <h3>Meeting Hosts</h3>
                {hosts.length === 0 ? (
                  <p className="empty-message">No hosts available.</p>
                ) : (
                  <div className="association-list">
                    {hosts.map(host => (
                      <div key={host.id} className="association-item">
                        <div className="association-item-info">
                          <span className="association-item-name">{host.fullName}</span>
                          <span className="association-item-email">{host.email}</span>
                        </div>
                        <button
                          onClick={() => toggleHostAssociation(host.id)}
                          className={isHostAssociated(host.id, selectedMeeting.id) ? "associated-btn" : "associate-btn"}
                        >
                          {isHostAssociated(host.id, selectedMeeting.id) ? "Remove Host" : "Add Host"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meeting Participants Section */}
              <div className="association-section">
                <h3>Meeting Participants</h3>
                {participants.length === 0 ? (
                  <p className="empty-message">No participants available.</p>
                ) : (
                  <div className="association-list">
                    {participants.map(participant => (
                      <div key={participant.id} className="association-item">
                        <div className="association-item-info">
                          <span className="association-item-name">{participant.fullName}</span>
                          <span className="association-item-email">{participant.email}</span>
                        </div>
                        <button
                          onClick={() => toggleParticipantAssociation(participant.id)}
                          className={isParticipantAssociated(participant.id, selectedMeeting.id) ? "associated-btn" : "associate-btn"}
                        >
                          {isParticipantAssociated(participant.id, selectedMeeting.id) ? "Remove Participant" : "Add Participant"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            <div className="meeting-summary">
              <div className="summary-section">
                <h3>Selected Hosts</h3>
                {meetingAssociations[selectedMeeting.id]?.hosts.length === 0 ? (
                  <p className="empty-message">No hosts selected for this meeting.</p>
                ) : (
                  <div className="summary-list">
                    {meetingAssociations[selectedMeeting.id]?.hosts.map(hostId => {
                      const host = hosts.find(h => h.id === hostId);
                      return host ? (
                        <div key={host.id} className="summary-item">
                          <span className="summary-item-name">{host.fullName}</span>
                          <span className="summary-item-email">{host.email}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="summary-section">
                <h3>Selected Participants</h3>
                {meetingAssociations[selectedMeeting.id]?.participants.length === 0 ? (
                  <p className="empty-message">No participants selected for this meeting.</p>
                ) : (
                  <div className="summary-list">
                    {meetingAssociations[selectedMeeting.id]?.participants.map(participantId => {
                      const participant = participants.find(p => p.id === participantId);
                      return participant ? (
                        <div key={participant.id} className="summary-item">
                          <span className="summary-item-name">{participant.fullName}</span>
                          <span className="summary-item-email">{participant.email}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p>© 2025 Meeting Scheduler. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;