import ResourceManager from "../ResourceManager.jsx";
import { createTeamMember, editTeamMember, deleteTeamMember } from "../../lib/api.js";

function ManageTeam() {
  return (
    <ResourceManager
      title="Manage Team"
      description="Shown live on the Our Team page."
      collection="team"
      fields={[
        { key: "photo", label: "Photo", type: "image" },
        { key: "name", label: "Full name", required: true },
        { key: "role", label: "Role / title", required: true },
      ]}
      columns={["photo", "name", "role"]}
      onCreate={createTeamMember}
      onUpdate={editTeamMember}
      onDelete={deleteTeamMember}
    />
  );
}

export default ManageTeam;