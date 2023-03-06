import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import { useTranslation } from "react-i18next";

function TimeAndPortions({ recipe }) {
  const { t } = useTranslation()

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid #f2f2f2",
          paddingBottom: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon />
          <span style={{ fontWeight: 600, marginLeft: 5 }}>
            {t("timeMinutes")}
          </span>
        </div>
        <span>
          {recipe.data.time} {t("minutes")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <GroupWorkOutlinedIcon />
          <span style={{ fontWeight: 600, marginLeft: 5 }}>
            {t("portions")}
          </span>
        </div>
        <span>
          {recipe.data.portions} {t("portions")}
        </span>
      </div>
    </div>
  );
}

export default TimeAndPortions;
