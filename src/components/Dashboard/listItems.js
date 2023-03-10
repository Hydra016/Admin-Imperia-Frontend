import React, { useEffect, useState, useMemo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ApprovalIcon from "@mui/icons-material/Approval";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";
import { useTranslation } from "react-i18next";
import LogoutModal from "../../utils.js/LogoutModal";

export const MainListItems = () => {
  const navigate = useNavigate();
  const { listContainer } = useStyles();
  const dispatch = useDispatch();
  const { user, users, isLoading } = useSelector((state) => state.user);
  const { t } = useTranslation()
  const [ openModal, setOpenModal ] = useState(false)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
    <LogoutModal ModalHeading={`${t("modal_logout_text")}`} openModal={openModal} setOpenModal={setOpenModal} />
    <div className={listContainer}>
      <div>
        <ListItemButton onClick={() => navigate("Create")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary={t('add_recipe')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/Dashboard")}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary={t('all_recipes')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("myRecipes")}>
          <ListItemIcon>
            <BookmarkBorderIcon />
          </ListItemIcon>
          <ListItemText primary={t('my_recipes')} />
        </ListItemButton>
        {user && user.data.isSuperUser ? (
          <>
            <ListItemButton onClick={() => navigate("Users")}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary={t('all_users')} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("Requests")}>
              <ListItemIcon>
                <ApprovalIcon />
              </ListItemIcon>
              <ListItemText primary={t('requests')} />
              {
                users.data ? 
                <div
                style={{
                  backgroundColor: "#FF7B00",
                  color: "#FFF",
                  width: 20,
                  height: 20,
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
               {users.data.filter((user) => user.isAdmin === false).length}
              </div> : null
              }
              
            </ListItemButton>
          </>
        ) : null}
      </div>
      <div>
        <ListItemButton
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('logout')} />
        </ListItemButton>
      </div>
    </div>
    </>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
