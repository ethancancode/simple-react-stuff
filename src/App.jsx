import "./App.css";
import { Routes, Route } from "react-router-dom";
import Card from "./Card";
import ColourPicker from "./Colour Picker/ColourPicker";
import colourPickerImg from "./assets/ColourPicker.png";
import ToDoList from "./To-Do List/ToDoList";
import toDoListImg from "./assets/ToDoList.png";

function App() {
  return (
    <Routes>

      {/* Home page */}
      <Route
        path="/"
        element={
          <div className="app_container">
            <h1 className="app_name">Simple React Stuff</h1>
            <p className="app_desc">Stuff I made to practice React</p>
            <div className="cards_container">
              <Card
                name="Colour Picker"
                imageUrl={colourPickerImg}
                page="/colour-picker"
                theme="light"
                bgColor={"#c3c2c2"}
              />
              <Card
                name="To-Do List"
                imageUrl={toDoListImg}
                page="/to-do-list"
                theme="light"
                bgColor={"#f1efef"}
              />
            </div>
          </div>
        }
      />

      {/* Project route */}
      <Route path="/colour-picker" element={<ColourPicker />} />
      <Route path="/to-do-list" element={<ToDoList />} />

    </Routes>
  );
}

export default App;

