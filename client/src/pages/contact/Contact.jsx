import { useState } from 'react'
import axios from 'axios';
import './contact.css'

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [message, setMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        const newContact = {
            name,
            email,
            phone,
            message
        };

        try {
            const res =  await axios.post("/contacts", newContact);
            setSuccess(true);
            const form = document.getElementById("form");
            form.reset();

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="contact">
            <span className="contactTitle">Contact US</span>
            <form className="contactForm" onSubmit={handleSubmit} id="form">
                <label>Full Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your full name..."
                    onChange={e => setName(e.target.value)}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email..."
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Phone No.</label>
                <input 
                    type="phone" 
                    placeholder="Enter your phone number..."
                    onChange={e => setPhone(e.target.value)}
                />
                <label>Message</label>
                <textarea 
                    name="message" 
                    rows="10" cols="30"
                    placeholder="Enter a message..."
                    onChange={e => setMsg(e.target.value)} 
                 />
                <button className="contactButton" type="submit">Submit</button>
                { success &&
                    <span style={{color: "green", marginTop: "10px", textAlign: "center"}}>Message sent successfully</span>
                }
            </form>
        </div>
    )
}