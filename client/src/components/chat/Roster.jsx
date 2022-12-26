import { v4 as uuid } from "uuid"

const Roster = ({ team }) => {
  //const teamMembers = team.members?.map((member) => <li key={uuid()}>{member}</li>)
  return (
    <div className="team-roster">
      {/* <h3>TEAM</h3> */}
      {/* <ul>{teamMembers}</ul> */}
      {/* <h3>SPY MASTER</h3> */}
      {/* <p>{team.spymaster}</p> */}
    </div>
  )
}

export default Roster
