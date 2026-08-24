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
      ]}
      onCreate={createClient}
      onUpdate={editClient}
      onDelete={deleteClient}
    />
  );
}

export default ManageClients;
