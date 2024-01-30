import { useNavigate } from "react-router-dom";
import fungi from "../services/fungi";
import { useState } from "react";

export default function NewFungus({ allFungi, addFungus }) {
  const [variety, setVariety] = useState("");
  const [poisonous, setPoisonous] = useState(false);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleAddFungus = async (event) => {
    event.preventDefault();
    try {
      // const data = new FormData();
      // data.append("variety", variety);
      // data.append("poisonous", poisonous);
      // data.append("description", description);
      // data.append("city", city);
      // data.append("country", country);
      const data = {
        variety,
        poisonous,
        description,
        city,
        country,
      };

      const newFungus = await fungi.addNew(data);
      addFungus([...allFungi, { ...newFungus }]);

      setVariety("");
      setPoisonous(false);
      setDescription("");
      setCity("");
      setCountry("");
    } catch (error) {
      console.log("Error during creating new fungus", error);
    }
  };
  const navigateToAll = () => {
    navigate(`/fungi`);
  };

  return (
    <>
      <form onSubmit={handleAddFungus}>
        <input
          type="text"
          placeholder="variety"
          name="variety"
          value={variety}
          onChange={({ target }) => setVariety(target.value)}
        ></input>
        <select
          name="poisonous"
          onChange={({ target }) => setPoisonous(target.value)}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <input
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></input>
        <input
          type="text"
          placeholder="city"
          name="city"
          value={city}
          onChange={({ target }) => setCity(target.value)}
        ></input>
        <input
          type="text"
          placeholder="country"
          name="country"
          value={country}
          onChange={({ target }) => setCountry(target.value)}
        ></input>
        <button>Add</button>
      </form>
      <button onClick={navigateToAll}>Back to all</button>
    </>
  );
}
