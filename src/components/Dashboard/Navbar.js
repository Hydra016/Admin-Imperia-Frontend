import React, { useEffect, useState } from "react";
import { Typography, Toolbar, AppBar, Avatar, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useStyles } from "../../hooks/useStyles";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../features/common/commonSlice";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { navbar } = useStyles();
  const { user } = useSelector((state) => state.user);
  const [alignment, setAlignment] = useState('lv');
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const drawerWidth = 250;

  useEffect(() => {
    dispatch(setLang(alignment))
  }, [alignment])

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar
      className={navbar}>
        <Typography style={{ color: "#fff", textTransform: "capitalize" }}>
          {t("welcome")}, {user && user.data.name}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <ToggleButtonGroup
         style={{ height: 30 }}
          value={alignment}
          exclusive
          onChange={(e) => setAlignment(e.target.value)}
          aria-label="Platform"
          
        >
          <ToggleButton value="en">EN</ToggleButton>
          <ToggleButton value="lv">LV</ToggleButton>
        </ToggleButtonGroup>

        <div style={{ marginLeft: 30 }}>
          {user && user.data.avatar ? (
            <img
              style={{ width: 50, height: 50, borderRadius: 100, objectFit: 'cover', marginTop: 6 }}
              src={user.data.avatar}
            />
          ) : (
            <Typography>NM</Typography>
          )}
        </div>
        </div>
        
      </Toolbar>
    </AppBar>
  );
}
