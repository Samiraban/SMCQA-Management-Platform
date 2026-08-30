/* =========================================================
   HOSPITALITY DEPARTMENTS
   Each department shows a maximum of 6 roles, each with a
   specific, individually-matched photo (not cycled from a
   shared generic list).
   ========================================================= */

export const hospitalityDepartments = [
  {
    key: "food-beverages",
    label: "Food & Beverages",
    roles: [
      { title: "Food & Beverages Manager", image: "https://plus.unsplash.com/premium_photo-1663091267048-1552821db6d8?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Bartender", image: "https://images.unsplash.com/photo-1647776112336-72f4c30fafc1?auto=format&fit=crop&w=900&q=80" },
      { title: "Barista", image: "https://images.unsplash.com/photo-1619860703338-9c70a1af6a63?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Restaurant Captain", image: "https://images.unsplash.com/photo-1566670735914-b2038696981d?auto=format&fit=crop&w=900&q=80" },
      { title: "Waiter", image: "https://images.unsplash.com/photo-1516788875874-c5912cae7b43?auto=format&fit=crop&w=900&q=80" },
      { title: "Waitress", image: "https://images.unsplash.com/photo-1705848533916-a47cd3851f34?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },

  {
    key: "front-office",
    label: "Front Office",
    roles: [
      { title: "Front Office Manager", image: "https://plus.unsplash.com/premium_photo-1682089273091-2394be619ebf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Receptionist", image: "https://images.unsplash.com/photo-1579802697728-08d83cd66f92?q=80&w=406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Guest Relations Officer", image: "https://plus.unsplash.com/premium_photo-1683134374806-9ea735de4b37?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Bell Attendant", image: "https://plus.unsplash.com/premium_photo-1663045339391-40f9462a134a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Concierge", image: "https://plus.unsplash.com/premium_photo-1661501198621-b684cf4a67ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Reservation Agent", image: "https://images.unsplash.com/photo-1634827557243-c9f9d707fba3?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },

  {
    key: "culinary",
    label: "Culinary",
    roles: [
      { title: "Executive Chef", image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=80" },
      { title: "Sous Chef", image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&w=900&q=80" },
      { title: "Pastry Chef", image: "https://images.unsplash.com/photo-1549590143-d5855148a9d5?auto=format&fit=crop&w=900&q=80" },
      { title: "Baker", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
      { title: "Butcher", image: "https://images.unsplash.com/photo-1615937662601-4724eceda00f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Kitchen Steward", image: "https://images.unsplash.com/photo-1594402919317-9e67dca0a305?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },

  {
    key: "housekeeping",
    label: "Housekeeping",
    roles: [
      { title: "Housekeeping Manager", image: "https://images.unsplash.com/photo-1637684666587-91e51b10a555?q=80&w=462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Executive Housekeeper", image: "https://images.unsplash.com/photo-1573014196346-87ac0314faf5?auto=format&fit=crop&w=900&q=80" },
      { title: "Room Attendant", image: "https://images.unsplash.com/photo-1548467323-072c8af90d48?auto=format&fit=crop&w=900&q=80" },
      { title: "Laundry Attendant", image: "https://images.unsplash.com/photo-1772267844194-20a917c84bfa?auto=format&fit=crop&w=900&q=80" },
      { title: "Linen Attendant", image: "https://images.unsplash.com/photo-1606738132486-b6d2d287405e?auto=format&fit=crop&w=900&q=80" },
      { title: "Houseman", image: "https://images.unsplash.com/photo-1580842402762-6f5868c17412?auto=format&fit=crop&w=900&q=80" },
    ],
  },

  {
    key: "finance",
    label: "Finance",
    roles: [
      { title: "Finance Manager", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80" },
      { title: "Chief Accountant", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80" },
      { title: "Accounts Officer", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" },
      { title: "Cost Controller", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" },
      { title: "Cashier", image: "https://images.unsplash.com/photo-1556742212-5b321f3c261b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Night Auditor", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80" },
    ],
  },

  {
    key: "leisure-spa",
    label: "Leisure & Spa",
    roles: [
      { title: "Spa Manager", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80" },
      { title: "Senior Therapist", image: "https://images.unsplash.com/photo-1758273241078-8eec353836be?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Massage Therapist", image: "https://images.unsplash.com/photo-1675159364615-38e1f6b62282?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Beauty Therapist", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80" },
      { title: "Fitness Trainer", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80" },
      { title: "Pool Attendant", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80" },
    ],
  },

  {
    key: "sales-marketing",
    label: "Sales & Marketing",
    roles: [
      { title: "Sales Manager", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" },
      { title: "Sales Executive", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80" },
      { title: "Marketing Manager", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80" },
      { title: "Marketing Executive", image: "https://plus.unsplash.com/premium_photo-1661425715124-310ec1b49b8a?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "E-Commerce Executive", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80" },
      { title: "Graphic Designer", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80" },
    ],
  },

  {
    key: "human-resource",
    label: "Human Resource",
    roles: [
      { title: "Human Resource Manager", image: "https://plus.unsplash.com/premium_photo-1661763728249-2aea04c27754?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "HR Executive", image: "https://plus.unsplash.com/premium_photo-1661414415246-3e502e2fb241?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Recruitment Officer", image: "https://plus.unsplash.com/premium_photo-1687950889838-a39789da6509?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Training Officer", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" },
      { title: "Security Guard", image: "https://plus.unsplash.com/premium_photo-1682125948844-e2dc8996b0f0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { title: "Driver", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80" },
    ],
  },
];