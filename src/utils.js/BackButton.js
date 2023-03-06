import React from "react";
import { Button } from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function BackButton({ path }) {
  const { t } = useTranslation();

  return (
    <Link to={`${path}`} style={{ textDecoration: "none" }}>
      <Button style={{ color: "#FF7B00", borderColor: "#FF7B00" }} startIcon={<ChevronLeftIcon />} variant="outlined">
        <span style={{ textTransform: "capitalize" }}>{t("back")}</span>
      </Button>
    </Link>
  );
}

export default BackButton;
