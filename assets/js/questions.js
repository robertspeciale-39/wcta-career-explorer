/* Question bank for the WCTA Career Explorer.
   All items are original. Structure follows published career-interest research
   (Holland RIASEC; O*NET Interest Profiler format: 10 items per interest type, rated 0-4). */
(function () {
  const TYPES = {
    R: { key: "R", name: "Realistic",     blurb: "Hands-on, practical, building and fixing" },
    I: { key: "I", name: "Investigative", blurb: "Curious, analytical, figuring things out" },
    A: { key: "A", name: "Artistic",      blurb: "Creative, expressive, original ideas" },
    S: { key: "S", name: "Social",        blurb: "Helping, teaching, working with people" },
    E: { key: "E", name: "Enterprising",  blurb: "Leading, persuading, starting things" },
    C: { key: "C", name: "Conventional",  blurb: "Organized, accurate, following systems" }
  };

  const LIKERT_INTEREST = ["Strongly dislike", "Dislike", "Unsure", "Like", "Strongly like"];
  const LIKERT_CONFIDENCE = ["Not at all", "A little", "Somewhat", "Pretty well", "Very well"];
  const LIKERT_IMPORTANCE = ["Not important", "Slightly", "Moderately", "Very", "Essential"];

  const interest = {
    R: [
      "Build or fix things with tools or machines",
      "Work outdoors as part of a crew or job site",
      "Repair a bike, car, or small engine",
      "Install wiring, plumbing, or equipment",
      "Operate heavy equipment or specialized vehicles",
      "Put products together from parts and instructions",
      "Work hands-on with plants, animals, or natural resources",
      "Set up and test physical equipment like sensors or servers",
      "Weld, cut, or shape metal or wood",
      "Inspect a building or machine to find what is broken"
    ],
    I: [
      "Run an experiment and record the results",
      "Test different ideas to figure out why something is not working",
      "Study how the human body or living things function",
      "Analyze data to find patterns",
      "Read about new scientific discoveries",
      "Solve tricky math or logic puzzles",
      "Investigate how an accident, crime, or outbreak happened",
      "Research a question using many different sources",
      "Build a model or simulation to predict what will happen",
      "Study how computer systems work and how they can be attacked or protected"
    ],
    A: [
      "Draw, paint, or design graphics",
      "Write stories, scripts, or song lyrics",
      "Perform in music, theater, or dance",
      "Edit photos or video",
      "Design how a room, outfit, or product looks",
      "Create a character or a world for a game or story",
      "Come up with original ideas for a campaign or project",
      "Take photographs that tell a story",
      "Design the look and feel of a website or app",
      "Make crafts, sculptures, or handmade items"
    ],
    S: [
      "Tutor or teach younger students",
      "Comfort someone who is upset",
      "Care for people who are sick or injured",
      "Volunteer for a community cause",
      "Coach a team or lead a youth group",
      "Listen to people's problems and offer advice",
      "Teach a group how to do a new skill",
      "Help older adults or people with disabilities",
      "Work on a team that serves the public",
      "Help two friends settle a disagreement"
    ],
    E: [
      "Start your own business",
      "Persuade people to support an idea or buy something",
      "Lead a team toward a goal",
      "Negotiate a deal",
      "Run for a student office",
      "Plan and promote an event",
      "Manage the budget for a club or project",
      "Pitch an idea to a group of people",
      "Take charge when a group needs direction",
      "Sell products or raise money for a cause"
    ],
    C: [
      "Keep records organized and accurate",
      "Use spreadsheets to track information",
      "Follow step-by-step procedures carefully",
      "Check documents for mistakes",
      "Schedule appointments and keep calendars in order",
      "Track expenses or balance accounts",
      "Maintain an inventory or filing system",
      "Enter data quickly and accurately",
      "Make sure rules and regulations are followed",
      "Prepare reports where every detail must be right"
    ]
  };

  // Interleave types so the quiz does not feel like six blocks of the same thing.
  const interestItems = [];
  for (let n = 0; n < 10; n++) {
    ["R", "I", "A", "S", "E", "C"].forEach((t, k) => {
      interestItems.push({ id: "int-" + t + (n + 1), type: t, text: interest[t][n] });
    });
  }

  const skills = [
    { key: "verbal",      label: "Explaining ideas clearly in writing and speech" },
    { key: "numeric",     label: "Working with numbers, percentages, and word problems" },
    { key: "scientific",  label: "Understanding how science works and applying it" },
    { key: "technical",   label: "Learning new software, electronics, or technology" },
    { key: "mechanical",  label: "Understanding how machines and tools work" },
    { key: "spatial",     label: "Picturing objects and layouts in your mind" },
    { key: "creative",    label: "Coming up with original ideas and designs" },
    { key: "people",      label: "Understanding and helping other people" },
    { key: "leadership",  label: "Leading a group and making decisions" },
    { key: "organizing",  label: "Planning, organizing, and keeping track of details" },
    { key: "persistence", label: "Sticking with a hard problem until it is solved" },
    { key: "handson",     label: "Working carefully with your hands" }
  ];

  /* Skill check: 12 short untimed items. This is a screener, not a validated test. */
  const rot = (cells) => norm(cells.map(([x, y]) => [-y, x]));
  const mirror = (cells) => norm(cells.map(([x, y]) => [-x, y]));
  function norm(cells) {
    const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1]));
    return cells.map(([x, y]) => [x - mx, y - my]);
  }
  const L = [[0, 0], [0, 1], [0, 2], [1, 2]];
  const T = [[0, 0], [1, 0], [2, 0], [1, 1]];
  const F = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
  const F180 = rot(rot(F));
  const Fmoved = [[1, 0], [2, 0], [0, 1], [1, 1], [2, 2]];
  const Plus = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];

  const aptitude = [
    { id: "apt-v1", domain: "verbal", prompt: "Doctor is to patient as teacher is to ____.", options: ["student", "school", "lesson", "classroom"], answer: 0 },
    { id: "apt-v2", domain: "verbal", prompt: "Which word is closest in meaning to \"scarce\"?", options: ["heavy", "rare", "sudden", "careful"], answer: 1 },
    { id: "apt-v3", domain: "verbal", prompt: "\"The committee postponed the vote until more data was available.\" What happened?", options: ["The vote was cancelled for good.", "The committee approved the plan.", "The vote was delayed.", "The data was thrown out."], answer: 2 },

    { id: "apt-n1", domain: "numeric", prompt: "A $40 shirt is 25% off. What is the sale price?", options: ["$28", "$30", "$32", "$35"], answer: 1 },
    { id: "apt-n2", domain: "numeric", prompt: "What number comes next? 3, 6, 12, 24, ___", options: ["36", "42", "48", "54"], answer: 2 },
    { id: "apt-n3", domain: "numeric", prompt: "A recipe uses 2 cups of flour for 12 cookies. How many cups are needed for 30 cookies?", options: ["4", "5", "6", "7"], answer: 1 },

    { id: "apt-s1", domain: "spatial", prompt: "You are facing north. You turn right 90 degrees, then turn all the way around. Which way are you facing now?", options: ["North", "East", "South", "West"], answer: 3 },
    { id: "apt-s2", domain: "spatial", prompt: "Which shape is the same as the first shape, only turned (not flipped)?", shape: { ref: L, options: [T, mirror(L), rot(L), rot(mirror(L))], answer: 2 } },
    { id: "apt-s3", domain: "spatial", prompt: "Which shape is the same as the first shape, only turned (not flipped)?", shape: { ref: F, options: [mirror(F), F180, Fmoved, Plus], answer: 1 } },

    { id: "apt-m1", domain: "mechanical", prompt: "Gear A turns clockwise and meshes directly with Gear B. Which way does Gear B turn?", options: ["Clockwise", "Counterclockwise", "It does not turn", "It turns back and forth"], answer: 1 },
    { id: "apt-m2", domain: "mechanical", prompt: "You need to loosen a tight bolt. Which wrench makes it easiest?", options: ["A short wrench", "A long wrench", "Both are the same", "A wrench with a thin handle"], answer: 1 },
    { id: "apt-m3", domain: "mechanical", prompt: "Which is the strongest way to brace a rectangular frame so it will not collapse sideways?", options: ["Add more weight on top", "Add a diagonal brace to form triangles", "Make the corners rounder", "Paint it with a thicker coat"], answer: 1 }
  ];

  const values = [
    { key: "achievement",  label: "Achievement",        text: "Using my abilities and seeing results from my work" },
    { key: "conditions",   label: "Working conditions", text: "Good pay, job security, and a comfortable workplace" },
    { key: "recognition",  label: "Recognition",        text: "Advancing, leading, and being respected for what I do" },
    { key: "relationships",label: "Relationships",      text: "Working with friendly coworkers and helping others" },
    { key: "support",      label: "Support",            text: "Having a boss and a team that back me up and treat me fairly" },
    { key: "independence", label: "Independence",       text: "Making my own decisions and working on my own" }
  ];

  window.WCTA_QUIZ = { TYPES, LIKERT_INTEREST, LIKERT_CONFIDENCE, LIKERT_IMPORTANCE, interestItems, skills, aptitude, values };
})();
