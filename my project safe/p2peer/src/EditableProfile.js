import React, { useRef, useEffect, useState } from "react";
import "./editableprofile.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Popup from "reactjs-popup";
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
    minWidth: 400,
  },
});

function createData(sep, desc) {
  return { sep, desc };
}

function EditableProfile() {
  const classes = useStyles();
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
  const [loading, setLoading] = useState(false);
  //   alert(profileID);
  const view = useRef();
  useEffect(() => {
    view.current.scrollIntoView();
  }, []);
  const rows = [
    createData("Fullname", fullname),
    createData("Email", email),
    createData("Username", username),
    createData(
      "Mobile",
      <InputBase
        onChange={(e) => {
          setMobile(e.target.value);
        }}
        defaultValue={mobile}
        id="input__profile__mobile"
        placeholder="xxxxxxx"
        inputProps={{ "aria-label": "naked" }}
      />
    ),
    createData(
      "Address",
      <InputBase
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        defaultValue={address}
        id="input__profile__address"
        placeholder="xxxxxxx"
        inputProps={{ "aria-label": "naked" }}
      />
    ),
  ];
  useEffect(async () => {
    await api
      .get("/user/userinformations/findbyid/" + localStorage.getItem("id"))
      .then((docs) => {
        if (docs.data == null) console.log("null");
        setCurrentProfile(docs.data);
      });
    await api
      .get("/user/findbyid/" + localStorage.getItem("id"))
      .then((docs) => {
        console.log(docs);
        setFullname(docs.data.user.fullname);
        seturlpic(docs.data.user.profilePic);
        setUsername(docs.data.user.username);
        setEmail(docs.data.user.email);
        setLoading(true);
      });
  }, []);
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
  async function updateAction1() {
    var userinfo = {
      address,
      facebook,
      linkedin,
      bio,
      website,
      mobile,
      github,
      title,
      userid: localStorage.getItem("id"),
    };

    await api
      .post("/user/userinformation/update/" + id, userinfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async function updateAction2() {
    var userfullnameimg = {
      profilePic: urlpic,
      fullname,
    };
    await api
      .post(
        "/user/updateimgfullname/" + localStorage.getItem("id"),
        userfullnameimg
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="editableeditableprofile__container" ref={view}>
      {loading && (
        <div className="editableprofile__body">
          <div className="editableprofile__leftside">
            <div className="editableprofile__topleftside">
              <div className="editableprofile__pic">
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const enteredurl = prompt("Put a url for pic");
                    /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/.test(
                      enteredurl
                    ) && seturlpic(enteredurl);
                  }}
                  alt="Remy Sharp"
                  src={urlpic}
                  className="editableprofile__pic__avatar"
                />
              </div>
              <div className="editableprofile__fullname">
                <InputBase
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  id="input__profile__fullname"
                  style={{ textAlign: "center !important" }}
                  defaultValue={fullname}
                  placeholder="Fullname"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
              <div className="editableprofile__title">
                <InputBase
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  id="input__profile__title"
                  defaultValue={title}
                  placeholder="Your title"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
            </div>
            <div className="editableprofile__bottomleftside">
              <div className="editableprofile__website">
                <LanguageIcon />
                <InputBase
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                  style={{ textAlign: "center !important" }}
                  defaultValue={website}
                  placeholder="Website"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
              <div className="editableprofile__linkedin">
                <LinkedInIcon />
                <InputBase
                  onChange={(e) => {
                    setLinkedin(e.target.value);
                  }}
                  style={{ textAlign: "center !important" }}
                  defaultValue={linkedin}
                  placeholder="Website"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
              <div className="editableprofile__github">
                <GitHubIcon />
                <InputBase
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                  style={{ textAlign: "center !important" }}
                  defaultValue={github}
                  placeholder="Website"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
              <div className="editableprofile__facebook">
                <FacebookIcon />
                <InputBase
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
                  style={{ textAlign: "center !important" }}
                  defaultValue={facebook}
                  placeholder="Website"
                  inputProps={{ "aria-label": "naked" }}
                />
              </div>
            </div>
          </div>
          <div className="editableprofile__righttside">
            <div className="editableprofile__toprightside">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map((row, key) => (
                      <TableRow key={key}>
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
            <div className="editableprofile__bottomrightside">
              <InputBase
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                style={{ textAlign: "center !important" }}
                defaultValue={bio}
                placeholder="Bio."
                inputProps={{ "aria-label": "naked" }}
              />
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          updateAction2();
          updateAction1();
        }}
      >
        submit
      </button>
    </div>
  );
}

export default EditableProfile;
