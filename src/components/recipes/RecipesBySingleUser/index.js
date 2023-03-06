import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../../features/recipes/recipeSlice";
import RecipeCard from "./components/RecipeCard.js";
import { Grid, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useStyles } from "../../../hooks/useStyles";

function SingleUserRecipe() {
  const { id } = useParams();
  const { recipes, isLoading } = useSelector((state) => state.recipe);
  const { users } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const { singleRecipeContainerFirst,loaderContainer } = useStyles()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  if(!isLoading) {
    return (
      <div className={singleRecipeContainerFirst}>
        <span style={{ textTransform: "capitalize", fontSize: 20 }}>{t("all_recipes_by")} <span style={{ fontWeight: 600 }}>{users.data ? users.data.find((user) => user._id === id).name : null}</span></span>
        <Grid style={{ marginTop: 10 }} container xs={12} spacing={2}>
          {recipes &&
            users.data &&
            recipes.data.map((recipe) => {
              return (
                <Grid item xs={6} md={4}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }
  return (
    <div className={loaderContainer}>
      <CircularProgress style={{ color: "#FF7B00" }} />
    </div>
  );
}

export default SingleUserRecipe;
