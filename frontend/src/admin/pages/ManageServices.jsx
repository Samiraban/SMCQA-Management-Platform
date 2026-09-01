import ResourceManager from "../ResourceManager.jsx";
import {
  createService,
  editService,
  deleteService,
} from "../../lib/api.js";

function ManageServices() {
  return (
    <ResourceManager
      title="Manage Services"
      description="These show up live on the Services page and homepage. Add sub-categories (e.g. Front Office, Culinary under Hospitality) and manage the photo gallery shown on each service's detail page."
      collection="services"
      columns={[
        "image",
        "number",
        "title",
        "icon",
        "subcategories",
      ]}
      fields={[
        {
          key: "image",
          label: "Card Photo (optional — leave blank for an auto-picked stock photo)",
          type: "image",
        },

        {
          key: "number",
          label: "Number (e.g. 01)",
          required: true,
        },

        {
          key: "title",
          label: "Title",
          required: true,
        },

        {
          key: "description",
          label: "Description",
          type: "textarea",
          required: true,
        },

        {
          key: "icon",
          label: "Icon",
          type: "icon",
          placeholder: "e.g. Hotel, Plane, ChefHat, Building2",
          helpText:
            "Type any valid Lucide React icon name, or upload your own icon image.",
        },

        {
          key: "gallery",
          label: "Photo Gallery (shown on this service's detail page)",
          type: "gallery",
          helpText:
            "Upload photos from your computer. Add as many as you like, and remove any with the X.",
        },

        {
          key: "subcategories",
          label: "Sub-Categories",
          type: "repeater",
          addLabel: "Add sub-category",
          helpText:
            "e.g. for Construction: Site Labour, Skilled Trades, Site Supervisors.",
          itemFields: [
            {
              key: "title",
              label: "Sub-category name",
            },
            {
              key: "description",
              label: "Short description (optional)",
              type: "textarea",
            },
          ],
        },
      ]}
      onCreate={createService}
      onUpdate={editService}
      onDelete={deleteService}
    />
  );
}

export default ManageServices;