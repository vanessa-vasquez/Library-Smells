import { React, useState } from 'react';
import '../styles/Descriptors.css';
import { database } from '../firebase.js'; 
import { ref, set, get, child, update } from "firebase/database";
import { Alert } from 'react-bootstrap'; 

export default function AddDescriptor(props) {
  const library = props.library;
  const setDescriptors = props.setDescriptors;
  const [word, setWord] = useState(""); 
  const [added, setAdded] = useState(""); 
  const [error, setError] = useState(false); 

  const {
    REACT_APP_SG_API_USER, 
    REACT_APP_SG_API_SECRET, 
  } = process.env;

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setAdded(""); 

    if (word == null) {
      return setError(true);
    }

    const axios = require('axios');
    const FormData = require('form-data');

    let data = new FormData();
    data.append('text', word);
    data.append('lang', 'en');
    data.append('opt_countries', 'us,gb,fr');
    data.append('mode', 'standard');
    data.append('api_user', REACT_APP_SG_API_USER);
    data.append('api_secret', REACT_APP_SG_API_SECRET);

    axios({
      url: 'https://api.sightengine.com/1.0/text/check.json',
      method:'post',
      data: data
    })
    .then(function (response) {
      // on success: handle response
      let feedback = response.data;
      
      let link = feedback["link"]["matches"];
      let personal = feedback["personal"]["matches"];
      let profanity = feedback["profanity"]["matches"]; 

      if (link.length != 0 || personal.length != 0){
        return setError(true);
      }

      if (profanity.length != 0){
        for (let i = 0; i < profanity.length; i++){
          let type = profanity[i]["type"];
          let intensity = profanity[i]["intensity"];

          if (type != "sexual" && (intensity == "medium" || intensity == "high")){
            return setError(true);
          }
        }
      }

      get(child(ref(database), `descriptors/${library}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let descriptors = snapshot.val(); 
  
          descriptors = {
              ...descriptors,
              [word]: 0
          }

          setDescriptors(descriptors); 
          console.log("Add Descriptor")

          update(ref(database, `descriptors/${library}`), {
            [word]: 0
          });
        } else {
            set(ref(database, `descriptors/${library}`), {
                [word]: 0
            });

            setDescriptors({[word]: 0});
        }

        setWord(""); 
        setAdded("Descriptor successfully added!");
      }).catch((error) => {
        console.error(error);
      });
    })
    .catch(function (error) {
      // handle error
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    });
  }

  return (
    <>
      <form id="add-descriptor" onSubmit={e => handleSubmit(e)}>
          <input type="text" id="descriptor" value={word} onChange={e => setWord(e.target.value)} 
          placeholder="Add a descriptor to the list" />
      </form>
      {added && <Alert variant="success">{added}</Alert>}
      {error && <Alert variant="danger">Invalid or inappropriate content was detected. 
      Please enter another descriptor.</Alert>}
    </>
  )
}
