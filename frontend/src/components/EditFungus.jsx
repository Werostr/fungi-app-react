import fungi from "../services/fungi";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditFungus({ editFungus }) {
  const id = useParams().id;
  const [variety, setVariety] = useState("");
  const [poisonous, setPoisonous] = useState(null);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fungi
      .getOneById(id)
      .then((foundFungus) => {
        setVariety(foundFungus.variety);
        setPoisonous(foundFungus.poisonous);
        setDescription(foundFungus.description);
        setCity(foundFungus.city);
        setCountry(foundFungus.country);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditFungus = async (event) => {
    event.preventDefault();
    try {
      const data = {
        variety,
        poisonous,
        description,
        city,
        country,
      };
      const editedFungus = await fungi.updateOne(data, id);
      editFungus(editedFungus);
    } catch (error) {
      console.log("Error during creating new fungus", error);
    }
  };

  return (
    <>
      <form onSubmit={handleEditFungus}>
        <input
          type="text"
          name="variety"
          value={variety}
          onChange={({ target }) => setVariety(target.value)}
        ></input>
        <select
          name="poisonous"
          value={poisonous}
          onChange={({ target }) => setPoisonous(target.value)}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <input
          type="text"
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></input>
        <input
          type="text"
          name="city"
          value={city}
          onChange={({ target }) => setCity(target.value)}
        ></input>
        <input
          type="text"
          name="country"
          value={country}
          onChange={({ target }) => setCountry(target.value)}
        ></input>
        <button>Save</button>
      </form>
    </>
  );
}
