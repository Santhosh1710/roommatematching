import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore } from "../firebase"; // Import the Firebase app instance
import { toast } from "react-toastify";
import './RoomListingForm.css';  // Import the CSS file

const RoomListingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    phoneNumber: "",
    blockName: "",
    roomNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating user.');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="room-listing-form">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="regNo"
          name="regNo"
          placeholder="Registration No."
          value={formData.regNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone No."
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="hobies"
          name="hobies"
          placeholder="Hobies"
          value={formData.hobies}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="mess"
          name="mess"
          placeholder="Mess Type"
          value={formData.mess}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomListingForm;
