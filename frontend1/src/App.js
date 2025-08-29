import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  // fetch users
  useEffect(() => {
    fetch("http://localhost:5000/api/users") // call Flask backend
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // add user
  const addUser = () => {
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newUser })
    })
      .then(res => res.json())
      .then(user => {
        setUsers([...users, [user.id, user.name]]);
        setNewUser("");
      });
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u[1]}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
