import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipe } from "../../../features/recipes/recipeSlice";
import _ from 'lodash';
import {
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import Ingredients from "./components/Ingredients";
import FileUpload from "./components/FileUpload";
import Instructions from "./components/Instructions";

export default function RecipePost() {
  const dispatch = useDispatch();
  const postedRecipe = useSelector((state) => state.recipe);
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    time: "",
    portions: "",
    ingredients: [],
    instructions: [],
    image: [],
    userId: user.data._id
  });

  const {
    signupContainer,
    signupForm,
    signupFormField,
    signupFirstContainer,
    signupSecondContainer,
    signupThirdContainer,
    fileContainer,
    fileContainerIngredients,
    submitInput,
  } = useStyles();

  const handleError = () => {
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
      } else {
        return
      }
  };

  return (
    <Box>
      <div className={signupContainer}>
        <div style={{ width: "100%" }} className={signupForm}>
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
          <div className={fileContainer}>
            <div className={fileContainerIngredients}>
              <Ingredients recipe={recipe} setRecipe={setRecipe}/>
              <Instructions recipe={recipe} setRecipe={setRecipe} />
            </div>
            <div className={fileContainerIngredients}>
            <FileUpload recipe={recipe} setRecipe={setRecipe}/>
            </div>
            <Button
              className={submitInput}
              endIcon={<ChevronRightIcon />}
              onClick={() => {
                dispatch(postRecipe(recipe))
              }}
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
