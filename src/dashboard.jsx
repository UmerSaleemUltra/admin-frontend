import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactTable() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data when the component mounts
    axios
      .get("https://buzz-filling-dashboard.vercel.app/api/auth/user/users")
      .then((response) => {
        console.log(response.data); // Log the response data to check structure
        
        // If the response contains a `users` key that holds an array, extract it
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users); // Set the users state
        } else {
          console.error("Data is not in the expected format.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users available</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Business Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">State</th>
            <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <td className="border border-gray-300 px-4 py-2">{user.businessName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.state}</td>
              <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
