import ResourceManager from "../ResourceManager.jsx";
import { createTeamMember, editTeamMember, deleteTeamMember } from "../../lib/api.js";

function ManageTeam() {
  return (
    <ResourceManager
      title="Manage Team"
      description="Shown live on the Our Team page."
      collection="team"
      fields={[
        { key: "name", label: "Full name", required: true },
        { key: "role", label: "Role / title", required: true },
      ]}
      onCreate={createTeamMember}
      onUpdate={editTeamMember}
      onDelete={deleteTeamMember}
    />
  );
}

export default ManageTeam;
