import React from "react";
import { useTranslation } from "react-i18next"; 

function SingleRecipeHeader({ recipe }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20
      }}
    >
      <span style={{ fontSize: 50, fontWeight: 600, display: "inline" }}>
        {recipe.data.name}
      </span>
      <span style={{ color: "#5A5A5A" }}>
        {t("recipe_id")}: {recipe.data._id}
      </span>
    </div>
  );
}

export default SingleRecipeHeader;
