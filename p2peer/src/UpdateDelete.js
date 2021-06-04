import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Popup from "reactjs-popup";

import "./updatedelete.css";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";
import api from "./api";

const columns = [
  { id: "icon", label: "Icon" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "price", label: "Price" },
  { id: "visibility", label: "Visibility" },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "likes", label: "Likes" },
  { id: "status", label: "Status" },

  {
    id: "actions",
    label: "Actions",
  },
];

function createData(
  icon,
  name,
  description,
  visibility,
  price,
  likes,
  date,
  status,
  actions
) {
  return {
    icon,
    name,
    description,
    visibility,
    price,
    likes,
    date,
    actions,
    status,
  };
}

const useStyles = makeStyles({
  root: {
    width: "80vw",
  },
  container: {
    maxHeight: 440,
  },
});

export default function UpdateDelete() {
  const classes = useStyles();
  const [opentrigger, setOpentrigger] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rooms, setRooms] = useState();
  const [firstrun, setFirstrun] = useState(false);
  const [filtredrooms, setFiltredrooms] = useState();
  const [initializeRows, setInitializeRows] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [rows, setrows] = useState();
  const [loading, setLoading] = useState(true);
  const [searchkey, setSearchkey] = useState("");
  const [blur, setBlur] = useState(false);
  //fetchdata
  useEffect(async () => {
    await api
      .get("room/findbyowner/" + localStorage.getItem("id"))
      .then((res) => {
        setRooms(res.data.rooms.items);
        initializeRow(res.data.rooms.items);
        !firstrun && setFirstrun(true);
      });
  }, []);

  async function initializeRow(docs) {
    var insertedrows = [];
    await docs.map((row) => {
      insertedrows.push(
        createData(
          <img src={row.bannerUrl} style={{ height: "50px", width: "50px" }} />,
          row.name,
          <div>
            <p className="updatedelete__textDescription">{row.description}</p>
          </div>,
          row.isPublic ? "Public" : "Private",
          row.price == 0 ? "Free" : row.price,
          row.subscriptions.length + " Likes",
          <p style={{ fontSize: 12 }}>{row.Horaire.replace("T", " at ")}</p>,
          row.isLive ? "Live" : "--",
          <div style={{ display: "flex" }}>
            <Popup
              open={opentrigger}
              trigger={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpentrigger(!opentrigger);
                    setBlur(true);
                  }}
                >
                  <EditIcon />
                </Button>
              }
              position="left center"
            >
              <div>
                <UpdateRoom room={row} Setontrigger={setOpentrigger} />
              </div>
            </Popup>
            <Popup
              open={opentrigger}
              trigger={
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setOpentrigger(!opentrigger);
                    setBlur(true);
                  }}
                >
                  <DeleteIcon />
                </Button>
              }
              position="left center"
            >
              <div>
                <DeleteRoom room={row} Setontrigger={setOpentrigger} />
              </div>
            </Popup>
          </div>
        )
      );
    });
    setrows(insertedrows);
    setLoading(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function handleSearch() {
    initializeRow(rooms.filter((val) => val.name.startsWith(searchkey)));
    if (rooms.filter((val) => val.name.startsWith(searchkey)).length < 1) {
      alert("0 rooms contains keyword:" + searchkey);
      initializeRow(rooms);
      setSearchkey("");
    }
  }
  return (
    <div>
      {loading && (
        <div id="diplayrooms__loader">
          <Loader
            type="Bars"
            color="#344955c7"
            height={100}
            width={100}
            timeout={4000} //3 secs
          />
        </div>
      )}
      {!loading && (
        <Paper
          className={classes.root}
          style={{ filter: blur && "blur(10px)" }}
        >
          <div>
            <TableContainer
              className={classes.container}
              style={{ overflow: "hidden" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="updatedelete__searchsection">
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label={<small>Search field</small>}
                  value={searchkey}
                  style={{
                    marginTop: -10,
                    borderRadius: 10,
                    marginLeft: 5,
                  }}
                  onChange={(e) => {
                    if (e.target.value === "") initializeRow(rooms);
                    setSearchkey(e.target.value);
                  }}
                  InputProps={
                    {
                      //   startAdornment: <AccountCircle />,
                    }
                  }
                />

                <Button
                  style={{ marginTop: 2 }}
                  onClick={() => {
                    searchkey.length > 0 && handleSearch();
                  }}
                  variant="outlined"
                >
                  <AccountCircle />
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                }}
              >
                <small
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  Total: {rows.length}
                </small>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
}
