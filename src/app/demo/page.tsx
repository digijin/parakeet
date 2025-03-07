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
      <h1 className="text-2xl font-bold mb-4">Demo Users</h1>
      <p>These are demo users for the purpose of testing the application.</p>
      <p>Be careful using these, as they are shared across all users and can be deleted by other users. Any data you add will be visible to other users.</p>
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
