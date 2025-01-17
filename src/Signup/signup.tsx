import { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { Signup_api } from "../Components/api/User_Api";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    const userData = {
      username,
      email,
      password,
      confirmPassword,
    };
    Signup_api(userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Your UserName"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Enter Your ConfirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <Button>Signup</Button>
      </form>
    </>
  );
};

export default Signup;
