import { useState } from "react";


const District = () => {
    const [districts, setDistricts] = useState([]);
    fetch('/Districs.json') // Assuming districts are in a file named 'Districts.json'
    .then((res) => res.json())
    .then((data) => {
    //   console.log(data); // Log the data to check its structure
      setDistricts(data); // Set the fetched districts in state
    })
    .catch((error) => {
      console.error('Error fetching districts:', error);
    });

    return [districts]
};

export default District;