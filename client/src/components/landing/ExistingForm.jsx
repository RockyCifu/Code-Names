import { useState } from "react"
import useForm from "../../hooks/useForm.jsx"

const initialState = {
  roomID: "",
}

const ExistingForm = ({ handleJoinRoom, rooms }) => {
  const [errors, setErrors] = useState(initialState)

  const isValid = (values) => {
    values.roomID !== ""
      ? setErrors((prev) => initialState)
      : setErrors((prev) => ({ ...prev, roomID: "Please Select a Valid Room" }))
    return values.roomID !== "" ? true : false
  }

  const submitHandler = (values) => {
    if (isValid(values)) {
      handleJoinRoom(values.roomID)
    }
  }

  const { values, handleChange, handleSubmit } = useForm(initialState, submitHandler)

  const options = rooms.map((room) => (
    <option key={room.id} value={room.id}>
      {room.name}
    </option>
  ))

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join an Existing Room</h2>
      <div className="landing-input-container">
        <select name="roomID" onChange={handleChange} value={values.roomID}>
          <option hidden value="">
            -- Select a Room --
          </option>
          {options}
        </select>
        <input type="submit" value="Join" />
      </div>
      {errors.roomID && <p className="error">{errors.roomID}</p>}
    </form>
  )
}

export default ExistingForm
