import ResourceManager from "../ResourceManager.jsx";
import { createJob, editJob, deleteJob } from "../../lib/api.js";

function ManageJobs() {
  return (
    <ResourceManager
      title="Manage Jobs"
      description="Open roles appear live on the Careers page the moment you save them here."
      collection="jobs"
      columns={["title", "department", "location", "type", "status"]}
      fields={[
        { key: "title", label: "Job title", required: true },
        { key: "department", label: "Department", required: true },
        { key: "location", label: "Location", required: true, default: "Doha, Qatar" },
        { key: "type", label: "Type", type: "select", options: ["Full-time", "Part-time", "Contract"] },
        { key: "status", label: "Status", type: "select", options: ["Open", "Closed"] },
      ]}
      onCreate={createJob}
      onUpdate={editJob}
      onDelete={deleteJob}
    />
  );
}

export default ManageJobs;
