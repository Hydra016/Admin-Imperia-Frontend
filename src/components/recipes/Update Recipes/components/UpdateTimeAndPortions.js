import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function UpdateTimeAndPortions({ recipe, myRecipe, setMyRecipe }) {
  const { t } = useTranslation();
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showPortionsInput, setShowPortionsInput] = useState(false);
  const [portions, setportions] = useState(myRecipe.portions);
  const [time, settime] = useState(myRecipe.time);

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon />
            <span style={{ fontWeight: 600, marginLeft: 5 }}>
              {t("timeMinutes")}
            </span>
          </div>
          <span>
            {showTimeInput ? (
              <TextField
                variant="outlined"
                type="number"
                name="time"
                inputProps={{
                  style: {
                    width: 60,
                    height: 0,
                  },
                }}
                onChange={(e) =>
                  setMyRecipe({ ...myRecipe, time: e.target.value })
                }
                value={myRecipe.time}
              />
            ) : (
              <>
                {myRecipe.time} {t("minutes")}
              </>
            )}
          </span>
        </div>
        {showTimeInput ? (
          <>
            <IconButton
              onClick={() => {
                settime(myRecipe.time);
                setShowTimeInput(!showTimeInput);
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setMyRecipe({ ...myRecipe, time });
                setShowTimeInput(!showTimeInput);
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setShowTimeInput(!showTimeInput)}>
            <EditIcon />
          </IconButton>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <GroupWorkOutlinedIcon />
            <span style={{ fontWeight: 600, marginLeft: 5 }}>
              {t("portions")}
            </span>
          </div>
          <span>
            {showPortionsInput ? (
              <TextField
                variant="outlined"
                type="number"
                name="portions"
                onChange={(e) =>
                  setMyRecipe({ ...myRecipe, portions: e.target.value })
                }
                value={myRecipe.portions}
                inputProps={{
                  style: {
                    width: 60,
                    height: 0,
                  },
                }}
              />
            ) : (
              <>
                {myRecipe.portions} {t("portions")}
              </>
            )}
          </span>
        </div>
        {showPortionsInput ? (
          <>
            <IconButton
              onClick={() => {
                setportions(myRecipe.portions);
                setShowPortionsInput(!showPortionsInput);
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setMyRecipe({ ...myRecipe, portions });
                setShowPortionsInput(!showPortionsInput);
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setShowPortionsInput(!showPortionsInput)}>
            <EditIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default UpdateTimeAndPortions;
