import React from "react";
import { useTranslation } from "react-i18next";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";

function Ingredients({ recipe }) {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: 50 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <SoupKitchenOutlinedIcon />
        <span style={{ fontWeight: 600, marginLeft: 5 }}>
          {t("ingredients")}
        </span>
      </div>
      {recipe.data.ingredients.map((ing) => {
        return (
          <div
            style={{
              borderBottom: "2px solid #f2f2f2",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <span>{ing}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Ingredients;
