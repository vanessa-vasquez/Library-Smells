import React, { useEffect } from "react";
import "../styles/Descriptors.css";
import { database } from "../firebase.js";
import { ref, get, child } from "firebase/database";
import Upvote from "./Upvote";
import Downvote from "./Downvote";

export default function Descriptors(props) {
  const library = props.library;
  const descriptors = props.descriptors;
  const setDescriptors = props.setDescriptors;

  useEffect(() => {
    renderDescriptors();
  }, []);

  const renderDescriptors = () => {
    get(child(ref(database), `descriptors/${library}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDescriptors(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="descriptors-header">Students say it smells...</div>
      <div className="descriptors-list">
        {Object.keys(descriptors).map((word) => {
          return (
            <div className="word" key={word}>
              <div>
                {word} {descriptors[word] >= 0 ? "+" : ""}
                {descriptors[word]}
              </div>
              <div className="thumbs-icons">
                <Upvote
                  word={word}
                  library={library}
                  descriptors={descriptors}
                  setDescriptors={setDescriptors}
                />
                <Downvote
                  word={word}
                  library={library}
                  descriptors={descriptors}
                  setDescriptors={setDescriptors}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
