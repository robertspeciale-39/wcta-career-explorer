/* College program links, keyed by field of study.
   Ordering rule (applied in the results page too): UNLV, UNR, CSN first, then other Nevada schools,
   then Utah, then Arizona.
   Links point to program or college pages; each is checked in QA (see README). */
(function () {
  const INST = {
    unlv: { id: "unlv", name: "UNLV", full: "University of Nevada, Las Vegas", city: "Las Vegas", state: "NV", rank: 0 },
    unr:  { id: "unr",  name: "UNR",  full: "University of Nevada, Reno", city: "Reno", state: "NV", rank: 1 },
    csn:  { id: "csn",  name: "CSN",  full: "College of Southern Nevada", city: "Las Vegas area", state: "NV", rank: 2 },
    nsu:  { id: "nsu",  name: "Nevada State University", full: "Nevada State University", city: "Henderson", state: "NV", rank: 3 },
    tmcc: { id: "tmcc", name: "TMCC", full: "Truckee Meadows Community College", city: "Reno", state: "NV", rank: 4 }
  };

  const U = "https://www.unlv.edu/", R = "https://www.unr.edu/", C = "https://www.csn.edu/programs/";
  const NSU = "https://nevadastate.edu/", TM = "https://www.tmcc.edu/";
  const link = (inst, label, url) => ({ inst, label, url });

  const FIELDS = {
    nursing: [
      link("unlv", "School of Nursing", U + "nursing"),
      link("unr", "Orvis School of Nursing", R + "academics/colleges-schools"),
      link("csn", "Nursing (Associate of Applied Science)", C + "nursing"),
      link("csn", "Practical Nursing", C + "practical-nursing"),
      link("nsu", "Nevada State University", NSU)
    ],
    premed: [
      link("unlv", "Kerkorian School of Medicine", "https://medicine.unlv.edu/"),
      link("unr", "UNR Med (School of Medicine)", "https://med.unr.edu/"),
      link("unlv", "College of Sciences (pre-health)", U + "sciences"),
      link("unr", "College of Science (pre-health)", R + "academics/colleges-schools")
    ],
    kinesiology: [
      link("unlv", "Kinesiology and Nutrition Sciences", "https://kinesiology.unlv.edu/"),
      link("unr", "UNR degree finder: health and movement", R + "academics/colleges-schools"),
      link("csn", "CSN health sciences programs", "https://www.csn.edu/healtharea")
    ],
    allied: [
      link("unlv", "UNLV Health Sciences", U + "healthsciences"),
      link("unr", "UNR degree finder", R + "academics/colleges-schools"),
      link("csn", "CSN health sciences programs (radiology, dental, more)", "https://www.csn.edu/healtharea"),
      link("csn", "Dental Hygiene", C + "dental-hygiene")
    ],
    lab: [
      link("unlv", "College of Sciences", U + "sciences"),
      link("unr", "College of Science", R + "academics/colleges-schools"),
      link("unr", "College of Agriculture, Biotechnology & Natural Resources", R + "academics/colleges-schools"),
      link("csn", "CSN science programs", "https://www.csn.edu/sciencearea")
    ],
    fire: [
      link("csn", "CSN public safety programs (fire and EMS)", "https://www.csn.edu/psarea"),
      link("unlv", "UNLV degree finder", U + "academics"),
      link("unr", "UNR degree finder", R + "academics/colleges-schools")
    ],
    environmental: [
      link("unlv", "College of Sciences: Environmental Science", U + "sciences"),
      link("unr", "College of Agriculture, Biotechnology & Natural Resources", R + "academics/colleges-schools"),
      link("unr", "College of Science", R + "academics/colleges-schools"),
      link("csn", "CSN science programs", "https://www.csn.edu/sciencearea")
    ],
    geoscience: [
      link("unlv", "Geoscience (College of Sciences)", U + "sciences"),
      link("unr", "Mackay School of Earth Sciences and Engineering", R + "academics/colleges-schools"),
      link("csn", "CSN science programs", "https://www.csn.edu/sciencearea")
    ],
    engineering: [
      link("unlv", "Howard R. Hughes College of Engineering", U + "engineering/academic-programs"),
      link("unr", "College of Engineering", R + "academics/colleges-schools"),
      link("csn", "CSN engineering and technology programs", "https://www.csn.edu/cetarea"),
      link("tmcc", "TMCC", TM)
    ],
    cs: [
      link("unlv", "Computer Science", U + "engineering/academic-programs"),
      link("unr", "Computer Science and Engineering (B.S.)", R + "degrees/majors/computer-science-engineering"),
      link("csn", "Computing and Information Technology", C + "cit"),
      link("nsu", "Nevada State University", NSU)
    ],
    cyber: [
      link("unlv", "Computer Science and Cybersecurity", U + "engineering/academic-programs"),
      link("unr", "Computer Science and Engineering", R + "degrees/majors/computer-science-engineering"),
      link("csn", "Computing and Information Technology (Cybersecurity)", C + "cit")
    ],
    design: [
      link("unlv", "College of Fine Arts", U + "finearts"),
      link("unr", "Department of Art", R + "academics/colleges-schools"),
      link("csn", "Graphic Communications", C + "graphic-communications"),
      link("nsu", "Visual Media (Nevada State University)", NSU)
    ],
    media: [
      link("unlv", "College of Fine Arts and Cinematic Arts", U + "cinematic-arts"),
      link("unr", "Reynolds School of Journalism", R + "academics/colleges-schools"),
      link("csn", "Graphic Communications", C + "graphic-communications"),
      link("nsu", "Visual Media (Nevada State University)", NSU)
    ],
    architecture: [
      link("unlv", "School of Architecture", U + "architecture"),
      link("unr", "College of Engineering", R + "academics/colleges-schools"),
      link("csn", "CSN construction and technology programs", "https://www.csn.edu/cetarea")
    ],
    education: [
      link("unlv", "College of Education", U + "education"),
      link("unr", "College of Education & Human Development", R + "academics/colleges-schools"),
      link("csn", "CSN education pathways", "https://www.csn.edu/education-and-training"),
      link("nsu", "Nevada State University (education)", NSU)
    ],
    counseling: [
      link("unlv", "College of Education and Human Services", U + "education"),
      link("unr", "College of Education & Human Development", R + "academics/colleges-schools"),
      link("csn", "CSN education and human services", "https://www.csn.edu/educationarea"),
      link("nsu", "Nevada State University", NSU)
    ],
    psychology: [
      link("unlv", "Psychology", U + "liberalarts"),
      link("unr", "Psychology", R + "academics/colleges-schools"),
      link("csn", "CSN science and social science programs", "https://www.csn.edu/sciencearea"),
      link("nsu", "Nevada State University", NSU)
    ],
    cj: [
      link("unlv", "Criminal Justice", U + "urbanaffairs"),
      link("unr", "Criminal Justice", R + "academics/colleges-schools"),
      link("csn", "Criminal Justice", C + "criminal-justice"),
      link("nsu", "Nevada State University", NSU)
    ],
    trades: [
      link("csn", "Welding Technology", C + "welding-technology"),
      link("csn", "CSN technical trades programs", "https://www.csn.edu/cetarea"),
      link("tmcc", "TMCC career and technical programs", TM)
    ],
    auto: [
      link("csn", "CSN automotive and technical programs", "https://www.csn.edu/cetarea"),
      link("tmcc", "TMCC career and technical programs", TM)
    ],
    construction: [
      link("unlv", "Construction Management", U + "engineering/academic-programs"),
      link("unr", "College of Engineering", R + "academics/colleges-schools"),
      link("csn", "CSN construction technology programs", "https://www.csn.edu/cetarea")
    ],
    business: [
      link("unlv", "Lee Business School", U + "business"),
      link("unr", "College of Business", R + "academics/colleges-schools"),
      link("csn", "CSN business programs", "https://www.csn.edu/businessarea"),
      link("nsu", "Nevada State University", NSU)
    ],
    marketing: [
      link("unlv", "Lee Business School: Marketing", U + "business"),
      link("unr", "College of Business: Marketing", R + "academics/colleges-schools"),
      link("csn", "CSN business programs", "https://www.csn.edu/businessarea")
    ],
    accounting: [
      link("unlv", "Lee Business School: Accounting and Finance", U + "business"),
      link("unr", "College of Business: Accounting and Finance", R + "academics/colleges-schools"),
      link("csn", "Accounting", C + "accounting"),
      link("nsu", "Nevada State University", NSU)
    ],
    hospitality: [
      link("unlv", "William F. Harrah College of Hospitality", U + "hospitality/academic-programs"),
      link("unr", "College of Business", R + "academics/colleges-schools"),
      link("csn", "CSN hospitality programs", "https://www.csn.edu/hosparea")
    ],
    culinary: [
      link("csn", "Culinary Arts", C + "culinary-arts"),
      link("unlv", "William F. Harrah College of Hospitality", U + "hospitality/academic-programs")
    ],
    law: [
      link("unlv", "William S. Boyd School of Law", "https://law.unlv.edu/"),
      link("unlv", "UNLV pre-law (degree finder)", U + "academics"),
      link("unr", "UNR degree finder (pre-law majors)", R + "academics/colleges-schools"),
      link("csn", "CSN public safety and legal programs", "https://www.csn.edu/psarea")
    ]
  };

  /* ---- Utah and Arizona (added Nov 2026) ----
     Each school lists the program areas it has a checked page for. FIELD_AREAS says which areas
     fit each field; the first area a school has is used, so a school adds at most one link per
     field. Nevada schools keep the lowest ranks, so they always list first. */
  const OUT_OF_STATE = [
    { id: "utah", name: "U of U", full: "University of Utah", city: "Salt Lake City", state: "UT", skip: ["cj"], areas: {
      nursing: ["College of Nursing", "https://nursing.utah.edu/"],
      medicine: ["Spencer Fox Eccles School of Medicine", "https://medicine.utah.edu/"],
      health: ["College of Health", "https://health.utah.edu/"],
      science: ["College of Science", "https://science.utah.edu/"],
      engineering: ["Price College of Engineering", "https://www.price.utah.edu/"],
      cs: ["Kahlert School of Computing", "https://www.cs.utah.edu/"],
      arts: ["College of Fine Arts", "https://finearts.utah.edu/"],
      architecture: ["College of Architecture and Planning", "https://www.cap.utah.edu/"],
      education: ["College of Education", "https://education.utah.edu/"],
      social: ["College of Social and Behavioral Science", "https://csbs.utah.edu/"],
      business: ["David Eccles School of Business", "https://eccles.utah.edu/"],
      law: ["S.J. Quinney College of Law", "https://law.utah.edu/"] } },
    { id: "usu", name: "USU", full: "Utah State University", city: "Logan", state: "UT", areas: {
      nursing: ["Nursing", "https://cehhs.usu.edu/nursing/"],
      kinesiology: ["Kinesiology and Health Science", "https://cehhs.usu.edu/khs/"],
      health: ["College of Education, Health, and Human Sciences", "https://cehhs.usu.edu/"],
      science: ["College of Arts and Sciences", "https://artsci.usu.edu/"],
      geo: ["College of Arts and Sciences (geosciences)", "https://artsci.usu.edu/"],
      environment: ["Quinney College of Agriculture and Natural Resources", "https://qanr.usu.edu/"],
      engineering: ["College of Engineering", "https://engineering.usu.edu/"],
      cs: ["School of Computing", "https://engineering.usu.edu/soc/"],
      arts: ["College of Arts and Sciences", "https://artsci.usu.edu/"],
      education: ["College of Education, Health, and Human Sciences", "https://cehhs.usu.edu/"],
      social: ["College of Arts and Sciences", "https://artsci.usu.edu/"],
      business: ["Huntsman School of Business", "https://huntsman.usu.edu/"] } },
    { id: "byu", name: "BYU", full: "Brigham Young University", city: "Provo", state: "UT", skip: ["cj"], areas: {
      nursing: ["College of Nursing", "https://nursing.byu.edu/"],
      science: ["College of Life Sciences", "https://lifesciences.byu.edu/"],
      engineering: ["College of Engineering", "https://engineering.byu.edu/"],
      cs: ["Computer Science", "https://cs.byu.edu/"],
      arts: ["College of Fine Arts and Communications", "https://cfac.byu.edu/"],
      education: ["McKay School of Education", "https://education.byu.edu/"],
      psych: ["Psychology", "https://psychology.byu.edu/"],
      social: ["College of Family, Home, and Social Sciences", "https://socialsciences.byu.edu/"],
      business: ["Marriott School of Business", "https://marriott.byu.edu/"],
      law: ["J. Reuben Clark Law School", "https://law.byu.edu/"] } },
    { id: "uvu", name: "UVU", full: "Utah Valley University", city: "Orem", state: "UT", areas: {
      nursing: ["Nursing", "https://www.uvu.edu/nursing/"],
      health: ["College of Health and Public Service", "https://www.uvu.edu/chps/"],
      fire: ["College of Health and Public Service (emergency services)", "https://www.uvu.edu/chps/"],
      science: ["College of Science", "https://www.uvu.edu/college-of-science/"],
      geo: ["College of Science (earth science)", "https://www.uvu.edu/college-of-science/"],
      engineering: ["Smith College of Engineering and Technology", "https://www.uvu.edu/scet/"],
      trades: ["Smith College of Engineering and Technology", "https://www.uvu.edu/scet/"],
      auto: ["Automotive Technology", "https://www.uvu.edu/scet/transportation-tech/auto-tech/"],
      cs: ["Computer Science", "https://www.uvu.edu/cs/"],
      cyber: ["Cybersecurity", "https://www.uvu.edu/cybersecurity/"],
      arts: ["School of the Arts", "https://www.uvu.edu/arts/"],
      education: ["School of Education", "https://www.uvu.edu/school-of-ed/"],
      social: ["College of Humanities and Social Sciences", "https://www.uvu.edu/chss/"],
      cj: ["Criminal Justice", "https://www.uvu.edu/criminaljustice/"],
      business: ["Woodbury School of Business", "https://www.uvu.edu/woodbury/"],
      culinary: ["Culinary Arts Institute", "https://www.uvu.edu/culinary/"] } },
    { id: "weber", name: "Weber State", full: "Weber State University", city: "Ogden", state: "UT", areas: {
      nursing: ["Nursing", "https://www.weber.edu/nursing"],
      health: ["Dumke College of Health Professions", "https://www.weber.edu/health-professions/"],
      science: ["College of Science", "https://www.weber.edu/science/"],
      geo: ["College of Science (earth and environmental sciences)", "https://www.weber.edu/science/"],
      engineering: ["College of Engineering, Applied Science & Technology", "https://www.weber.edu/east"],
      trades: ["College of Engineering, Applied Science & Technology", "https://www.weber.edu/east"],
      construction: ["Parson Construction Management", "https://www.weber.edu/cm"],
      auto: ["Automotive Technology", "https://www.weber.edu/automotive"],
      cs: ["Computer Science", "https://www.weber.edu/cs"],
      design: ["Visual Art and Design", "https://www.weber.edu/artanddesign/"],
      media: ["Communication", "https://www.weber.edu/communication/"],
      education: ["Moyes School of Education", "https://www.weber.edu/social-sciences-education/school-of-education.html"],
      psych: ["Psychology", "https://www.weber.edu/psychology"],
      social: ["College of Social Sciences & Education", "https://www.weber.edu/social-sciences-education"],
      business: ["Goddard School of Business & Economics", "https://www.weber.edu/business/"] } },
    { id: "suu", name: "SUU", full: "Southern Utah University", city: "Cedar City", state: "UT", areas: {
      nursing: ["Nursing", "https://www.suu.edu/nursing/"],
      health: ["College of Health Sciences", "https://www.suu.edu/healthsciences/"],
      science: ["College of Science, Technology, Engineering, and Mathematics", "https://www.suu.edu/cstem/"],
      engineering: ["College of Science, Technology, Engineering, and Mathematics", "https://www.suu.edu/cstem/"],
      geo: ["College of STEM (geology)", "https://www.suu.edu/cstem/"],
      arts: ["College of Performing and Visual Arts", "https://www.suu.edu/pva/"],
      education: ["College of Education and Human Development", "https://www.suu.edu/ed/"],
      social: ["College of Humanities and Social Sciences", "https://www.suu.edu/hss/"],
      business: ["Dixie L. Leavitt School of Business", "https://www.suu.edu/business/"] } },
    { id: "utahtech", name: "Utah Tech", full: "Utah Tech University", city: "St. George", state: "UT", areas: {
      nursing: ["Health Sciences (nursing)", "https://health.utahtech.edu/"],
      health: ["Health Sciences", "https://health.utahtech.edu/"],
      science: ["Physical Sciences", "https://science.utahtech.edu/"],
      geo: ["Physical Sciences (geology)", "https://science.utahtech.edu/"],
      cs: ["Computing", "https://computing.utahtech.edu/"],
      education: ["Department of Education", "https://education.utahtech.edu/"],
      catalog: ["Utah Tech catalog", "https://catalog.utahtech.edu/"] } },
    { id: "slcc", name: "SLCC", full: "Salt Lake Community College", city: "Salt Lake City", state: "UT", skip: ["kinesiology"], areas: {
      nursing: ["Nursing", "https://www.slcc.edu/nursing/"],
      health: ["Health Sciences programs", "https://www.slcc.edu/academics/areas-of-study/hs.aspx"],
      science: ["Science, Mathematics and Engineering", "https://www.slcc.edu/academics/areas-of-study/sem.aspx"],
      engineering: ["Engineering", "https://www.slcc.edu/engineering/"],
      construction: ["Construction, Manufacturing and Applied Technologies", "https://www.slcc.edu/academics/areas-of-study/cmat.aspx"],
      trades: ["Construction, Manufacturing and Applied Technologies (welding and more)", "https://www.slcc.edu/academics/areas-of-study/cmat.aspx"],
      auto: ["Construction, Manufacturing and Applied Technologies (automotive)", "https://www.slcc.edu/academics/areas-of-study/cmat.aspx"],
      cs: ["Computer Science and Information Technology", "https://www.slcc.edu/academics/areas-of-study/cs-it.aspx"],
      design: ["Visual Art and Design", "https://www.slcc.edu/visualart/"],
      media: ["Arts, Communication and Digital Media", "https://www.slcc.edu/academics/areas-of-study/arts-comm.aspx"],
      education: ["Education", "https://www.slcc.edu/education/"],
      psych: ["Psychology", "https://www.slcc.edu/psychology/"],
      social: ["Social and Behavioral Sciences, Education and Human Services", "https://www.slcc.edu/academics/areas-of-study/soc.aspx"],
      business: ["Business programs", "https://www.slcc.edu/academics/areas-of-study/business.aspx"] } },
    { id: "asu", name: "ASU", full: "Arizona State University", city: "Tempe", state: "AZ", areas: {
      nursing: ["Edson College of Nursing and Health Innovation", "https://nursingandhealth.asu.edu/"],
      health: ["College of Health Solutions", "https://chs.asu.edu/"],
      science: ["School of Life Sciences", "https://sols.asu.edu/"],
      environment: ["Global Institute of Sustainability and Innovation", "https://sustainability-innovation.asu.edu/"],
      geo: ["School of Earth and Space Exploration", "https://sese.asu.edu/"],
      engineering: ["Ira A. Fulton Schools of Engineering", "https://engineering.asu.edu/"],
      construction: ["School of Sustainable Engineering and the Built Environment", "https://ssebe.engineering.asu.edu/"],
      cs: ["School of Computing and Augmented Intelligence", "https://scai.engineering.asu.edu/"],
      architecture: ["The Design School", "https://design.asu.edu/"],
      design: ["The Design School", "https://design.asu.edu/"],
      media: ["Cronkite School of Journalism and Mass Communication", "https://cronkite.asu.edu/"],
      arts: ["Herberger Institute for Design and the Arts", "https://herbergerinstitute.asu.edu/"],
      education: ["Mary Lou Fulton College for Teaching and Learning Innovation", "https://education.asu.edu/"],
      counseling: ["School of Social Work", "https://socialwork.asu.edu/"],
      psych: ["Psychology", "https://psychology.asu.edu/"],
      cj: ["School of Criminology and Criminal Justice", "https://ccj.asu.edu/"],
      business: ["W. P. Carey School of Business", "https://wpcarey.asu.edu/"],
      hospitality: ["School of Community Resources and Development (tourism)", "https://scrd.asu.edu/"],
      law: ["Sandra Day O'Connor College of Law", "https://law.asu.edu/"] } },
    { id: "ua", name: "UArizona", full: "University of Arizona", city: "Tucson", state: "AZ", skip: ["kinesiology"], areas: {
      nursing: ["College of Nursing", "https://nursing.arizona.edu/"],
      medicine: ["College of Medicine", "https://medicine.arizona.edu/"],
      health: ["Zuckerman College of Public Health", "https://publichealth.arizona.edu/"],
      science: ["College of Science", "https://science.arizona.edu/"],
      environment: ["College of Agriculture, Life and Environmental Sciences", "https://cals.arizona.edu/"],
      geo: ["Department of Geosciences", "https://www.geo.arizona.edu/"],
      engineering: ["College of Engineering", "https://engineering.arizona.edu/"],
      cs: ["Computer Science", "https://www.cs.arizona.edu/"],
      cyber: ["College of Information Science", "https://infosci.arizona.edu/"],
      architecture: ["College of Architecture, Planning and Landscape Architecture", "https://capla.arizona.edu/"],
      arts: ["College of Fine Arts", "https://cfa.arizona.edu/"],
      education: ["College of Education", "https://coe.arizona.edu/"],
      psych: ["Psychology", "https://psychology.arizona.edu/"],
      social: ["College of Social and Behavioral Sciences", "https://sbs.arizona.edu/"],
      business: ["Eller College of Management", "https://eller.arizona.edu/"],
      law: ["James E. Rogers College of Law", "https://law.arizona.edu/"] } },
    { id: "nau", name: "NAU", full: "Northern Arizona University", city: "Flagstaff", state: "AZ", areas: {
      nursing: ["Sanghi College of Nursing", "https://nau.edu/college-nursing/"],
      health: ["College of Health and Human Services", "https://nau.edu/college-health-human-services/"],
      science: ["College of the Environment, Forestry, and Natural Sciences", "https://nau.edu/college-environment-forestry-natural-sciences/"],
      environment: ["School of Forestry", "https://nau.edu/school-forestry/"],
      geo: ["College of the Environment, Forestry, and Natural Sciences", "https://nau.edu/college-environment-forestry-natural-sciences/"],
      cs: ["School of Informatics, Computing, and Cyber Systems", "https://nau.edu/school-informatics-computing-cyber-systems/"],
      design: ["School of Art and Design", "https://nau.edu/school-art-design/"],
      education: ["College of Education", "https://nau.edu/college-education/"],
      psych: ["Psychological Sciences", "https://in.nau.edu/department-psychological-sciences/"],
      cj: ["Criminology and Criminal Justice", "https://in.nau.edu/department-criminology-criminal-justice/"],
      social: ["College of Social and Behavioral Sciences", "https://nau.edu/college-social-behavioral-sciences/"],
      business: ["W. A. Franke College of Business", "https://nau.edu/college-business/"],
      hospitality: ["School of Hotel and Restaurant Management", "https://nau.edu/school-hotel-restaurant-management/"],
      catalog: ["NAU academic catalog", "https://catalog.nau.edu/Catalog/"] } },
    { id: "gcu", name: "GCU", full: "Grand Canyon University", city: "Phoenix", state: "AZ", areas: {
      nursing: ["College of Nursing and Health Care Professions", "https://www.gcu.edu/college-of-nursing-and-health-care-professions.php"],
      science: ["College of Natural Sciences", "https://www.gcu.edu/college-of-natural-sciences"],
      engineering: ["College of Engineering and Technology", "https://www.gcu.edu/college-of-engineering-and-technology"],
      arts: ["College of Arts and Media", "https://www.gcu.edu/college-of-arts-and-media"],
      education: ["College of Education", "https://www.gcu.edu/college-of-education.php"],
      social: ["College of Humanities and Social Sciences", "https://www.gcu.edu/college-of-humanities-and-social-sciences"],
      business: ["Colangelo College of Business", "https://www.gcu.edu/colangelo-college-of-business.php"] } },
    { id: "maricopa", name: "Maricopa", full: "Maricopa Community Colleges", city: "Phoenix area (10 colleges)", state: "AZ", areas: {
      finder: ["Degree and certificate finder", "https://www.maricopa.edu/degrees-certificates"] } },
    { id: "pima", name: "Pima CC", full: "Pima Community College", city: "Tucson", state: "AZ", areas: {
      finder: ["Program search", "https://pima.edu/academics-programs/program-search/index"] } }
  ];

  // Areas that fit each field, best fit first. "finder" (community college program search) and
  // "catalog" (university catalog) are search pages, listed only for fields those schools offer.
  const FIELD_AREAS = {
    nursing: ["nursing", "finder"],
    premed: ["medicine", "science"],
    kinesiology: ["kinesiology", "health"],
    allied: ["health", "nursing", "finder"],
    lab: ["science"],
    fire: ["fire", "finder"],
    environmental: ["environment", "science"],
    geoscience: ["geo"],
    engineering: ["engineering", "catalog", "finder"],
    cs: ["cs", "engineering", "finder"],
    cyber: ["cyber", "cs", "engineering", "finder"],
    design: ["design", "arts", "finder"],
    media: ["media", "arts"],
    architecture: ["architecture"],
    education: ["education"],
    counseling: ["counseling", "psych", "social"],
    psychology: ["psych", "social", "catalog"],
    cj: ["cj", "social", "finder"],
    trades: ["trades", "finder"],
    auto: ["auto", "finder"],
    construction: ["construction", "engineering", "finder"],
    business: ["business", "catalog", "finder"],
    marketing: ["business", "catalog"],
    accounting: ["business", "catalog", "finder"],
    hospitality: ["hospitality"],
    culinary: ["culinary", "finder"],
    law: ["law"]
  };
  const FIELD_LABEL = {
    nursing: "nursing", premed: "pre-med", kinesiology: "kinesiology", allied: "health careers", lab: "lab science",
    fire: "fire science", environmental: "environmental science", geoscience: "geoscience", engineering: "engineering",
    cs: "computer science", cyber: "cybersecurity", design: "design", media: "media", architecture: "architecture",
    education: "education", counseling: "counseling", psychology: "psychology", cj: "criminal justice", trades: "welding and trades",
    auto: "automotive", construction: "construction", business: "business", marketing: "marketing", accounting: "accounting",
    hospitality: "hospitality", culinary: "culinary arts", law: "pre-law"
  };
  const SEARCH_AREAS = ["finder", "catalog"];

  OUT_OF_STATE.forEach((s, i) => {
    INST[s.id] = { id: s.id, name: s.name, full: s.full, city: s.city, state: s.state, rank: (s.state === "UT" ? 10 : 30) + i };
    Object.keys(FIELD_AREAS).forEach((f) => {
      if (s.skip && s.skip.includes(f)) return;
      const area = FIELD_AREAS[f].find((a) => s.areas[a]);
      if (!area) return;
      const [label, url] = s.areas[area];
      FIELDS[f].push(link(s.id, SEARCH_AREAS.includes(area) ? label + ": " + FIELD_LABEL[f] : label, url));
    });
  });

  const STATES = [
    { id: "NV", name: "Nevada" },
    { id: "UT", name: "Utah" },
    { id: "AZ", name: "Arizona" }
  ];

  const EXPLORE_MORE = [
    { label: "College Navigator (U.S. Dept. of Education)", url: "https://nces.ed.gov/collegenavigator/" },
    { label: "O*NET OnLine career profiles", url: "https://www.onetonline.org/" }
  ];

  window.WCTA_COLLEGES = { INST, FIELDS, STATES, EXPLORE_MORE };
})();
