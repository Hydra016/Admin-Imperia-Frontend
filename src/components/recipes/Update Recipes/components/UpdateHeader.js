import { IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function UpdateHeader({ recipe, myRecipe, setMyRecipe }) {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(myRecipe.name);
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
      }}
    >
      <div style={{ width: "fit-content", position: "relative" }}>
        {showInput ? (
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span style={{ display: "inline" }}>
              <TextField
                inputProps={{
                  style: {
                    fontSize: 50,
                    fontWeight: 600,
                    width: 350,
                    height: 38,
                  },
                }}
                variant="outlined"
                onChange={(e) =>
                  setMyRecipe({ ...myRecipe, name: e.target.value })
                }
                value={myRecipe.name}
              />
            </span>
            <div>
              <IconButton
                onClick={() => {
                  setName(myRecipe.name);
                  setShowInput(!showInput);
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setShowInput(!showInput);
                  setMyRecipe({ ...myRecipe, name: name });
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <>
            <span style={{ fontSize: 50, fontWeight: 600, display: "inline" }}>
              {myRecipe.name}
            </span>
            <div>
              <IconButton
                onClick={() => setShowInput(!showInput)}
                style={{ top: -10, left: "95%", position: "absolute" }}
              >
                <EditIcon />
              </IconButton>
            </div>
          </>
        )}
      </div>

      <span style={{ color: "#5A5A5A" }}>
        {recipe.data && (
          <>
            {t("recipe_id")}: {recipe.data._id}
          </>
        )}
      </span>
    </div>
  );
}

export default UpdateHeader;
