import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeById } from "../../../features/recipes/recipeSlice";
import { CircularProgress, Grid } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import { useTranslation } from "react-i18next";
import Recipe from "./components/Recipe";
import DeleteModal from "../../../utils.js/DeleteModal";

export default function Recipes() {
  const dispatch = useDispatch();
  const { recipes, isLoading } = useSelector((state) => state.recipe);
  const { user } = useSelector((state) => state.user);
  const { loaderContainer } = useStyles();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getRecipeById(user.data._id));
  }, []);
  const [openModal, setOpenModal] = useState({
    modalState: false,
    id: "",
    userId: "",
  });
  if (!isLoading) {
    return (
      <>
        <DeleteModal
          ModalHeading={`${t("recipe_delete_warning")}`}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <div style={{ padding: 20 }}>
          <span style={{ fontWeight: 600, fontSize: 25 }}>
            {t("total_recipes")}: {recipes && recipes.data.length}
          </span>
          <Grid style={{ marginTop: 10 }} container xs={12} spacing={2}>
            {recipes &&
              recipes.data.map((recipe) => {
                return (
                  <Grid item lg={3} m={6}>
                    <Recipe
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      recipe={recipe}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </>
    );
  }

  return (
    <div className={loaderContainer}>
      <CircularProgress style={{ color: "#FF7B00" }} />
    </div>
  );
}
