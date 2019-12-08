import React, { useState } from "react";

import FormInput from "../form-input/forn-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import "./sign-up.style.scss";
export default () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async () => {
    const { displayName, email, password, confirmPassword } = state;
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={() => handleSubmit()}>
        <FormInput
          type="text"
          name="displayName"
          value={state.displayName}
          label="DisplayName"
          onChange={e => handleChange(e)}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={state.email}
          label="Email"
          onChange={e => handleChange(e)}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={state.password}
          label="password"
          onChange={e => handleChange(e)}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={e => handleChange(e)}
          label="Confirm the password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};
