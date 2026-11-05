/* Career dataset. Interest codes are three-letter Holland codes (strongest first), modeled on
   O*NET occupation interest profiles. Codes are approximations for a mock-up and should be
   cross-checked against onetonline.org before any production release.
   field = key into WCTA_COLLEGES (college programs). west = closest West CTA program. */
(function () {
  const c = (id, title, cluster, summary, code, skills, values, edu, west, field) =>
    ({ id, title, cluster, summary, code, skills, values, edu, west, field });

  const CAREERS = [
    // Health Science
    c("rn", "Registered Nurse", "Health Science", "Cares for patients, gives treatments, and teaches families how to manage health.", "SIC", ["people","scientific","organizing","persistence"], ["relationships","conditions"], "Associate or bachelor's degree + license", "Nursing Assistant", "nursing"),
    c("physician", "Physician", "Health Science", "Diagnoses illness and injury and leads a patient's treatment plan.", "ISE", ["scientific","persistence","verbal","people"], ["achievement","recognition"], "Bachelor's + medical degree", "Biomedical Science", "premed"),
    c("pt", "Physical Therapist", "Health Science", "Helps people recover movement and manage pain after injury or illness.", "SIR", ["people","scientific","handson","persistence"], ["relationships","achievement"], "Doctorate (DPT)", "Sports Medicine", "kinesiology"),
    c("at", "Athletic Trainer", "Health Science", "Prevents and treats injuries for athletes and active people.", "SRI", ["people","scientific","handson","organizing"], ["relationships","achievement"], "Bachelor's or master's degree", "Sports Medicine", "kinesiology"),
    c("rad", "Radiologic Technologist", "Health Science", "Operates imaging equipment like X-ray and CT to help doctors see inside the body.", "RSI", ["technical","people","handson","scientific"], ["conditions","support"], "Associate or bachelor's degree", "Biomedical Science", "allied"),
    c("dh", "Dental Hygienist", "Health Science", "Cleans teeth, screens for disease, and teaches patients about oral health.", "SRC", ["handson","people","scientific","organizing"], ["conditions","relationships"], "Associate degree + license", "Biomedical Science", "allied"),
    c("mlt", "Medical Laboratory Scientist", "Health Science", "Runs tests on blood and tissue samples that doctors rely on for diagnoses.", "IRC", ["scientific","persistence","organizing","technical"], ["conditions","achievement"], "Bachelor's degree", "Biomedical Science", "lab"),
    c("emt", "Paramedic / EMT", "Health Science", "Responds to emergencies and gives life-saving care on the scene and in transit.", "RSI", ["people","handson","persistence","scientific"], ["achievement","relationships"], "Certificate or associate degree", "Nursing Assistant", "fire"),

    // STEM
    c("biotech", "Biotechnology Researcher", "Science & Research", "Uses living cells and genetics to develop medicines, foods, and new materials.", "IRA", ["scientific","persistence","technical","numeric"], ["achievement","independence"], "Bachelor's to master's degree", "Biotechnology", "lab"),
    c("env", "Environmental Scientist", "Science & Research", "Studies air, water, and land to solve pollution and resource problems.", "IRE", ["scientific","numeric","verbal","persistence"], ["achievement","independence"], "Bachelor's degree", "Environmental Science", "environmental"),
    c("conserv", "Conservation Scientist", "Science & Research", "Manages public lands and wildlife habitat in the field and the lab.", "RIS", ["scientific","handson","people","persistence"], ["independence","achievement"], "Bachelor's degree", "Environmental Science", "environmental"),
    c("geo", "Geoscientist", "Science & Research", "Explores rocks, minerals, water, and earth processes to find resources and assess hazards.", "IRE", ["scientific","spatial","numeric","persistence"], ["independence","achievement"], "Bachelor's degree", "Environmental Science", "geoscience"),
    c("civil", "Civil Engineer", "Engineering", "Designs roads, bridges, water systems, and buildings.", "RIE", ["numeric","spatial","organizing","scientific"], ["achievement","conditions"], "Bachelor's degree", "Engineering", "engineering"),
    c("mech", "Mechanical Engineer", "Engineering", "Designs engines, machines, and devices and tests how they perform.", "IRE", ["numeric","mechanical","spatial","creative"], ["achievement","recognition"], "Bachelor's degree", "Engineering", "engineering"),
    c("elec", "Electrical Engineer", "Engineering", "Designs electrical systems, electronics, and power equipment.", "IRC", ["numeric","technical","scientific","persistence"], ["achievement","conditions"], "Bachelor's degree", "Engineering", "engineering"),
    c("bme", "Biomedical Engineer", "Engineering", "Combines engineering and biology to design medical devices and equipment.", "IRA", ["numeric","scientific","creative","technical"], ["achievement","recognition"], "Bachelor's degree", "Engineering", "engineering"),

    // Information Technology
    c("swdev", "Software Developer", "Information Technology", "Designs, writes, and tests the programs behind apps, games, and websites.", "IRC", ["technical","numeric","persistence","creative"], ["achievement","independence"], "Bachelor's degree", "Cybersecurity", "cs"),
    c("cyber", "Cybersecurity Analyst", "Information Technology", "Protects networks and data by finding weaknesses and stopping attacks.", "IRC", ["technical","persistence","scientific","organizing"], ["achievement","conditions"], "Bachelor's degree + certifications", "Cybersecurity", "cyber"),
    c("netadmin", "Network Administrator", "Information Technology", "Keeps an organization's computers, servers, and networks running securely.", "CIR", ["technical","organizing","persistence","handson"], ["conditions","support"], "Associate or bachelor's degree", "Cybersecurity", "cyber"),
    c("datasci", "Data Scientist", "Information Technology", "Finds patterns in large sets of data and turns them into decisions.", "ICE", ["numeric","technical","persistence","verbal"], ["achievement","independence"], "Bachelor's to master's degree", "Cybersecurity", "cs"),

    // Arts & Media
    c("graphic", "Graphic Designer", "Arts & Media", "Creates visual concepts for brands, ads, products, and websites.", "AEI", ["creative","technical","spatial","verbal"], ["independence","achievement"], "Associate or bachelor's degree", "Digital Art & Design", "design"),
    c("video", "Video Editor / Producer", "Arts & Media", "Shapes footage into films, shows, ads, and online content.", "AER", ["creative","technical","organizing","spatial"], ["independence","achievement"], "Associate or bachelor's degree", "Digital Art & Design", "media"),
    c("game", "Game / UX Designer", "Arts & Media", "Designs how games and apps look, feel, and respond to the people using them.", "AIE", ["creative","technical","spatial","persistence"], ["independence","achievement"], "Bachelor's degree", "Digital Art & Design", "design"),
    c("arch", "Architect", "Arts & Media", "Designs buildings and spaces that are safe, useful, and beautiful.", "AIR", ["creative","spatial","numeric","organizing"], ["achievement","recognition"], "Bachelor's or master's degree + license", "Engineering", "architecture"),

    // Education & Human Services
    c("teacher", "Teacher", "Education & Human Services", "Plans lessons and helps students learn and grow in a subject.", "SAE", ["verbal","people","organizing","leadership"], ["relationships","support"], "Bachelor's degree + license", "Business Management", "education"),
    c("counselor", "School Counselor", "Education & Human Services", "Guides students through academic, career, and personal decisions.", "SAI", ["people","verbal","organizing","persistence"], ["relationships","achievement"], "Master's degree", "Business Management", "counseling"),
    c("socialworker", "Social Worker", "Education & Human Services", "Connects people and families to the support and services they need.", "SEA", ["people","persistence","verbal","organizing"], ["relationships","achievement"], "Bachelor's or master's degree", "Nursing Assistant", "counseling"),
    c("psych", "Psychologist", "Education & Human Services", "Studies behavior and helps people with thoughts, feelings, and challenges.", "ISA", ["people","scientific","verbal","persistence"], ["independence","achievement"], "Master's or doctorate", "Biomedical Science", "psychology"),

    // Public Safety
    c("police", "Police Officer / Detective", "Public Safety", "Protects the community, responds to incidents, and investigates crime.", "ERS", ["people","leadership","persistence","organizing"], ["conditions","achievement"], "Academy; some roles need a degree", "Cybersecurity", "cj"),
    c("fire", "Firefighter", "Public Safety", "Fights fires, rescues people, and responds to emergencies as part of a crew.", "RSE", ["handson","people","persistence","mechanical"], ["relationships","achievement"], "Academy; fire science degree helps", "Sports Medicine", "fire"),

    // Skilled Trades & Construction
    c("electrician", "Electrician", "Skilled Trades & Construction", "Installs and repairs wiring, lighting, and power systems.", "RIC", ["handson","technical","mechanical","spatial"], ["conditions","independence"], "Apprenticeship or certificate", "Engineering", "trades"),
    c("hvac", "HVAC Technician", "Skilled Trades & Construction", "Installs and services heating, cooling, and ventilation systems.", "RCI", ["mechanical","handson","technical","persistence"], ["conditions","independence"], "Certificate or associate degree", "Engineering", "trades"),
    c("welder", "Welder / Fabricator", "Skilled Trades & Construction", "Joins and shapes metal for buildings, vehicles, and equipment.", "RIC", ["handson","spatial","mechanical","persistence"], ["conditions","independence"], "Certificate or apprenticeship", "Engineering", "trades"),
    c("auto", "Automotive Technician", "Skilled Trades & Construction", "Diagnoses and repairs cars, trucks, and increasingly electric vehicles.", "RIC", ["mechanical","handson","technical","persistence"], ["conditions","independence"], "Certificate or associate degree", "Engineering", "auto"),
    c("constrmgr", "Construction Manager", "Skilled Trades & Construction", "Plans, budgets, and leads building projects from start to finish.", "ECR", ["leadership","organizing","spatial","numeric"], ["recognition","conditions"], "Associate or bachelor's degree", "Engineering", "construction"),

    // Business & Finance
    c("bizmgr", "Business Manager", "Business & Finance", "Leads a team or department and keeps operations running toward goals.", "ECS", ["leadership","organizing","verbal","people"], ["recognition","conditions"], "Bachelor's degree", "Business Management", "business"),
    c("entrepreneur", "Entrepreneur", "Business & Finance", "Starts and grows a new business around an idea or a need.", "EAS", ["leadership","creative","persistence","organizing"], ["independence","achievement"], "Varies; business degree helps", "Business Management", "business"),
    c("marketing", "Marketing Manager", "Business & Finance", "Plans campaigns that connect products and brands with the right audience.", "EAS", ["creative","verbal","people","leadership"], ["recognition","achievement"], "Bachelor's degree", "Business Management", "marketing"),
    c("accountant", "Accountant", "Business & Finance", "Prepares and checks financial records, taxes, and reports.", "CEI", ["numeric","organizing","persistence","technical"], ["conditions","support"], "Bachelor's degree (+ CPA)", "Business Management", "accounting"),
    c("finanalyst", "Financial Analyst", "Business & Finance", "Studies markets and company data to guide investment and business decisions.", "IEC", ["numeric","technical","verbal","organizing"], ["achievement","recognition"], "Bachelor's degree", "Business Management", "accounting"),

    // Hospitality & Culinary
    c("hotel", "Hospitality / Resort Manager", "Hospitality & Culinary", "Runs hotels, resorts, and venues so guests have a great experience.", "ESC", ["people","leadership","organizing","verbal"], ["recognition","relationships"], "Bachelor's degree", "Business Management", "hospitality"),
    c("events", "Event Planner", "Hospitality & Culinary", "Coordinates conferences, weddings, and shows from concept to final day.", "EAS", ["organizing","people","creative","leadership"], ["achievement","relationships"], "Associate or bachelor's degree", "Business Management", "hospitality"),
    c("chef", "Chef / Culinary Professional", "Hospitality & Culinary", "Creates menus, leads a kitchen, and turns ingredients into memorable dishes.", "RAE", ["creative","handson","organizing","persistence"], ["achievement","independence"], "Certificate or associate degree", "Business Management", "culinary"),

    // Legal
    c("lawyer", "Lawyer", "Legal", "Advises clients, argues cases, and helps people and organizations navigate the law.", "EIA", ["verbal","persistence","leadership","organizing"], ["recognition","achievement"], "Bachelor's + law degree", "Business Management", "law")
  ];

  window.WCTA_CAREERS = CAREERS;
})();
