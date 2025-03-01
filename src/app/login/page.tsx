"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const isPrototype = process.env.NEXT_PUBLIC_IS_PROTO === "true";

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
      {isPrototype && (
        <div className="notification-warning">
          This is a prototype, for now there is no auth, any user can be logged in to. 
          <br></br>
          <strong> Do not enter any confidential information anywhere !!!</strong>
          <br />
          This page is for demonstration purposes and uses, test data only
        </div>
      )}
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
