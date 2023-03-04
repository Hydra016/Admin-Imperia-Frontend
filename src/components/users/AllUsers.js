import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  approveUser,
  deleteUser,
} from "../../features/users/userSlice";
import { useStyles } from "../../hooks/useStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";

const Approval = () => {
  const { users, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loaderContainer } = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log(users);
  if(!isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">{t("avatar")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{t("name")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{t("email")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{t("role")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{t("make_super_user")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">{t("actions")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              users &&
              users.data.map((user) => {
                if (user.isAdmin) {
                  return (
                    <TableRow
                      key={user.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <div>
                        <img style={{ width: 50, height: 50, borderRadius: 500,objectFit: 'cover' }} src={user.avatar} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ textTransform: 'capitalize' }} variant="subtitle1">{user.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">{user.email}</Typography>
                      </TableCell>
                      {!user.isSuperUser ? (
                        <TableCell>
                          <Typography variant="subtitle1">
                          {t("admin")}
                          </Typography>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Typography variant="subtitle1">
                          {t("super_user")}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          endIcon={<CheckCircleIcon />}
                          style={{ backgroundColor: "#FF7B00", color: "white" }}
                          onClick={() => {
                            dispatch(
                              approveUser({
                                _id: user._id,
                                isSuperUser: true,
                              })
                            );
                          }}
                          variant="contained"
                        >
                          {t("approve")}
                        </Button>
                      </TableCell>
                      {
                        user.isAdmin && !user.isSuperUser ? <TableCell>
                        <Button
                          endIcon={<CancelIcon />}
                          style={{ backgroundColor: "#FF7B00", color: "white" }}
                          onClick={() => {
                            dispatch(
                              approveUser({
                                _id: user._id,
                                isAdmin: false,
                              })
                            );
                          }}
                          variant="contained"
                        >
                          {t("remove_admin")}
                        </Button>
                      </TableCell> :
                      <TableCell>
                        {t("no_actions")}
                      </TableCell>
                      }
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <div className={loaderContainer}><CircularProgress style={{ color: '#FF7B00' }} /></div>
};

export default Approval;
