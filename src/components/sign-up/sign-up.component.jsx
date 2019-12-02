import React, { useState } from "react";

import FormInput from "../form-input/forn-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { signUpstart } from "../../redux/user/user.action";
import "./sign-up.style.scss";

const mapDispatchToProps = dispatch => ({
  signUpstart: userCredentials => dispatch(signUpstart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(({signUpstart}) => {
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
    signUpstart({displayName, email, password})
    setState({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
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
});
