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
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import auth from "../auth/auth.helper";
import { read } from "./api-user";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `10px`,
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
}));

export default function Profile({ match }) {
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
      signal
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
  console.log("match: ", match);
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
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
