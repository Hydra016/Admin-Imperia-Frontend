import React, { useEffect } from "react";
import { useStyles } from "../../../../hooks/useStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useBase64 } from "../../../../hooks/useBase64";

function FileUpload({ recipe, setRecipe }) {
     const { handleCreateBase64, logo, handleDeleteFiles } = useBase64([]);
const { t } = useTranslation()

useEffect(() => {
    setRecipe({ ...recipe, image: logo });
  }, [logo]);

const { 
    inputContainer,
    inputButton,
    inputIcon,
    inputMainContainer,
    inputFiles,
    uploadImage, 
    } = useStyles()

  return (
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
          <CloudUploadIcon style={{ fontSize: 50, fill: "#FF7B00" }} />
          <Typography variant="subtitle">{t("upload_files")}</Typography>
        </div>
      </div>
      <div className={inputFiles}>
        {logo &&
          logo.map((img) => {
            return (
              <div className={uploadImage}>
                  <img src={img} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 10 }} />
                  <IconButton onClick={() => handleDeleteFiles(img)}>
                    <DeleteIcon />
                  </IconButton>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FileUpload;
