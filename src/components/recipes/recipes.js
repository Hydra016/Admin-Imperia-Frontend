import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../features/recipes/recipeSlice";
import { getAllUsers } from "../../features/users/userSlice";
import {
  CircularProgress,
  Paper,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { useStyles } from "../../hooks/useStyles";
import Images from "./components/Images";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Recipes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <Typography variant="h5" style={{ marginBottom: 30, marginTop: 10, fontWeight: 600}}>{t("total_recipes")}: {recipes && recipes.data.length}</Typography>
      <Grid container xs={12} spacing={2}>
        {recipes && users.data ? recipes.data.map((recipe) => {

            let user = users.data.find(user => user._id === recipe.userId)
            
            return (
              <Grid item lg={3} m={6}>
                <Paper
                  key={recipe.id}
                  elevation={2}
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 30,
                  }}
                >
                  <Images images={recipe.image} />
                  <div style={{ padding: 20 }}>
                    <div>
                      <Typography variant="subtitle">{recipe.name}</Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle">
                        {t("created_at")}: {recipe.createdAt.slice(0, 10)}
                      </Typography>
                    </div>
                    <div>
                    <img style={{ width: 50, height: 50, borderRadius: 500,objectFit: 'cover' }} src={user.avatar} />
                    </div>
                    <Button
                      endIcon={<VisibilityIcon />}
                      style={{
                        marginTop: 50,
                        backgroundColor: "#FF7B00",
                        color: "#FFF",
                        textTransform: 'capitalize'
                      }}
                      variant="contained"
                      onClick={() => {
                        navigate(`Recipe/${recipe._id}`);
                      }}
                    >
                      {t("view_recipes")}
                    </Button>
                  </div>
                </Paper>
              </Grid>
            );
          }) : null}
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
