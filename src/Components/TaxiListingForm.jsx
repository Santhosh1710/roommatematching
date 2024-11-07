import React, { useState } from 'react';
import { toast } from "react-toastify";

const TaxiListingForm = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',  
        date: '',
        passengers: '',
        fromError: false,
        toError: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let isValid = /^[A-Za-z]*$/.test(value); // Allows only alphabets

        // Set error state based on validity
        if (name === "from") {
            setFormData({ ...formData, from: value, fromError: !isValid });
        } else if (name === "to") {
            setFormData({ ...formData, to: value, toError: !isValid });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if there are any errors before submitting
        if (formData.fromError || formData.toError) {
            toast.error("Please correct the errors before submitting.");
            return;
        }

        try {
            const userEmail = localStorage.getItem('email');
            const response = await fetch('http://localhost:5000/api/taxi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'email' : userEmail
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setFormData({
                    from: '',
                    to: '',  
                    date: '',
                    passengers: '',
                    fromError: false,
                    toError: false
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error adding taxi listing:', error);
            toast.error('Error adding taxi listing');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto", padding: "20px", border: "2px solid black", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", fontSize: "14px" }}>
            <div>
                <input
                    type="text"
                    id="from"
                    name="from"
                    placeholder='From'
                    value={formData.from}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: formData.fromError ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "5px"
                    }}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="to"
                    name="to"
                    placeholder='To'
                    value={formData.to}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: formData.toError ? "1px solid red" : "1px solid #ccc",
                        borderRadius: "5px"
                    }}
                />
            </div>
            <div>
                <input type="date" id="date" name="date" placeholder='Date' value={formData.date} onChange={handleChange} required style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px" }} />
            </div>
            <div>
                <input type="number" id="passengers" name="passengers" placeholder='Passengers' value={formData.passengers} onChange={handleChange} required style={{ width: "100%", padding: "10px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px" }} />
            </div>
            <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Submit</button>
        </form>
    );
};

export default TaxiListingForm;
