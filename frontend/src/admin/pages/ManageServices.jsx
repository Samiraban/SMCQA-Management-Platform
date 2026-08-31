import ResourceManager from "../ResourceManager.jsx";
import { createService, editService, deleteService } from "../../lib/api.js";

// A broad, relevant set of lucide-react icons for HR / recruitment /
// hospitality services. Any valid lucide-react icon name works here —
// Services.jsx resolves the stored string dynamically via `Icons[name]`.
const ICONS = [
  // General business / HR
  "Building2",
  "BriefcaseBusiness",
  "Briefcase",
  "Users",
  "UserRound",
  "UsersRound",
  "UserCheck",
  "UserPlus",
  "Handshake",
  "ClipboardList",
  "ClipboardCheck",
  "FileCheck2",
  "FileText",
  "GraduationCap",
  "Award",
  "Target",
  "TrendingUp",
  "Building",
  "Landmark",

  // Sectors already used on the site
  "ShieldCheck",
  "Globe2",
  "HeartPulse",
  "Stethoscope",
  "HardHat",
  "Hammer",
  "Wrench",
  "Tractor",
  "Wheat",
  "Warehouse",
  "Factory",
  "Truck",
  "ConciergeBell",
  "UtensilsCrossed",
  "BedDouble",
  "Hotel",
  "ChefHat",
  "Store",

  // Support / contact / misc
  "Headphones",
  "Phone",
  "Mail",
  "MapPin",
  "Plane",
  "Ship",
  "Car",
  "Home",
  "Lock",
  "KeyRound",
  "Search",
  "Settings",
  "Calendar",
  "Clock",
  "CheckCircle2",
  "Star",
  "Flag",
  "Compass",
];

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
        { key: "icon", label: "Icon", type: "text-suggest", options: ICONS, placeholder: "e.g. Building2", helpText: "Pick a suggestion or type any icon name from lucide.dev/icons" },
      ]}
      onCreate={createService}
      onUpdate={editService}
      onDelete={deleteService}
    />
  );
}

export default ManageServices;