import ResourceManager from "../ResourceManager.jsx";
import { editApplicant, deleteApplicant } from "../../lib/api.js";

function ManageApplicants() {
  return (
    <ResourceManager
      title="Job Applicants"
      description="Everyone who applied through the Careers page, in real time."
      collection="applicants"
      columns={["name", "email", "phone", "jobTitle", "status"]}
      fields={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "jobTitle", label: "Applied for" },
        { key: "status", label: "Status", type: "select", options: ["New", "Reviewed", "Interviewing", "Hired", "Rejected"] },
        { key: "message", label: "Message", type: "textarea" },
      ]}
      onCreate={() => {}}
      onUpdate={editApplicant}
      onDelete={deleteApplicant}
      enableReply
    />
  );
}

export default ManageApplicants;