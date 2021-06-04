import React from "react";
import "./deleteroom.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import api from "./api";
function DeleteRoom({ room }) {
  async function deleteRoom() {
    await api.delete("room/delete/" + room._id).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="deleteroom__container">
      <p>Are you sure you want to delete?</p>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => {
          deleteRoom();
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteRoom;
