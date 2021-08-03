import { useState } from 'react'
import axios from 'axios';
import emailjs, { send } from 'emailjs-com';
import { init } from 'emailjs-com';

import './contact.css'

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [message, setMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
    });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setSuccess(false);

    //     const newContact = {
    //         name,
    //         email,
    //         phone,
    //         message
    //     };

    //     try {
    //         const res =  await axios.post("/contacts", newContact);
    //         setSuccess(true);
    //         const form = document.getElementById("form");
    //         form.reset();

    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    const sendEmail = (e) => {
        e.preventDefault();
        init("user_9qFXHsbzaygEG8pIAQg0g");

        send(
            'service_suu15ik',
            'template_86sqi3d',
            toSend,
            'user_9qFXHsbzaygEG8pIAQg0g'
        ).then((res) => {
            console.log('SUCCESS!', res.status, res.text);
        })
        .catch((err) => {
           console.log('FAILED...', err); 
        });

        // emailjs.sendForm('service_suu15ik', 'template_86sqi3d', e.target, 'user_9qFXHsbzaygEG8pIAQg0g')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
    }

    const handleChange = (e) => {
        setToSend({...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact">
            <span className="contactTitle">Contact US</span>
            <form className="contactForm" onSubmit={sendEmail} id="form">
                <label>Full Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your full name..."
                    name="from_name"
                    onChange={handleChange}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email..."
                    name="reply_to"
                    onChange={handleChange}
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
                    onChange={handleChange} 
                 />
                <button className="contactButton" type="submit">Submit</button>
                { success &&
                    <span style={{color: "green", marginTop: "10px", textAlign: "center"}}>Message sent successfully</span>
                }
            </form>
        </div>
    )
}