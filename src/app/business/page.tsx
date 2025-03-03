"use client";

import { useState, useEffect } from "react";

interface Business {
  id: string;
  name: string;
  created: string;
  updated: string;
}

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [newBusinessName, setNewBusinessName] = useState("");
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [editedBusinessName, setEditedBusinessName] = useState("");
  const [error, setError] = useState("");

  const fetchBusinesses = async () => {
    try {
      const response = await fetch("/api/business"); // Use the API route
      if (!response.ok) {
        throw new Error("Failed to fetch businesses");
      }
      const data: Business[] = await response.json();
      setBusinesses(data);
    } catch (err) {
      setError("Failed to load businesses.");
      console.error("Error fetching businesses:", err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if(newBusinessName == "")
    {
        setError("Name cannot be empty");
        return;
    }
    try {
      const response = await fetch("/api/business", { // Use the API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newBusinessName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add business");
      }

      const newBusiness: Business = await response.json();
      setBusinesses([...businesses, newBusiness]);
      setNewBusinessName("");
    } catch (err) {
      setError("Failed to add business.");
      console.error("Error adding business:", err);
    }
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusinessId(business.id);
    setEditedBusinessName(business.name);
  };

  const handleUpdateBusiness = async () => {
    setError("");
    if(editedBusinessName == "")
    {
        setError("Name cannot be empty");
        return;
    }
    try {
      if (editingBusinessId) {
        const response = await fetch(`/api/business/${editingBusinessId}`, { // Use the API route
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: editedBusinessName }),
        });

        if (!response.ok) {
          throw new Error("Failed to update business");
        }

        const updatedBusiness: Business = await response.json();
        setBusinesses(
          businesses.map((business) =>
            business.id === updatedBusiness.id ? updatedBusiness : business
          )
        );
        setEditingBusinessId(null);
        setEditedBusinessName("");
      }
    } catch (err) {
      setError("Failed to update business.");
      console.error("Error updating business:", err);
    }
  };

  const handleDeleteBusiness = async (id: string) => {
    setError("");
    try {
      const response = await fetch(`/api/business/${id}`, { // Use the API route
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete business");
      }

      setBusinesses(businesses.filter((business) => business.id !== id));
    } catch (err) {
      setError("Failed to delete business.");
      console.error("Error deleting business:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Businesses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {businesses.map((business) => (
          <li key={business.id} className="mb-2 flex items-center">
            {editingBusinessId === business.id ? (
              <input
                type="text"
                value={editedBusinessName}
                onChange={(e) => setEditedBusinessName(e.target.value)}
                className="mr-2 border"
              />
            ) : (
              <span className="mr-2">{business.name}</span>
            )}
            {editingBusinessId === business.id ? (
              <>
                <button onClick={handleUpdateBusiness} className="text-blue-500 underline mr-2">
                  Save
                </button>
                <button onClick={() => setEditingBusinessId(null)} className="text-gray-500 underline">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditBusiness(business)} className="text-blue-500 underline mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteBusiness(business.id)} className="text-red-500 underline">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">Add New Business</h2>
      <form onSubmit={handleAddBusiness} className="flex">
        <input
          type="text"
          value={newBusinessName}
          onChange={(e) => setNewBusinessName(e.target.value)}
          className="border mr-2"
          placeholder="Business Name"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Business
        </button>
      </form>
    </div>
  );
}
