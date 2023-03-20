import React, { useEffect, } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRecipe } from "../../../features/recipes/recipeSlice";
import { CircularProgress, Paper } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import _ from "lodash";
import Images from "./components/Images";
import UserDetail from "./components/UserDetail";
import Ingredients from "./components/Ingredients";
import TimeAndPortions from "./components/TimeAndPortions";
import SingleRecipeHeader from "./components/SingleRecipeHeader";
import SingleRecipeInstructions from "./components/SingleRecipeInstructions";

export default function SingleRecipe() {
  const { isLoading, recipe } = useSelector((state) => state.recipe);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loaderContainer,
    singleRecipeContainer,
    singleRecipeContainerFirst,
    singleRecipeContainerSecond,
    SingleRecipeMain
  } = useStyles();

  useEffect(() => {
    dispatch(getSingleRecipe(id));
  }, []);
  if (
    !isLoading &&
    _.values(recipe).some((x) => x !== _.isEmpty) &&
    users.data
  ) {
    let user = users.data.find((user) => user._id === recipe.data.userId);

    return (
      <div className={singleRecipeContainer}>
        <div className={singleRecipeContainerFirst}>
          <SingleRecipeHeader recipe={recipe} />
          <div style={{ display: 'flex' }}>
          <Paper className={SingleRecipeMain}>
            <div style={{ display: "flex" }}>
              {<Images images={recipe.data.image} />}
              <span style={{ marginLeft: 50 }}>{recipe.data.description}</span>
            </div>

            <div style={{ marginTop: 40, display: "flex" }}>
              <div style={{ flexBasis: "36%" }}>
              <TimeAndPortions recipe={recipe}/>
              <Ingredients recipe={recipe} />
              </div>
              <SingleRecipeInstructions recipe={recipe} />
            </div>
          </Paper>
          <div className={singleRecipeContainerSecond}>
            <UserDetail recipe={recipe} />
        </div>
          </div>
          
        </div>
        
      </div>
    );
  }

  return (
    <div className={loaderContainer}>
      <CircularProgress style={{ color: "#FF7B00" }} />
    </div>
  );
}
