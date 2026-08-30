import crypto from "node:crypto";
import Content from "../models/Content.js";
import {
  notifyNewApplicant,
  notifyNewInquiry,
} from "../utils/mailer.js";

const VALID_COLLECTIONS =
  new Set([
    "services",
    "team",
    "clients",
    "jobs",
    "applicants",
    "blog",
    "inquiries",
    "chats",
    "siteContent",
    "reviews",
  ]);

const seedData = {
  services: [
    {
      id: "s1",
      number: "01",
      title: "Hospitality",
      description:
        "Reliable hospitality manpower for hotels, restaurants, catering companies and service organisations.",
      icon: "Building2",
    },
    {
      id: "s2",
      number: "02",
      title: "Construction",
      description:
        "Skilled and dependable workforce solutions supporting construction and infrastructure projects.",
      icon: "BriefcaseBusiness",
    },
    {
      id: "s3",
      number: "03",
      title: "Healthcare",
      description:
        "Professional staffing solutions connecting healthcare organisations with qualified personnel.",
      icon: "UserRound",
    },
    {
      id: "s4",
      number: "04",
      title: "Office Management",
      description:
        "Efficient administrative and office support personnel for organisations across different industries.",
      icon: "Users",
    },
    {
      id: "s5",
      number: "05",
      title: "Security & Guarding",
      description:
        "Trained workforce solutions designed around safety, reliability and professional service.",
      icon: "ShieldCheck",
    },
    {
      id: "s6",
      number: "06",
      title: "Agriculture & Farming",
      description:
        "Manpower recruitment solutions for agricultural, farming and related operational requirements.",
      icon: "Globe2",
    },
  ],

  team: [
    {
      id: "t1",
      name: "Mohamed Abdul Aleem",
      role: "Chief Executive Officer",
      photo:
        "https://i.pravatar.cc/300?img=12",
    },
    {
      id: "t2",
      name: "Afroj Alam",
      role: "Finance Manager",
      photo:
        "https://i.pravatar.cc/300?img=47",
    },
    {
      id: "t3",
      name: "Istak Alam",
      role: "Operations Manager",
      photo:
        "https://i.pravatar.cc/300?img=33",
    },
  ],

  clients: [
    {
      id: "c1",
      name: "Client Partner 1",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca1ce946234cac38042.svg",
    },
    {
      id: "c2",
      name: "Client Partner 2",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca14f0bc21cb5ddc57b.svg",
    },
    {
      id: "c3",
      name: "Client Partner 3",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca1ba4591b48b64fb72.svg",
    },
    {
      id: "c4",
      name: "Client Partner 4",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca13751730c86d8f2e3.svg",
    },
    {
      id: "c5",
      name: "Client Partner 5",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca13751737ba9d8f2e4.svg",
    },
    {
      id: "c6",
      name: "Client Partner 6",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca14f0bc2402addc57c.svg",
    },
    {
      id: "c7",
      name: "Client Partner 7",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca14f0bc2dd4eddc57d.svg",
    },
    {
      id: "c8",
      name: "Client Partner 8",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca1ba4591722764fb73.svg",
    },
    {
      id: "c9",
      name: "Client Partner 9",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d4ca1ba4591704b64fb74.svg",
    },
    {
      id: "c10",
      name: "Client Partner 10",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d6e50f9ac86f3c856cf6a.svg",
    },
    {
      id: "c11",
      name: "Client Partner 11",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d6e50f9ac86788a56cf69.svg",
    },
    {
      id: "c12",
      name: "Client Partner 12",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d6e50ba45917dab650330.svg",
    },
    {
      id: "c13",
      name: "Client Partner 13",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d6e504f0bc297c5ddd023.svg",
    },
    {
      id: "c14",
      name: "Client Partner 14",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d7072f9ac863ffc56d141.svg",
    },
    {
      id: "c15",
      name: "Client Partner 15",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d70723751730d17d8fd5b.svg",
    },
    {
      id: "c16",
      name: "Client Partner 16",
      industry: "Partner",
      logo: "https://storage.googleapis.com/msgsndr/7l7AhPqfXqde9yLH2psg/media/666d7072ba4591403c650523.svg",
    },
  ],

  jobs: [
    {
      id: "j1",
      title:
        "Hotel Front Desk Agent",
      location: "Doha, Qatar",
      type: "Full-time",
      department: "Hospitality",
      status: "Open",
      postedAt: Date.now(),
    },
    {
      id: "j2",
      title:
        "Site Security Officer",
      location: "Doha, Qatar",
      type: "Full-time",
      department:
        "Security & Guarding",
      status: "Open",
      postedAt: Date.now(),
    },
  ],

  blog: [
    {
      id: "b1",
      title:
        "How to Choose the Right Staffing Partner in Qatar",
      excerpt:
        "A quick guide for businesses evaluating manpower consultancies.",
      body:
        "Star Management Consultancy helps organisations identify dependable workforce solutions.",
      publishedAt: Date.now(),
      author: "SMC Team",
    },
  ],

  reviews: [
    {
      id: "r1",
      name: "Mohammad Osman Gani",
      rating: 5,
      text:
        "I feel I have put my documents on the right place. Very fantastic service.",
      approved: true,
      submittedAt: Date.now(),
    },
    {
      id: "r2",
      name: "Sobit Magar",
      rating: 5,
      text:
        "Very comfortable and supportive environment throughout the process.",
      approved: true,
      submittedAt: Date.now(),
    },
    {
      id: "r3",
      name: "Shfiq Miya",
      rating: 5,
      text:
        "Very fantastic work experience and professional support.",
      approved: true,
      submittedAt: Date.now(),
    },
  ],

  siteContent: {
    heroTitle:
      "Building the workforce that builds the future.",
    heroSubtitle:
      "Connecting organisations with reliable manpower and helping talented people discover meaningful opportunities.",
    aboutText:
      "Star Management Consultancy is a Human Resource and Hospitality Services provider focused on connecting organisations with the people they need to grow.",
    stats: {
      peopleRecruited: "20K+",
      happyClients: "20K+",
      industryExperts: "500+",
      globalLocations: "7+",
    },
  },
};

