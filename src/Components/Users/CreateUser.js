import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./CreateUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const CreateUser = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [error, setError] = useState();
  
  const createUserhandler = (event) => {
    event.preventDefault();
    if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
      setError({
        title: "Некорректне введення",
        message: "Ці поля не можуть бути порожніми",
      });
      return;
    }
    if (+inputAge < 1) {
      setError({
        title: "Некорректне вік",
        message: "Вік повинен бути більше 0",
      });
      return;
    }

    props.onCreateUser(inputName, inputAge);
    setInputName("");
    setInputAge("");
  };

  const nameChangeHandler = (event) => {
    setInputName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setInputAge(event.target.value);
  };

  const errorHandler = () => {
    setError(false);
  }
  
  return (
    <div>
      {error && (<ErrorModal onCloseModal={errorHandler} title={error.title} message={error.message} />)}
      <Card className={styles.input}>
        <form onSubmit={createUserhandler}>
          <label htmlFor="name">Ім'я</label>
          <input
            id="name"
            type="text"
            onChange={nameChangeHandler}
            value={inputName}
          />
          <label htmlFor="name">Вік</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={inputAge}
          />
          <Button type="submit">Додати користовуча</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateUser;
