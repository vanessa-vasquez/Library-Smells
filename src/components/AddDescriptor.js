import { React, useState } from "react";
import "../styles/Descriptors.css";
import { database } from "../firebase.js";
import { ref, set, get, child, update } from "firebase/database";
import { Alert } from "react-bootstrap";

export default function AddDescriptor({ library, setDescriptors }) {
  const [word, setWord] = useState("");
  const [added, setAdded] = useState("");
  const [error, setError] = useState("");

  const { REACT_APP_SG_API_USER, REACT_APP_SG_API_SECRET } = process.env;

  const doesDescriptorExist = async (word) => {
    const snapshot = await get(
      child(ref(database), `descriptors/${library}/${word}`)
    );

    if (snapshot.exists()) {
      setError(
        "The descriptor you entered already exists. Please enter another descriptor."
      );
      return true;
    }

    return false;
  };

  const isDescriptorInvalid = (response) => {
    let feedback = response.data;

    let link = feedback["link"]["matches"];
    let personal = feedback["personal"]["matches"];
    let profanity = feedback["profanity"]["matches"];

    if (link.length !== 0 || personal.length !== 0) {
      setError(
        "Inappropriate content was detected. Please enter another descriptor."
      );
      return true;
    }

    if (profanity.length !== 0) {
      for (let i = 0; i < profanity.length; i++) {
        let type = profanity[i]["type"];
        let intensity = profanity[i]["intensity"];

        if (
          type !== "sexual" &&
          (intensity === "medium" || intensity === "high")
        ) {
          setError(
            "Inappropriate content was detected. Please enter another descriptor."
          );
          return true;
        }
      }
    }
  };

  const addToDatabase = async (word) => {
    const snapshot = await get(child(ref(database), `descriptors/${library}`));

    if (snapshot.exists()) {
      let descriptors = snapshot.val();

      descriptors = {
        ...descriptors,
        [word]: 0,
      };

      setDescriptors(descriptors);

      update(ref(database, `descriptors/${library}`), {
        [word]: 0,
      });
    } else {
      set(ref(database, `descriptors/${library}`), {
        [word]: 0,
      });

      setDescriptors({ [word]: 0 });
    }

    setWord("");
    setAdded("Descriptor successfully added!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setAdded("");

    if (word == null) {
      return setError("No descriptor was detected. Please enter a descriptor.");
    }

    const axios = require("axios");
    const FormData = require("form-data");

    let data = new FormData();
    data.append("text", word);
    data.append("lang", "en");
    data.append("opt_countries", "us,gb,fr");
    data.append("mode", "standard");
    data.append("api_user", REACT_APP_SG_API_USER);
    data.append("api_secret", REACT_APP_SG_API_SECRET);

    const response = await axios({
      url: "https://api.sightengine.com/1.0/text/check.json",
      method: "post",
      data: data,
    });

    if (isDescriptorInvalid(response)) {
      return;
    }

    if (await doesDescriptorExist(word)) {
      return;
    }

    addToDatabase(word);
  };

  return (
    <>
      <form id="add-descriptor" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          id="descriptor"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Add a descriptor to the list"
        />
      </form>
      {added && <Alert variant="success">{added}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
