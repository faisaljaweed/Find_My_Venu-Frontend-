import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    setContact("");
    console.log({ name, email, message, contact });
    toast.success("Message Sent Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Contact Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Enter Your Message"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Number</label>
            <input
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter Your Contact Number"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