function serialize(document) {
  return {
    id: document.itemId,
    ...document.data,
  };
}

export async function seedDefaults() {
  for (
    const collection of [
      "services",
      "team",
      "clients",
      "jobs",
      "blog",
      "reviews",
    ]
  ) {
    const count =
      await Content.countDocuments({
        collection,
      });

    if (
      count === 0 &&
      Array.isArray(
        seedData[collection]
      )
    ) {
      await Content.insertMany(
        seedData[collection].map(
          (item) => ({
            collection,
            itemId: item.id,
            data: item,
          })
        )
      );
    }
  }

  const contentExists =
    await Content.exists({
      collection: "siteContent",
      itemId: "site-content",
    });

  if (!contentExists) {
    await Content.create({
      collection: "siteContent",
      itemId: "site-content",
      data: seedData.siteContent,
    });
  }
}

export async function getCollection(
  req,
  res
) {
  try {
    const { collection } =
      req.params;

    if (collection === "stats") {
      const [
        openJobs,
        applicants,
        inquiries,
        chats,
      ] = await Promise.all([
        Content.countDocuments({
          collection: "jobs",
          "data.status": "Open",
        }),
        Content.countDocuments({
          collection: "applicants",
        }),
        Content.countDocuments({
          collection: "inquiries",
        }),
        Content.countDocuments({
          collection: "chats",
        }),
      ]);

      return res.json({
        success: true,
        data: {
          onlineVisitors: 1,
          openJobs,
          applicants,
          inquiries,
          chats,
        },
      });
    }

    if (
      !VALID_COLLECTIONS.has(
        collection
      )
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Collection not found.",
      });
    }

    const documents =
      await Content.find({
        collection,
      }).sort({
        createdAt: 1,
      });

    if (
      collection === "siteContent"
    ) {
      return res.json({
        success: true,
        data:
          documents[0]
            ? serialize(
                documents[0]
              )
            : {},
      });
    }

    let results = documents.map(serialize);

    // Visitors on the public site should never see a review
    // before an admin has approved it — only the admin panel
    // (a non-public request) can see everything.
    if (collection === "reviews" && req.isPublicRequest) {
      results = results.filter((item) => item.approved === true);
    }

    return res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error(
      "Get collection error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load collection.",
    });
  }
}

