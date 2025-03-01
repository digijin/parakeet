"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isPrototype = process.env.NEXT_PUBLIC_IS_PROTO === "true";

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");
      const usersList = await response.json();
      setUsers(usersList);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const user = users.find((user) => user.id === userId);
      setLoggedInUser(user);
    }
  }, [users]);

  const handleLogin = (userId) => {
    sessionStorage.setItem("userId", userId);
    const user = users.find((user) => user.id === userId);
    setLoggedInUser(user);
  };

  return (
    <div>
      {isPrototype && (
        <div className="notification-warning">
          This is a prototype, for now there is no auth, any user can be logged in to. 
          <br></br>
          <strong> Do not enter any confidential information anywhere !!!</strong>
          <br />
          This prototype is intended for demonstration purposes and uses, use real data at your own risk.
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="mb-4">
        {loggedInUser ? (
          <div>Currently logged in as: {loggedInUser.name} ({loggedInUser.email})</div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
      <div className="mb-4">
        available users: 
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name} ({user.email}){" "}
            <button onClick={() => handleLogin(user.id)} className="text-blue-500 underline">
              Login
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
