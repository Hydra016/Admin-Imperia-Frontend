import React, { useEffect, useState } from "react";
import { loginUser } from "../../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useStyles } from "../../hooks/useStyles";
import { Alert, Box } from "@mui/material";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    emailError: false,
    passwordError: false,
  });
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submit, form, signupText, signupTextButton } = useStyles();
  useEffect(() => {
    if (isLoggedIn) {
      if (user.data && user.data.isAdmin) {
        navigate("/Dashboard");
      }
    } else {
      user.msg
        ? user.msg.split(" ").includes('"email"')
          ? setErrorMsg({
              ...errorMsg,
              msg: user.msg,
              emailError: true,
              passwordError: false,
            })
          : setErrorMsg({
              ...errorMsg,
              msg: user.msg,
              passwordError: true,
              emailError: false,
            })
        : setErrorMsg({
            ...errorMsg,
            emailError: false,
            passwordError: false,
            msg: "",
          });
    }
  }, [isLoggedIn, user]);

  return (
    <div className={form}>
      <TextField
        error={errorMsg.emailError}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        error={errorMsg.passwordError}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={submit}
        onClick={() => {
          dispatch(loginUser({ email, password }));
        }}
      >
        Sign In
      </Button>
      <div>
        <Link to="/Signup">
          <Typography variant="subtitle">Or Signup with email</Typography>
        </Link>
      </div>
      {errorMsg.msg && (
        <Box mt={2}>
          <Alert severity="error">{errorMsg.msg}</Alert>
        </Box>
      )}
    </div>
  );
}
