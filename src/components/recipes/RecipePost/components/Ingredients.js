import React, { useState } from "react";
import { useStyles } from "../../../../hooks/useStyles";
import { Button, Typography, IconButton, TextField } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

function Ingredients({ recipe, setRecipe }) {
  const [val, setVal] = useState([]);
  const { t } = useTranslation()
  const { ingredientsContainer, ingTextFieldsContainer, noItemText } = useStyles()

  const handleIngredients = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setVal(inputData);
    setRecipe({ ...recipe, ingredients: inputData });
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
        <Typography variant="subtitle">{t("add_ingredient")}</Typography>
      </Button>
      <div className={ingTextFieldsContainer}>
        {val.length === 0 ? (
          <div className={noItemText}>
            <Typography variant="subtitle">
              {t("no_ingredients_yet")}
            </Typography>
          </div>
        ) : (
          val.map((data, i) => {
            return (
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
                label={t("ingredients")}
                variant="outlined"
                type="text"
                name="ingredients"
                onChange={(e) => handleIngredients(e, i)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Ingredients;
