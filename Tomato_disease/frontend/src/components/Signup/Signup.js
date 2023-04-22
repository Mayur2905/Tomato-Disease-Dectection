import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./Signup.module.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../../firebase"

export function Signup() {
  const navigate = useNavigate();
  const [values, setValue] = useState({
    name: "",
    email: "",
    pass: "",
    mobile: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || !values.mobile) {
      setErrorMsg("Fill all Fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name
          // phoneNumber: values.mobile
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sign Up</h1>
        <InputControl
          label="Name"
          type="text"
          placeholder="Enter Your Name"
          onChange={(event) =>
            setValue((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          onChange={(event) =>
            setValue((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          type="password"
          placeholder="Enter  Password"
          onChange={(event) =>
            setValue((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <InputControl
          label="Mobile Number"
          type="tel"
          placeholder="Enter  Mobile Number"
          onChange={(event) =>
            setValue((prev) => ({ ...prev, mobile: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login"> Log In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
