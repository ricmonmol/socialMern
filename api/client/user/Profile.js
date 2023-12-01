import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import auth from "../auth/auth.helper";
import { read } from "./api-user";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `30px`,
  },
  title: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
}));
export default function Profile() {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const classes = useStyles();
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: userId,
      },
      { t: jwt.token },
      signal,
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        PROFILE
      </Typography>
      <List dense>
        <ListItem>
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
