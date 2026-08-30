import { Star, MapPin } from "lucide-react";
import "../styles/Clients.css";

/* ---------------------------------------------------------
   CLIENTS BY COUNTRY
   --------------------------------------------------------- */
const countryClients = [
  {
    country: "UAE",
    clients: [
      "Al Raseef Contracting",
      "Al Hussain General Contracting",
      "Alam Group of Companies",
      "Rak Security Company",
      "AJ Security and Safety Consultant",
      "Trust Security Services",
      "ILF Consulting Engineers",
      "Royal International Construction",
      "Transpo Group",
      "Bright Star Construction Materials",
      "Power Group",
      "Mab Facilities Management",
      "EFS Facilities Services",
      "Etisalat Facilities Management",
      "EDM Commercial Services",
    ],
  },
  {
    country: "Malaysia",
    clients: [
      "Kian Joo Can Factory",
      "A one Food & Beverages",
      "Waqash Resources",
      "Agung Ahad Manufacturing",
      "Taito Oild Manufacturing",
      "Medime Resources",
      "Global Resources",
      "HRS Constructions & Trading",
      "Ademco Security Group",
      "Kossan Rubber Industries",
      "Potensi Dutamas",
      "Agasi Engineering",
      "Vicon Industries",
      "Ajax Systems",
    ],
  },
  {
    country: "Saudi Arabia (KSA)",
    clients: [
      "Tania Bottled Water Company",
      "AL Alwani Memoni Dates Factory",
      "Mahmood Saeed Collective Company",
      "Yazeed Al Rajhi Brothers Holding Co",
      "Alrabiah Consultants and Engineering",
      "Saudi Manpower Solutions Co",
      "Jaddarah Workforce Company",
      "National Aquaculture Group",
      "Alesayi Development Company",
      "Abdullah Hashim Co Ltd",
      "Jacko Gases Company",
      "Balsharaf Group",
      "Forsan Foods",
      "Herfy Foods",
      "Basamh Group",
    ],
  },
  {
    country: "Kuwait",
    clients: [
      "The Ahmadiah Group",
      "MNA International Group",
      "Al Hani Group",
      "MAG Construction",
      "Amana Contracting & Steel Buildings",
      "Alamiah Building Company",
    ],
  },
  {
    country: "Sultanate of Oman",
    clients: [
      "Oman Flour Mills Co Saog",
      "Sam Building Contracting",
      "Vision Engineering Consultants",
      "Starcare First Medial Center",
      "YAS Medical Centre",
      "Al Baraka Oilfield Services",
      "Arabian Industries",
    ],
  },
  {
    country: "Bahrain",
    clients: [
      "Bahrain motors Company",
      "Bahrain Foundation Construction",
      "Kooheji Contractor",
      "Aviation Labour Groupnufacturing",
      "Alkooheji Petroglobe",
      "Clarendon Parker",
    ],
  },
];

/* ---------------------------------------------------------
   QATAR CLIENTS (logo grid)
   --------------------------------------------------------- */
const qatarClients = [
  { name: "Al Kubaisi Group", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86ba8a57ce51515621eea.svg" },
  { name: "Almoayyed Air Conditioning", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0bce846da52.svg" },
  { name: "CP", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5e74f516d5a1.svg" },
  { name: "Ceprotec Project Support Solutions", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6a57ce5fd35621eeb.svg" },
  { name: "Challenger Trading & Contracting", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb67e16fc5c4e57d761.svg" },
  { name: "Coastal Qatar", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb67e16fc68fa57d760.svg" },
  { name: "ExBT", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe065d346da53.svg" },
  { name: "GETP Group", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe02ed046da56.svg" },
  { name: "ME", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb69d8a395d8871ddd5.svg" },
  { name: "Paris United Group", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5eb88116d5a0.svg" },
  { name: "Porto Holding", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe07a5046da55.svg" },
  { name: "QatarEnergy", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5ece9216d5a2.svg" },
  { name: "Qatar National Import & Export", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0277646da54.svg" },
  { name: "Red Links Construction", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5e20a816d5a3.svg" },
  { name: "Shelter Group", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0df9146da57.svg" },
  { name: "Snoonu", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb69d8a39fd0e71ddd6.svg" },
  { name: "Voltech", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb7a57ce5eadf621eec.svg" },
  { name: "Aseel", logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb77e16fc4e5457d762.svg" },
];

/* ---------------------------------------------------------
   OUR GLOBAL PRESENCE
   --------------------------------------------------------- */
const globalPresence = [
  { location: "Ain Khaled, Qatar", name: "Star Euro Consultancy Services" },
  { location: "Deira, Dubai", name: "Star Euro Group" },
  { location: "Delhi, India", name: "Star Euro Migration Services" },
  { location: "Siliguri, India", name: "Star Management Consultancy Services" },
  { location: "Lafayette, Tunis, Tunisia", name: "Star Management Consultancy" },
  { location: "Hawally, Kuwait", name: "Star Immigration Consultancy" },
  { location: "Sinamangal, Kathmandu, Nepal", name: "Star Tours and Travels" },
];

function Clients() {
  return (
    <div className="clients2-page">
      {/* TAKE A LOOK AT OUR CLIENTS */}
      <section className="clients2-dark">
        <div className="container">
          <h2 className="clients2-center-heading">Take A Look At Our Clients</h2>

          <div className="clients2-country-grid">
            {countryClients.map((group) => (
              <div className="clients2-country-card" key={group.country}>
                <h3>{group.country}</h3>
                <ul>
                  {group.clients.map((name) => (
                    <li key={name}>
                      <Star size={13} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QATAR CLIENTS */}
      <section className="clients2-dark clients2-qatar">
        <div className="container">
          <h2 className="clients2-center-heading">Qatar Clients</h2>

          <div className="clients2-logo-grid">
            {qatarClients.map((c) => (
              <div className="clients2-logo-card" key={c.name}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR GLOBAL PRESENCE */}
      <section className="clients2-light">
        <div className="container">
          <h2 className="clients2-center-heading clients2-heading-dark">
            Our Global Presence
          </h2>

          <div className="clients2-presence-grid">
            {globalPresence.map((p) => (
              <div className="clients2-presence-card" key={p.location}>
                <div className="clients2-presence-pin">
                  <MapPin size={22} />
                </div>
                <h4>{p.location}</h4>
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;