import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import VideocamOffRoundedIcon from "@material-ui/icons/VideocamOffRounded";
import MoneyOffRoundedIcon from "@material-ui/icons/MoneyOffRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import api from "./api";
import "./roomcard.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 310,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[300],
  },
}));
function RoomCard({
  room,
  owner,
  changesub,
  Setchange,
  SettabNumber,
  isFavorite,
  rooms,
  SetFiltredrooms,
  Fav,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [live, setLive] = useState(true);
  const [isSub, setisSub] = useState(isFavorite);
  const history = useHistory();

  if (room.bannerUrl == null)
    room.bannerUrl =
      "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-512.png";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function getSub() {
      await api
        .post("/room/issub/" + room._id, { id: localStorage.getItem("id") })
        .then((res) => {
          setisSub(res.data.find);
        });
    }
    getSub();
  }, [isSub]);

  async function subscribe() {
    setisSub(true);
    // SettabNumber(2);
    await api
      .post("/room/subscribe/" + room._id, {
        sub: localStorage.getItem("id"),
      })
      .then((res) => {
        setisSub(true);
      });
    console.log("subscribed to " + room._id);
    Setchange(!changesub);
  }
  async function unsubscribe() {
    Fav && SetFiltredrooms(rooms.filter((val) => val._id != room._id));
    await api
      .post("/room/unsubscribe/" + room._id, {
        sub: localStorage.getItem("id"),
      })
      .then((res) => {
        setisSub(false);
      });
    console.log("unsubscribed to " + room._id);
    Setchange(!changesub);
  }
  function goToRoom() {
    history.push({
      pathname: "/preparing",

      state: { room, owner },
    });
  }
  return (
    <div className="roomcard__container">
      {room._id}
      <Card id="a1" className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open("/profile/" + owner._id, "_blank").focus();
              }}
              aria-label="recipe"
              className={classes.avatar}
              src=""
            >
              {/* W */}

              {owner != undefined && owner.fullname[0]}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                window.open("/profile/" + owner._id, "_blank").focus();
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={room.name}
          subheader={room.Horaire}
        />

        <CardMedia
          className={classes.media}
          image={room.bannerUrl}
          title="Wissem rouabeh"
          style={{ cursor: "pointer" }}
          onClick={() => {
            goToRoom();
          }}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component={"div"}>
            {room.description}

            <Typography component={"div"}>{room.description}</Typography>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Subscribe"
            onClick={() => {
              // alert(room._id);
              !isSub && subscribe();
              isSub && unsubscribe();
            }}
          >
            <small
              style={{
                fontSize: "0.9rem",
                color: isSub && "#E57373",
              }}
            >
              {isSub ? "Unsubscribe" : "Subscribe"}
              {isSub}
            </small>
            <FavoriteIcon style={{ color: isSub ? "#E57373" : "#ABABAB" }} />
          </IconButton>
          <IconButton
            aria-label="join"
            onClick={() => {
              room.isLive && goToRoom();
            }}
          >
            {/* {live ? 
            (<small style={{ fontSize: "1rem" }}>Join</small>
            <VideocamRoundedIcon />) : (<VideocamOffRoundedIcon/>)} */}

            {room.isLive && (
              <VideocamRoundedIcon
                style={{ color: room.isLive && "#E57373" }}
              />
            )}

            {!room.isLive && <VideocamOffRoundedIcon />}
          </IconButton>

          <IconButton aria-label="payable">
            {!room.isFree ? (
              <MonetizationOnOutlinedIcon />
            ) : (
              <MoneyOffRoundedIcon />
            )}
            {!room.isFree && (
              <small style={{ fontSize: "11px" }}>{room.price}</small>
            )}
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component={"div"}>{room.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default RoomCard;
