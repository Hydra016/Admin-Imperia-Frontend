import { Button, Paper } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "../../../../hooks/useStyles";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Link } from "react-router-dom";

function UserDetail({ user, recipe }) {
  const { t } = useTranslation();
  const { UserDetailContainer, userDetailContent } = useStyles();
  return (
    <>
      <Paper className={UserDetailContainer}>
        <h3
          style={{
            borderBottom: "2px solid #f2f2f2",
            paddingBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {t("posted_by")}
        </h3>
        <div style={{ paddingTop: 20 }}>
          <img
            src={user.avatar}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              objectFit: "cover",
            }}
          />
          <div style={{ marginTop: 20 }}>
            <div className={userDetailContent}>
              <span style={{ fontWeight: 600 }}>{t("created_by")}</span>
              <span style={{ textTransform: "capitalize" }}>{user.name}</span>
            </div>
            <div className={userDetailContent}>
              <span style={{ fontWeight: 600 }}>{t("created_at")}</span>
              <span>{recipe.data.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
      </Paper>
      <Link
      to={`/Dashboard/Recipes/${user._id}`}
      style={{all: 'unset'}}
      >
      <Button
        endIcon={<ChevronRightOutlinedIcon />}
        style={{
          color: "#FF7B00",
          borderColor: "#FF7B00",
          marginTop: 20,
          width: "100%",
        }}
        variant="outlined"
      >
        <span style={{ textTransform: "capitalize" }} >{t("more_recipes_by")} {user.name}</span>
      </Button>
      </Link>
    </>
  );
}

export default UserDetail;
