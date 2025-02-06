import { useState } from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Your Full Name "
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Enter Contact Number"
          value={contact}
          onChange={(e: any) => {
            setContact(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Enter Your Message"
          value={message}
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default Contact;
