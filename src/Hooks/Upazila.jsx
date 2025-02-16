import { useState } from "react";


const Upazila = () => {
    const [upazilas, setUpazila] = useState([]);
      // Fetch upazilas from the JSON file in the public folder
      fetch('/Upazila.json')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUpazila(data); // Set the fetched upazilas in state
      })
      .catch((error) => {
        console.error('Error fetching upazilas:', error);
      });
    return [upazilas]
};

export default Upazila;