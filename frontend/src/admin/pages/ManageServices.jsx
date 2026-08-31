import ResourceManager from "../ResourceManager.jsx";
import { createService, editService, deleteService } from "../../lib/api.js";

function ManageServices() {
  return (
    <ResourceManager
      title="Manage Services"
      description="These show up live on the Services page and homepage."
      collection="services"
      columns={["image", "number", "title", "icon"]}
      fields={[
        { key: "image", label: "Photo (optional — leave blank for an auto-picked stock photo)", type: "image" },
        { key: "number", label: "Number (e.g. 01)", required: true },
        { key: "title", label: "Title", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "icon", label: "Icon", type: "text", placeholder: "e.g. Building2", helpText: "Type any icon name from lucide.dev/icons" },
      ]}
      onCreate={createService}
      onUpdate={editService}
      onDelete={deleteService}
    />
  );
}

export default ManageServices;