import { Link } from "react-router-dom";
import "./App.css";

function Card({ name, imageUrl, page, theme, bgColor }) {
  return (
    <Link to={page} className="card_link">
      <div className={`card ${theme}`} style={{ backgroundColor: bgColor }}>
        <p className="card_title">{name}</p>
        <img src={imageUrl} alt={`${name} preview`} className="card_image" />
      </div>
    </Link>
  );
}

export default Card;
