"use client";
import { useState } from "react";

export default function RatingSelect({ option }) {
  const [selectedOption, setSelectedOption] = useState(option);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <select id="rating" name="rating" value={selectedOption} onChange={handleChange} required>
      <option value="10">10</option>
      <option value="9">9</option>
      <option value="8">8</option>
      <option value="7">7</option>
      <option value="6">6</option>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
  );
}
