import ResourceManager from "../ResourceManager.jsx";
import { createService, editService, deleteService } from "../../lib/api.js";

const ICONS = ["Building2", "BriefcaseBusiness", "UserRound", "Users", "ShieldCheck", "Globe2", "Briefcase"];

function ManageServices() {
  return (
    <ResourceManager
      title="Manage Services"
      description="These show up live on the Services page and homepage."
      collection="services"
      columns={["number", "title", "icon"]}
      fields={[
        { key: "number", label: "Number (e.g. 01)", required: true },
        { key: "title", label: "Title", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "icon", label: "Icon", type: "select", options: ICONS },
      ]}
      onCreate={createService}
      onUpdate={editService}
      onDelete={deleteService}
    />
  );
}

export default ManageServices;
