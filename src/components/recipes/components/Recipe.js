import React from "react";
import { Paper, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Recipe({ recipe, user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <img
        style={{ height: 300, width: 400, objectFit: "cover" }}
        src={recipe.image[0]}
      />
      <div style={{ padding: 20 }}>
        <div style={{ textTransform: 'capitalize' ,fontSize: 20, fontWeight: 600 }}>
          <span>{recipe.name}</span>
        </div>
        <div>
          <span style={{ fontSize: 12 }}>
            {t("created_at")}: {recipe.createdAt.slice(0, 10)}
          </span>
        </div>
        <div>
          <span style={{ textTransform: 'capitalize', fontSize: 12 }}>
            {t("created_by")}: {user.name}
          </span>
        </div>
        <div>
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: 500,
              objectFit: "cover",
              marginTop: 20,
              marginBottom: 20,
            }}
            src={user.avatar}
          />
        </div>
        <Button
          endIcon={<VisibilityIcon />}
          style={{
            borderColor: '#FF7B00',
            color: "#FF7B00",
            width: '100%',
            textTransform: "capitalize",
          }}
          variant="outlined"
          onClick={() => {
            navigate(`Recipe/${recipe._id}`);
          }}
        >
          <span>
          {t("view_recipes")}
          </span>
          
        </Button>
      </div>
    </Paper>
  );
}

export default Recipe;
