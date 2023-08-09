import React, { useState } from "react";
import auth from "../auth/auth.helper";
import { remove } from "./api-user";
import { Navigate, useParams } from "react-router";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { Delete } from "@material-ui/icons"

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const { userId } = useParams()

  const clickButton = () => {
    setOpen(true)
  }

  const handleRequestClose = () => {
    setOpen(false)
  }

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: props.userId
    }, {
      t: jwt.token
    }).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => {
          console.log("Deleted")
        })
        setRedirect(true)
      }
    })
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secundary">
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to Deletew your Account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">Cancel</Button>
          <Button onClick={deleteAccount} autoFocus="autoFocus">Confirm</Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
