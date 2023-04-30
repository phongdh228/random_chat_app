import React from "react";
import { Formik, Form, Field } from "formik";

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

  const initialValues = {
    hobbies: []
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values.hobbies); //values.hobbies print out array of hobbies
    const selectedHobbies = hobbiesList.map(hobby => values.hobbies.includes(hobby) ? 1 : 0);
    console.log(selectedHobbies);
    //var old_user_informations = localStorage.getItem('user_informations')

    //(23) [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0]
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

