import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";

function UpdateDescription({ recipe, myRecipe, setMyRecipe }) {
  const [showInput, setShowInput] = useState(false);
  const [description, setDescription] = useState(myRecipe.description);
  const { t } = useTranslation()

  return (
    <div style={{ flexBasis: "55%", height: 400, borderLeft: '1px solid #f2f2f2' }}>
      {showInput ? (
        <>
          <span>
            <IconButton
              onClick={() => {
                setDescription(myRecipe.description);
                setShowInput(!showInput);
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setShowInput(!showInput);
                setMyRecipe({ ...myRecipe, description });
              }}
            >
              <CloseIcon />
            </IconButton>
          </span>
          <div
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setMyRecipe({ ...myRecipe, description: e.target.value })
              }
              value={myRecipe.description}
              minRows={15}
              multiline
            />
          </div>
        </>
      ) : (
        <>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
            <span style={{ fontSize: 30, paddingLeft: 20, fontWeight: 600 }}>
                {t("description")}
            </span>
            <IconButton onClick={() => setShowInput(!showInput)}>
              <EditIcon />
            </IconButton>
          </span>
          <div
            style={{
              paddingTop: 5,
              paddingLeft: 20,
              paddingRight: 10,
              paddingBottom: 10,
            }}
          >
            {myRecipe.description}
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateDescription;
