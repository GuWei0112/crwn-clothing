import React, { useState } from "react";
import { connect } from "react-redux";
import "./sign-in.style.scss";
import FormInput from "../form-input/forn-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.action";

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(({ googleSignInStart, emailSignInStart }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = state;
    
    emailSignInStart(email, password);
  };

  const handleChange = e => {
    let { value, name } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={e => handleSubmit(e)}>
        <FormInput
          type="email"
          name="email"
          value={state.email}
          required
          label="Email"
          handleChange={e => {
            handleChange(e);
          }}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={state.password}
          handleChange={e => {
            handleChange(e);
          }}
          required
        />
        <div className="button">
          <CustomButton type="submit" value="Submit Form">
            Sign in
          </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
});
