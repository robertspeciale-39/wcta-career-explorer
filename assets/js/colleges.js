/* College program links, keyed by field of study.
   Ordering rule (applied in the results page too): UNLV, UNR, CSN first, then other schools.
   Links point to program or college pages; each is checked in QA (see README). */
(function () {
  const INST = {
    unlv: { id: "unlv", name: "UNLV", full: "University of Nevada, Las Vegas", city: "Las Vegas", rank: 0 },
    unr:  { id: "unr",  name: "UNR",  full: "University of Nevada, Reno", city: "Reno", rank: 1 },
    csn:  { id: "csn",  name: "CSN",  full: "College of Southern Nevada", city: "Las Vegas area", rank: 2 },
    nsu:  { id: "nsu",  name: "Nevada State University", full: "Nevada State University", city: "Henderson", rank: 3 },
    tmcc: { id: "tmcc", name: "TMCC", full: "Truckee Meadows Community College", city: "Reno", rank: 4 }
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

  const EXPLORE_MORE = [
    { label: "College Navigator (U.S. Dept. of Education)", url: "https://nces.ed.gov/collegenavigator/" },
    { label: "O*NET OnLine career profiles", url: "https://www.onetonline.org/" }
  ];

  window.WCTA_COLLEGES = { INST, FIELDS, EXPLORE_MORE };
})();
