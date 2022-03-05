import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Login from "./Login";

function Registration() {
  const initialValues = { name: "", email: "", password: "" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  // const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});  
  const [isSubmit, setIsSubmit] = useState(false);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  function handleFormSubmit(e) {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (!name || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("prashantEmail", JSON.stringify(email));
      localStorage.setItem(
        "prashantPassword",
        JSON.stringify(password)
      );
      console.log("Saved in Local Storage");

      setLogin(!login);
      // setFormValues({ ...formValues, [name]: value });
    }
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
  }, [formErrors]);

  function handleClick() {
    setLogin(!login);
  }
  return (
    <>
        <div>
          {" "}
          {login ? (
            <form onSubmit={handleFormSubmit}>
              <h3>Register</h3>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  // value={formValues.name}
                  onChange={(event) => setName(event.target.value)}
                  // onChange={handleChange}
                />
              </div>
              <p>{formErrors.name}</p>
              <div className="form-group mt-20">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  // value={formValues.email}
                  onChange={(event) => setEmail(event.target.value)}
                  // onChange={handleChange}
                />
              </div>

              <div className="form-group mt-20">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  // value={formValues.password}
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                  // onChange={handleChange} 
                />
              </div>
              <button type="submit" className="mt-20 btn btn-dark btn-lg btn-block">
                Register
              </button>
              <p onClick={handleClick} className="forgot-password text-right">
                Already registered{" "}log in?
                
              </p>
              {flag && (
                <Alert color="primary" variant="danger">
                  I got it you are in hurry! But every Field is important!
                </Alert>
              )}
            </form>
          ) : (
            <Login />
          )}
        </div>
    
    </>
  );
}

export default Registration;
