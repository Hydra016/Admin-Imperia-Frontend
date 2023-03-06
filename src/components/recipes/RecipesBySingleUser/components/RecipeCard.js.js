import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    Button,
  } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

function RecipeCard({ recipe }) {   
    const { t } = useTranslation()

  return (
    <Paper
      key={recipe.id}
      elevation={2}
      style={{
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 30,
      }}
    >
      <img style={{ height: 300, width: 400, objectFit: 'cover' }} src={recipe.image[0]} />
      <div style={{ padding: 20 }}>
      <div style={{ textTransform: 'capitalize' ,fontSize: 20, fontWeight: 600 }}>
          <span>{recipe.name}</span>
        </div>
        <div>
          <span style={{ fontSize: 12 }}>
            {t("created_at")}: {recipe.createdAt.slice(0, 10)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Link style={{ all: 'unset' }} to={`/Dashboard/Recipe/${recipe._id}`}>
          <Button
            endIcon={<VisibilityIcon />}
            style={{
              marginTop: 50,
              color: "#FF7B00",
              borderColor: "#FF7B00",
              textTransform: "capitalize",
            }}
            variant="outlined"
          >
            {t("view_recipes")}
          </Button>
          </Link>
        </div>
      </div>
    </Paper>
  );
}

export default RecipeCard;
