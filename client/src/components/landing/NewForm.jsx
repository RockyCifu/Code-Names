import { useState } from "react"
import useForm from "../../hooks/useForm.jsx"

const initialState = {
  roomName: "",
}

const NewForm = ({ handleNewRoom }) => {
  const [errors, setErrors] = useState(initialState)

  const isValid = (values) => {
    values.roomName !== ""
      ? setErrors((prev) => initialState)
      : setErrors((prev) => ({ ...prev, roomName: "Please Enter a Room Name" }))
    return values.roomName !== "" ? true : false
  }

  const submitHandler = (values) => {
    if (isValid(values)) {
      handleNewRoom(values.roomName)
    }
  }

  const { values, handleChange, handleSubmit } = useForm(initialState, submitHandler)

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Room</h2>
      <div className="landing-input-container">
        <input
          name="roomName"
          type="text"
          placeholder="-- Enter a Room Name --"
          onChange={handleChange}
          value={values.roomName}
        />
        <input type="submit" value="Create" />
      </div>
      {errors.roomName && <p className="error">{errors.roomName}</p>}
    </form>
  )
}

export default NewForm
