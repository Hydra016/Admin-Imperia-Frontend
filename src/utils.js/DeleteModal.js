import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../features/recipes/recipeSlice";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function DeleteModal({
  openModal,
  setOpenModal,
  ModalHeading,
  ModalText,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal.modalState}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {ModalHeading}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {ModalText}
            </Typography>
            <div style={{ marginTop: 50 }}>
              <Button
                style={{ marginRight: 10, color: '#FFF' }}
                variant="contained"
                onClick={() => {
                  dispatch(
                    deleteRecipe({ id: openModal.id, userId: openModal.userId })
                  );
                  setOpenModal(false);
                }}
              >
                <span style={{ textTransform: "capitalize" }}>{t("yes")}</span>
              </Button>
              <Button
                style={{ color: '#FFF' }}
                variant="contained"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <span style={{ textTransform: "capitalize" }}>{t("no")}</span>
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
