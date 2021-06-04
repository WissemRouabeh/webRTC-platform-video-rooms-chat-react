import React, { useRef, useEffect, useState } from "react";
import "./profile.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Popup from "reactjs-popup";
import Loader from "react-loader-spinner";

import InputBase from "@material-ui/core/InputBase";
import api from "./api";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import Paper from "@material-ui/core/Paper";
import Popupmessage from "./Popupmessage";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(sep, desc) {
  return { sep, desc };
}

function Profile(props) {
  const [title, setTitle] = useState();
  const [fullname, setFullname] = useState();
  const [bio, setBio] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [linkedin, setLinkedin] = useState();
  const [facebook, setFacebook] = useState();
  const [github, setGithub] = useState();
  const [website, setWebsite] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [urlpic, seturlpic] = useState(
    "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-512.png"
  );
  const profileID = props.match.params.profileid;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [opentrigger, setOpentrigger] = useState(false);
  const rows = [
    createData("Fullname", fullname),
    createData("Email", email),
    createData("Username", username),
    createData("Mobile", mobile),
    createData("Address", address),
  ];
  function setCurrentProfile(doc) {
    setId(doc._id);
    setAddress(doc.address);
    setFacebook(doc.facebook);
    setLinkedin(doc.linkedin);
    setWebsite(doc.website);
    setGithub(doc.github);
    setMobile(doc.mobile);
    setBio(doc.bio);
    setTitle(doc.title);
  }
  useEffect(async () => {
    await api
      //here's id profile but cluster not readu
      .get("/user/userinformations/findbyid/" + localStorage.getItem("id"))
      .then((docs) => {
        setCurrentProfile(docs.data);
      });
    await api
      .get("/user/findbyid/" + localStorage.getItem("id"))
      .then((docs) => {
        setFullname(docs.data.user.fullname);
        seturlpic(docs.data.user.profilePic);
        setUsername(docs.data.user.username);
        setEmail(docs.data.user.email);
      });
    setLoading(true);
  }, []);
  return (
    <div className="profile__container">
      {!loading && (
        <Loader
          style={{ position: "absolute", left: "45%", top: "40%" }}
          type="Bars"
          color="#344955c7"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {loading && (
        <div className="profile__body">
          <div className="profile__leftside">
            <div className="profile__topleftside">
              <div className="profile__pic">
                <Avatar
                  alt="Remy Sharp"
                  src={urlpic}
                  className="profile__pic__avatar"
                />
              </div>
              <div className="profile__fullname">{fullname}</div>
              <div className="profile__title">{title}</div>
              <div className="profile__sendmsg">
                <Popup
                  open={opentrigger}
                  trigger={
                    <Button
                      id="trigger__message"
                      onClick={() => {
                        setOpentrigger(false);
                      }}
                      variant="contained"
                      size="small"
                      color="primary"
                    >
                      Message
                    </Button>
                  }
                  // modal
                  position="right center"
                >
                  <div>
                    <Popupmessage username={username} profileid={profileID} />
                  </div>
                </Popup>
              </div>
            </div>
            <div className="profile__bottomleftside">
              <div className="profile__website">
                <LanguageIcon />
                {website}
                {/* <InputBase
                placeholder=""
                inputProps={{ "aria-label": "naked" }}
              /> */}
              </div>
              <div className="profile__linkedin">
                <LinkedInIcon />
                {linkedin}
              </div>
              <div className="profile__github">
                <GitHubIcon />
                {github}
              </div>
              <div className="profile__facebook">
                <FacebookIcon />
                {facebook}
              </div>
            </div>
          </div>
          <div className="profile__righttside">
            <div className="profile__toprightside">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">
                          <strong>{row.sep}</strong>
                        </TableCell>
                        <TableCell align="left">{row.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="profile__bottomrightside">{bio}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
