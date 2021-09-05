import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

function Meal() {
  return (
    <>
      <MealsSummary></MealsSummary>
      <AvailableMeals></AvailableMeals>
    </>
  );
}

export default Meal;