export async function createCollectionItem(
  req,
  res
) {
  try {
    const { collection } =
      req.params;

    if (
      !VALID_COLLECTIONS.has(
        collection
      )
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Collection not found.",
      });
    }

    const data = {
      ...(req.body || {}),
    };

    const id = String(
      data.id ||
        crypto.randomUUID()
    );

    data.id = id;

    if (collection === "jobs") {
      data.postedAt ||=
        Date.now();

      data.status ||=
        "Open";
    }

    if (
      collection === "applicants"
    ) {
      data.submittedAt ||=
        Date.now();

      data.status ||=
        "New";
    }

    if (
      collection === "inquiries"
    ) {
      data.submittedAt ||=
        Date.now();

      data.status ||=
        "New";
    }

    if (collection === "blog") {
      data.publishedAt ||=
        Date.now();
    }

    if (collection === "chats") {
      data.sentAt ||=
        Date.now();
    }

    if (collection === "reviews") {
      data.submittedAt ||=
        Date.now();

      // Reviews created by the public (customers) are never
      // auto-approved. Only an admin edit through the admin
      // panel can flip this to true, so nothing shows on the
      // live site until an admin has checked it.
      if (typeof data.approved !== "boolean") {
        data.approved = false;
      }

      const parsedRating = Number(data.rating);

      data.rating =
        Number.isFinite(parsedRating) &&
        parsedRating >= 1 &&
        parsedRating <= 5
          ? Math.round(parsedRating)
          : 5;
    }

    const document =
      await Content.create({
        collection,
        itemId: id,
        data,
      });

    /*
     * Fire-and-forget admin notification emails.
     * These never block or fail the API response — if the
     * email fails, the applicant/inquiry is still saved.
     */
    if (collection === "applicants") {
      notifyNewApplicant(data);
    }

    if (collection === "inquiries") {
      notifyNewInquiry(data);
    }

    return res.status(201).json({
      success: true,
      data: serialize(
        document
      ),
    });
  } catch (error) {
    console.error(
      "Create item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to save data.",
    });
  }
}

export async function updateCollectionItem(
  req,
  res
) {
  try {
    const {
      collection,
      id,
    } = req.params;

    if (
      !VALID_COLLECTIONS.has(
        collection
      )
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Collection not found.",
      });
    }

    if (
      collection ===
      "siteContent"
    ) {
      const document =
        await Content.findOneAndUpdate(
          {
            collection,
            itemId:
              "site-content",
          },
          {
            $set: {
              data: {
                ...(req.body || {}),
              },
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

      return res.json({
        success: true,
        data: serialize(
          document
        ),
      });
    }

    const document =
      await Content.findOneAndUpdate(
        {
          collection,
          itemId: id,
        },
        {
          $set: {
            data: {
              ...(req.body || {}),
              id,
            },
          },
        },
        {
          new: true,
        }
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message:
          "Item not found.",
      });
    }

    return res.json({
      success: true,
      data: serialize(
        document
      ),
    });
  } catch (error) {
    console.error(
      "Update item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update data.",
    });
  }
}

export async function deleteCollectionItem(
  req,
  res
) {
  try {
    const {
      collection,
      id,
    } = req.params;

    if (
      !VALID_COLLECTIONS.has(
        collection
      ) ||
      collection ===
        "siteContent"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This item cannot be deleted.",
      });
    }

    const deleted =
      await Content.findOneAndDelete({
        collection,
        itemId: id,
      });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message:
          "Item not found.",
      });
    }

    return res.json({
      success: true,
      message:
        "Item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete item error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete item.",
    });
  }
}