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
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Approval = () => {
  const { users, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loaderContainer } = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log(users);
  if (!isLoading) {
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
              <TableCell>{t("accept")}</TableCell>
              <TableCell>{t("decline")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.data.map((user) => {
                if (!user.isAdmin) {
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
                        <Typography variant="subtitle1">{user.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          endIcon={<CheckCircleIcon />}
                          style={{ backgroundColor: "#FF7B00", color: "white" }}
                          onClick={() => {
                            dispatch(
                              approveUser({
                                _id: user._id,
                                isAdmin: true,
                                isSuperUser: false,
                              })
                            );
                          }}
                          variant="contained"
                        >
                          {t("approve")}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          endIcon={<CancelIcon />}
                          style={{ backgroundColor: "#FF7B00", color: "white" }}
                          onClick={() => {
                            dispatch(deleteUser(user._id));
                          }}
                          variant="contained"
                        >
                          {t("reject")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <div className={loaderContainer}>
      <CircularProgress style={{ color: "#FF7B00" }} />
    </div>
  );
};

export default Approval;
