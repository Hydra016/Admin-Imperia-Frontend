import React, { useState } from "react";
import { useStyles } from "../../../../hooks/useStyles";
import { Button, Typography, IconButton, TextField } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

function Instructions({ recipe, setRecipe }) {
  const [val, setVal] = useState([]);
  const { t } = useTranslation()
  const { ingTextFieldsContainer, noItemText, signupFormFieldInstructions, ingredientsContainer } = useStyles()

  const handleIngredients = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setVal(inputData);
    setRecipe({ ...recipe, instructions: inputData });
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
    <div className={ingredientsContainer}>
      <Button
        endIcon={<AddBoxIcon />}
        variant="contained"
        style={{ backgroundColor: "#FF7B00", color: "#FFF" }}
        onClick={() => handleAdd()}
      >
        <Typography variant="subtitle">{t("add_instructions")}</Typography>
      </Button>
      <div className={ingTextFieldsContainer}>
        {val.length === 0 ? (
          <div className={noItemText}>
            <Typography variant="subtitle">
              {t("please_add_instructions")}
            </Typography>
          </div>
        ) : (
          val.map((data, i) => {
            return (
            <>
                <Typography variant="h6" style={{ marginTop: 5 }}>
                    {`Step ${i+1}`}
                </Typography>
              <TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => handleDelete(data)}>
                      <DeleteIcon />
                    </IconButton>
                  ),
                }}
                style={{ marginTop: 10, width: "100%" }}
                value={data}
                label={t("instructions")}
                variant="outlined"
                type="text"
                name="ingredients"
                onChange={(e) => handleIngredients(e, i)}
              />
              </>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Instructions;
