const seedData = async () => {
  const services = [
    {
      type: "MI Loan",
      code: "SCB",
      description: "A loan service for mobile investments.",
      imgUrl: "http://example.com/img1.jpg",
      detail: ["Flexible repayment", "Low interest rates"]
    },
    {
      type: "Home Loan",
      code: "HLB",
      description: "A loan service for home financing.",
      imgUrl: "http://example.com/img2.jpg",
      detail: ["Long tenure", "Affordable rates"]
    }
  ];

  try {
    await Service.insertMany(services);
    console.log("Services seeded successfully");
  } catch (error) {
    console.error("Error seeding services:", error);
  }
};

seedData();
