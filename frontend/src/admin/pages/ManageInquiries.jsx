import ResourceManager from "../ResourceManager.jsx";
import { editInquiry, deleteInquiry } from "../../lib/api.js";

function ManageInquiries() {
  return (
    <ResourceManager
      title="Contact Inquiries"
      description="Messages submitted through the Contact form, live as they arrive."
      collection="inquiries"
            columns={["name", "email", "phone", "subject", "status"]}
      fields={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Message", type: "textarea" },
        { key: "status", label: "Status", type: "select", options: ["New", "In Progress", "Resolved"] },
      ]}
      onCreate={() => {}}
      onUpdate={editInquiry}
      onDelete={deleteInquiry}
    />
  );
}

export default ManageInquiries;
