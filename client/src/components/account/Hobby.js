import React from "react";
import {useNavigate} from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import {profileValidation} from '../../helper/validate';
import { useAuthStore } from '../../store/store';
import { updateUser } from '../../helper/helper';


const hobbiesList = [
  "Reading",
  "Writing",
  "Drawing",
  "Photography",
  "Playing musical instruments",
  "Singing",
  "Dancing",
  "Haging out",
  "Acting",
  "Watching films",
  "Playing games",
  "Playing sports",
  "Hiking",
  "Camping",
  "Fishing",
  "Cooking",
  "Gardening",
  "Traveling",
  "Collecting",
  "Sewing",
  "DIY projects",
  "Yoga and meditation",
  "Attending social activities"
];

export default function Hobby() {
  const navigate = useNavigate();

  const initialValues = {
    hobbies: []
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values.hobbies); //values.hobbies print out array of hobbies
    const selectedHobbies = hobbiesList.map(hobby => values.hobbies.includes(hobby) ? 1 : 0);
    //(23) [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0]
    console.log(selectedHobbies);

    var user_informations = JSON.parse(localStorage.getItem('user_informations'));
    console.log("====user_informations: " + user_informations)
    // console.log(user_informations)
    
    
    user_informations["match_point"] = selectedHobbies;
    console.log("====user_informations: " + JSON.stringify(user_informations));
    
    localStorage.setItem('user_informations', JSON.stringify(user_informations));

    updateUser((user_informations))

    navigate('/home')

  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <h2>Select Hobbies</h2>
          {hobbiesList.map((hobby) => (
            <div key={hobby}>
              <label>
                <Field
                  type="checkbox"
                  name="hobbies"
                  value={hobby}
                  checked={values.hobbies.includes(hobby)}
                  onChange={handleChange}
                />
                {hobby}
              </label>
            </div>
          ))}
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};

