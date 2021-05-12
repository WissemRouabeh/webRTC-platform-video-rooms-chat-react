import React, { useState, useEffect } from "react";
import "../displayrooms.css";
import RoomCard from "../RoomCard.js";
import Loader from "react-loader-spinner";
import api from "../api";

function Mine() {
  const [tabNumber, settabNumber] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [filtredrooms, setFiltredrooms] = useState([]);
  const [rd, setRd] = useState(false);
  const [firstrun, setFirstrun] = useState(false);
  const [changesub, setChangesub] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    // setLoading(true);
    await api.get("room/allrooms").then((res) => {
      setLoading(false);
      setRooms(res.data.docs);
      !firstrun && setFirstrun(true);
    });
  }, []);
  useEffect(() => {
    // !loading &&
    //   setFiltredrooms(
    //     rooms.filter((val) => val.owner._id === localStorage.getItem("id"))
    //   );

    setFiltredrooms(
      rooms.filter((val) => val.owner._id === localStorage.getItem("id"))
    );
  }, [firstrun]);

  return (
    <div className="displayrooms__body">
      {loading && (
        <div id="diplayrooms__loader">
          <Loader
            type="Bars"
            color="#344955c7"
            height={100}
            width={100}
            timeout={5000} //3 secs
          />
        </div>
      )}
      {filtredrooms.map((room) => (
        <RoomCard
          key={room._id}
          room={room}
          owner={room.owner}
          change={changesub}
          Setchange={setChangesub}
          SettabNumber={settabNumber}
          Setrd={setRd}
          rd={false}
        />
      ))}
    </div>
  );
}

export default Mine;
