import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipe } from "../../features/recipes/recipeSlice";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../hooks/useStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Alert } from "@mui/material";
import { useBase64 } from "../../hooks/useBase64";
import { useTranslation } from "react-i18next";

export default function RecipePost() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    time: "",
    portions: "",
    ingredients: [],
    instructions: "",
    image: [],
  });

  const dispatch = useDispatch();
  const postedRecipe = useSelector((state) => state.recipe);
  const [val, setVal] = useState([]);
  const { handleCreateBase64, logo, handleDeleteFiles } = useBase64([]);
  const { t } = useTranslation();

  useEffect(() => {
    setRecipe({ ...recipe, image: logo });
  }, [logo]);

  const {
    signupContainer,
    signupForm,
    signupFormField,
    signupFormFieldInstructions,
    signupFirstContainer,
    signupSecondContainer,
    signupThirdContainer,
    fileContainer,
    fileContainerIngredients,
    inputContainer,
    inputButton,
    inputIcon,
    inputMainContainer,
    uploadImage,
    submitButtonContainer,
    submitButton,
    submitInput,
    ingredientsContainer,
    ingTextFieldsContainer,
    noItemText,
  } = useStyles();

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

  const handleError = () => {
    if (
      (postedRecipe && postedRecipe.recipe.msg) ||
      postedRecipe.recipe.data.createdAt
    ) {
      if (postedRecipe.recipe.msg) {
        return (
          <Box style={{ width: 500, marginLeft: 25 }} mt={2}>
            <Alert severity="error">{postedRecipe.recipe.msg}</Alert>
          </Box>
        );
      } else if (postedRecipe.recipe.data) {
        return (
          <Box style={{ width: 500, marginLeft: 25, marginBottom: 25 }} mt={2}>
            <Alert severity="success">Recipe Posted</Alert>
          </Box>
        );
      }
    }
    return null;
  };

  return (
    <Box style={{ width: "100%" }}>
      <div className={signupContainer}>
        <div className={signupForm}>
          <div className={signupFirstContainer}>
            <div className={signupSecondContainer}>
              <TextField
                className={signupFormField}
                label={t("name")}
                variant="outlined"
                type="text"
                name="name"
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />
              <TextField
                className={signupFormField}
                label={t("time")}
                variant="outlined"
                type="number"
                name="time"
                onChange={(e) => setRecipe({ ...recipe, time: e.target.value })}
              />
              <TextField
                className={signupFormField}
                label={t("portions")}
                variant="outlined"
                type="number"
                name="portions"
                onChange={(e) =>
                  setRecipe({ ...recipe, portions: e.target.value })
                }
              />
            </div>
            <div className={signupThirdContainer}>
              <TextField
                style={{ width: "100%" }}
                minRows={8}
                multiline
                label={t("description")}
                variant="outlined"
                type="text"
                name="description"
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />
            </div>
          </div>
          <TextField
            minRows={8}
            multiline
            className={signupFormFieldInstructions}
            label={t("instructions")}
            variant="outlined"
            type="text"
            name="instructions"
            onChange={(e) =>
              setRecipe({ ...recipe, instructions: e.target.value })
            }
          />
          <div className={fileContainer}>
            <div className={fileContainerIngredients}>
              <div className={ingredientsContainer}>
                <Button
                  endIcon={<AddBoxIcon />}
                  variant="contained"
                  style={{ backgroundColor: "#FF7B00", color: "#FFF" }}
                  onClick={() => handleAdd()}
                >
                  <Typography variant="subtitle">
                    {t("add_ingredient")}
                  </Typography>
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
              <div className={inputMainContainer}>
                <div className={inputContainer}>
                  <input
                    className={inputButton}
                    type="file"
                    name="image[]"
                    multiple
                    onChange={(e) => {
                      handleCreateBase64(e.target.files);
                    }}
                  />
                  <div className={inputIcon}>
                    <CloudUploadIcon
                      style={{ fontSize: 50, fill: "#FF7B00" }}
                    />
                    <Typography variant="subtitle">{t("upload_files")}</Typography>
                  </div>
                </div>
                <div>
                  {logo &&
                    logo.map((img) => {
                      return (
                        <div className={uploadImage}>
                          {/* <Typography variant="subtitle">
              {img.name}
              </Typography> */}
                          <div>
                            <IconButton onClick={() => handleDeleteFiles(img)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <Button
              className={submitInput}
              endIcon={<ChevronRightIcon />}
              onClick={() => dispatch(postRecipe(recipe))}
              variant="contained"
            >
              {t("submit")}
            </Button>
          </div>
        </div>
      </div>
      {handleError()}
    </Box>
  );
}
