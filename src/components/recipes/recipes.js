import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../features/recipes/recipeSlice";
import { CircularProgress, Grid } from "@material-ui/core";
import { useStyles } from "../../hooks/useStyles";
import { useTranslation } from "react-i18next";
import Recipe from "./components/Recipe";

export default function Recipes() {
  const dispatch = useDispatch();
  const { recipes, isLoading } = useSelector((state) => state.recipe);
  const { users } = useSelector((state) => state.user);
  const { loaderContainer } = useStyles();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  if (!isLoading) {
    return (
      <div style={{ padding: 20 }}>
        <span
          style={{ fontWeight: 600, fontSize: 25 }}
        >
          {t("total_recipes")}: {recipes && recipes.data.length}
        </span>
        <Grid style={{ marginTop: 10 }} container xs={12} spacing={2}>
          {recipes && users.data
            ? recipes.data.map((recipe) => {
                let user = users.data.find(
                  (user) => user._id === recipe.userId
                );

                return (
                  <Grid item lg={3} m={6}>
                    <Recipe recipe={recipe} user={user} />
                  </Grid>
                );
              })
            : null}
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
