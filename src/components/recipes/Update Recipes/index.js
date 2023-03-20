import React, { useEffect, useState } from "react";
import Loader from "../../../utils.js/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRecipe } from "../../../features/recipes/recipeSlice";
import { useParams } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import { useTranslation } from "react-i18next";
import UpdateHeader from "./components/UpdateHeader";
import UpdateDescription from "./components/UpdateDescription";
import UpdateImages from "./components/UpdateImages";
import UserDetail from "../SingleRecipe/components/UserDetail";
import UpdateTimeAndPortions from "./components/UpdateTimeAndPortions";

function UpdateRecipe() {
  const { recipe, isLoading } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    singleRecipeContainer,
    singleRecipeContainerFirst,
    SingleRecipeMain,
    singleRecipeContainerSecond,
  } = useStyles();
  const { t } = useTranslation();

  const [myRecipe, setMyRecipe] = useState({
    name: "",
    description: "",
    time: "",
    portions: "",
    // ingredients: [],
    // instructions: [],
    // image: [],
    // userId: user.data._id
  });

  useEffect(() => {
    dispatch(getSingleRecipe(id));
  }, []);

  useEffect(() => {
    if (recipe.data) {
      setMyRecipe({
        ...myRecipe,
        name: recipe.data.name,
        time: recipe.data.time,
        portions: recipe.data.portions,
        description: recipe.data.description,
      });
    }
  }, [recipe]);

  return (
    <Loader isLoading={isLoading}>
      {recipe.data && (
        <div className={singleRecipeContainer}>
          <div className={singleRecipeContainerFirst}>
            <UpdateHeader
              myRecipe={myRecipe}
              setMyRecipe={setMyRecipe}
              recipe={recipe}
            />
            <div style={{ display: "flex" }}>
              <Paper className={SingleRecipeMain}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flexBasis: "45%" }}>
                    <UpdateTimeAndPortions
                      myRecipe={myRecipe}
                      setMyRecipe={setMyRecipe}
                      recipe={recipe}
                    />
                  </div>
                  <UpdateDescription
                    myRecipe={myRecipe}
                    setMyRecipe={setMyRecipe}
                    recipe={recipe}
                  />
                </div>
                <UpdateImages
                  myRecipe={myRecipe}
                  setMyRecipe={setMyRecipe}
                  recipe={recipe}
                />
              </Paper>
              <div className={singleRecipeContainerSecond}>
                <UserDetail recipe={recipe} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Loader>
  );
}

export default UpdateRecipe;
