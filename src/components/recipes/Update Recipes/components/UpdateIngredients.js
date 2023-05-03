import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import { IconButton, TextField } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Instruction from "./UpdateInstructions/Instruction";

function UpdateIngredients({ recipe, myRecipe, setMyRecipe }) {
  const { t } = useTranslation();
  const [val, setVal] = useState(myRecipe.instructions);

  useEffect(() => {
    setVal(myRecipe.instructions);
  }, [myRecipe]);

  console.log(val);

  const handleIngredients = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setVal(inputData);
    setMyRecipe({ ...recipe, ingredients: inputData });
  };

  const handleAdd = () => {
    const newIngredients = [...val, []];
    setVal(newIngredients);
  };

  const handleDelete = (data) => {
    const newVal = val.filter((text) => text !== data);
    setVal(newVal);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderTop: "2px solid #f2f2f2",
        paddingTop: 10,
        paddingBottom: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IntegrationInstructionsOutlinedIcon />
          <span style={{ fontWeight: 600, marginLeft: 5 }}>
            {t("instructions")}s
          </span>
        </div>
        <IconButton>
          <AddCircleIcon />
        </IconButton>
      </div>
      {val.length === 0 ? (
        <span>NOTHING</span>
      ) : (
        myRecipe.instructions.map((ins, i) => {
          return <Instruction ins={ins} i={i} />;
        })
      )}
    </div>
  );
}

export default UpdateIngredients;
