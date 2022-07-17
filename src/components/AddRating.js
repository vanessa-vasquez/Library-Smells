import { React, useEffect, useState } from "react";
import "../styles/AddRating.css";
import { database } from "../firebase.js";
import { ref, get, child, update } from "firebase/database";

export default function AddRating(props) {
  const library = props.name;
  const [rating, setRating] = useState(3);
  const setAvgRating = props.setAvgRating;

  useEffect(() => {
    renderRating();
  }, []);

  const renderRating = () => {
    get(child(ref(database), `libraries/${library}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let ratings = snapshot.val();

          calculateAverage(ratings);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    get(child(ref(database), `libraries/${library}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let ratings = snapshot.val();

          ratings.push(Number(rating));

          calculateAverage(ratings);

          update(ref(database, "libraries/"), {
            [library]: ratings,
          });
        } else {
          update(ref(database, "libraries/"), {
            [library]: [Number(rating)],
          });

          setAvgRating(Number(rating));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("New rating added!");
  };

  const calculateAverage = (ratings) => {
    let sum = 0;

    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i];
    }

    setAvgRating(sum / ratings.length);
  };

  return (
    <>
      <form id="add-rating" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-elements">
          <label htmlFor="rating">Rate the current smell: </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
