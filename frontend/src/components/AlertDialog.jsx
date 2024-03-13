import * as React from "react";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function AlertDialog({ open, setOpen, variant }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {variant === "createNew" && "You must be signed in to do that."}
          {variant === "attachImages" && "You must attach at least one photo."}
        </DialogTitle>
        {variant === "createNew" && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you don't have an account you can create it{" "}
                <Link to="/register" onClick={handleClose}>
                  here
                </Link>
                , or you can{" "}
                <Link to="/login" onClick={handleClose}>
                  log in
                </Link>
                .
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            <Close />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
