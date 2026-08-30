import ResourceManager from "../ResourceManager.jsx";
import { createClient, editClient, deleteClient } from "../../lib/api.js";

function ManageClients() {
  return (
    <ResourceManager
      title="Manage Clients"
      description="Shown live on the Clients page."
      collection="clients"
      fields={[
        { key: "name", label: "Client name", required: true },
        { key: "industry", label: "Industry", required: true },
        { key: "logo", label: "Logo image URL", type: "text" },
      ]}
      columns={["name", "industry", "logo"]}
      onCreate={createClient}
      onUpdate={editClient}
      onDelete={deleteClient}
    />
  );
}

export default ManageClients;