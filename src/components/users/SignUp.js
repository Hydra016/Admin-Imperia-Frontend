import React, { useState, useCallback, useEffect } from "react";
import { signupUser } from "../../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Grid, Typography } from "@mui/material";
import { useStyles } from "../../hooks/useStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useBase64 } from "../../hooks/useBase64";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const { handleCreateBase64, logo } = useBase64("")

  const {
    signupFormField,
    avatarImage,
    avatarInput,
    avatarIcon,
    submitButtonContainer,
    submitButton,
    submitInput,
    avatarPreview,
  } = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    console.log(formData);
    dispatch(signupUser(formData));
  };

  return (
    <div
      style={{
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 100,
        paddingRight: 100,
        width: "100%",
      }}
    >
      <form onSubmit={handleUpload}>
        <Grid container xs={12}>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ marginBottom: 10 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className={avatarImage}>
              <div className={avatarIcon}>
                {logo && logo ? (
                  <img className={avatarPreview} src={logo} alt="avatar" />
                ) : (
                  <PersonAddAlt1Icon color="primary" style={{ fontSize: 70 }} />
                )}
              </div>
              <input
                className={avatarInput}
                name="avatar"
                type="file"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  handleCreateBase64(e.target.files[0]);
                }}
              />
            </div>
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              style={{ marginBottom: 10 }}
              className={signupFormField}
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: 10 }}
              className={signupFormField}
              label="Email"
              variant="outlined"
              name="email"
              type="text"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              style={{ marginBottom: 10 }}
              className={signupFormField}
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <div
          className={submitButtonContainer}
          style={{ marginTop: 50, width: "100%" }}
        >
          <input className={submitInput} type="submit" />
          <div className={submitButton}>
            <Typography style={{ marginRight: 5 }} variant="subtitle">
              Submit
            </Typography>
            <ChevronRightIcon />
          </div>
        </div>
      </form>
    </div>
  );
}
