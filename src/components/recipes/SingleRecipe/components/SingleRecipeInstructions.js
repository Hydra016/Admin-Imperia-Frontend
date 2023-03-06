import React from "react";
import { useTranslation } from "react-i18next";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";

function SingleRecipeInstructions({ recipe }) {
  const { t } = useTranslation();

  return (
    <div style={{ flexBasis: "64%", paddingLeft: 50 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <IntegrationInstructionsOutlinedIcon />
        <span style={{ fontWeight: 600, marginLeft: 5 }}>
          {t("instructions")}s
        </span>
      </div>
      {recipe.data.instructions.map((ins, i) => {
        return (
          <div
            style={{
              borderBottom: "2px solid #f2f2f2",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <span style={{ display: "block", fontWeight: 500 }}>{`Step ${i+1}`}: </span>
            <span>{ins}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SingleRecipeInstructions;
