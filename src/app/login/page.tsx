"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");
      const usersList = await response.json();
      setUsers(usersList);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
