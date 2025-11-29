import { useState } from "react";
import "./ColourPicker.css";

function ColourPicker() {
  const [colour, setColour] = useState("#ffffff");

  function handleColourChange(event) {
    setColour(event.target.value);
  }

  return (
    <div className="main_container">
      <h1>Colour Picker</h1>
      <div className="colour_container" style={{ backgroundColor: colour }}>
        <p>Selected Colour: {colour}</p>
      </div>
      <label htmlFor="colourInput">Choose a colour: </label>
      <input
        type="color"
        id="colourInput"
        value={colour}
        onChange={handleColourChange}
      />
    </div>
  );
}

export default ColourPicker;