import { useState, useEffect } from "react";
import React from 'react';

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "",
          age: "",
          address: "",
          gender: "",
          mobile: "",
          email: "",
          height: "",
          weight: "",
          injury: "",
          healthIssue: "",
          currentTablet: "",
          previousTablets: "", // Only keep valid fields
        };
  });

  const [isProfileCreated, setIsProfileCreated] = useState(() => {
    return localStorage.getItem("isProfileCreated") === "true";
  });

  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("userReminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const [reminder, setReminder] = useState({
    medicine: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("isProfileCreated", isProfileCreated);
    localStorage.setItem("userReminders", JSON.stringify(reminders));
  }, [profile, isProfileCreated, reminders]);

  const handleCreateProfile = (e) => {
    e.preventDefault();
    setIsProfileCreated(true);
  };

  const handleEditProfile = () => {
    setIsProfileCreated(false);
  };

  const handleSetReminder = (e) => {
    e.preventDefault();
    setReminders([...reminders, reminder]);
    setReminder({ medicine: "", date: "", time: "" });
  };

  const detailStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f0f0f0",
  };

  const outerContainerStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!isProfileCreated ? (
        <div
          style={{
            width: "50%",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Create Profile</h2>
          <form onSubmit={handleCreateProfile} style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
            <label>Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />

            <label>Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />

            <label>Age</label>
            <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} required />

            <label>Address</label>
            <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} required />

            <label>Gender</label>
            <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label>Height (cm)</label>
            <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} required />

            <label>Weight (kg)</label>
            <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} required />

            <label>Any Physical Injury</label>
            <input type="text" value={profile.injury} onChange={(e) => setProfile({ ...profile, injury: e.target.value })} />

            <label>Health Issues</label>
            <input type="text" value={profile.healthIssue} onChange={(e) => setProfile({ ...profile, healthIssue: e.target.value })} />

            <label>Previous Tablets</label>
            <input type="text" value={profile.previousTablets} onChange={(e) => setProfile({ ...profile, previousTablets: e.target.value })} />

            <label>Current Tablet</label>
            <input type="text" value={profile.currentTablet} onChange={(e) => setProfile({ ...profile, currentTablet: e.target.value })} />

            <label>Mobile Number</label>
            <input type="tel" value={profile.mobile} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} required />

            <button type="submit" style={{ backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px" }}>Create My Profile</button>
          </form>
        </div>
      ) : (
        <div style={outerContainerStyle}>
          <div style={{ width: "50%", padding: "20px", textAlign: "left", border: "2px solid black", borderRadius: "10px" }}>
            <h2>Profile Details</h2>
            {Object.keys(profile)
  .filter((key) => key !== "tabletsBefore") // Exclude tabletsBefore
  .map((key, index) => (
    <div key={index} style={detailStyle}>
      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {profile[key]}
    </div>
  ))}

            <button onClick={handleEditProfile} style={{ backgroundColor: "orange", color: "white", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>
              Edit Profile
            </button>

           

          {/* Reminder Section */}
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
              <h3>Set Medicine Reminder</h3>
              <form onSubmit={handleSetReminder} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>Medicine Name</label>
                <input type="text" value={reminder.medicine} onChange={(e) => setReminder({ ...reminder, medicine: e.target.value })} required />
                <label>Date</label>
                <input type="date" value={reminder.date} onChange={(e) => setReminder({ ...reminder, date: e.target.value })} required />
                <label>Time</label>
                <input type="time" value={reminder.time} onChange={(e) => setReminder({ ...reminder, time: e.target.value })} required />
                <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "5px" }}>Set Reminder</button>
              </form>
              <h3>Reminders</h3>
              <ul>
                {reminders.map((r, index) => (
                  <li key={index}>{r.medicine} - {r.date} at {r.time}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
