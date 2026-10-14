// Readify IELTS - Targeted Drill: Ancient Roman Aqueducts (14 Questions, 1 Passage)

export const drillRomanAqueducts = {
  id: "drill-roman-aqueducts",
  title: "Targeted Drill: The Architecture of Ancient Roman Aqueducts",
  type: "academic",
  isFullTest: false,
  durationMinutes: 20,
  difficulty: "hard",
  topic: "History & Engineering",
  description: "A 14-question historical engineering drill on Roman hydraulic surveying, inverted siphons, and pozzolana volcanic cement.",
  passages: [
    {
      id: "aqueduct-passage-1",
      number: 1,
      title: "The Hydraulic Engineering of Roman Aqueducts",
      subtitle: "Surveying instruments, subterranean conduits, and monumental arcade bridges across the Empire",
      paragraphs: [
        {
          tag: "A",
          text: "Few structural achievements epitomize the administrative and technological mastery of the Roman Empire as vividly as its continental aqueduct networks. Built over a span of five centuries, these monumental water systems channeled millions of liters of potable spring water daily into imperial capitals, bath complexes, and decorative public fountains. While popular imagery typically portrays aqueducts as grand multi-tiered stone arch bridges traversing picturesque valleys, more than eighty percent of an average aqueduct's overall length was actually concealed beneath the earth's surface in subterranean masonry conduits."
        },
        {
          tag: "B",
          text: "The primary engineering challenge lay in sustaining an extraordinarily gentle and consistent downward hydraulic gradient over distances exceeding fifty kilometers. If the gradient was excessively steep, the rushing torrent would scour and fracture the interior masonry lining; if too shallow, silt accumulation would rapidly choke the channel. Roman surveyors (libratores) achieved astonishing precision using specialized optical instruments: the groma for laying straight transit lines, and the chorobates—a massive six-meter wooden bench fitted with plumb lines and a central water trough for establishing dead-level horizontal planes. With these instruments, surveyors maintained steady gradients as shallow as one vertical meter per kilometer of conduit."
        },
        {
          tag: "C",
          text: "Material technology was the silent foundation of their endurance. Conduits were constructed from opus caementicium—a revolutionary Roman concrete blended with pozzolana, a reactive volcanic ash mined from the slopes of Mount Vesuvius. Pozzolanic concrete possessed the extraordinary property of hydraulic setting: rather than weakening under moisture, the chemical reaction between volcanic aluminosilicates and slaked lime caused the mortar to cure and petrify even while completely submerged in flowing water. Channels were further sealed with a smooth coating of opus signinum, a waterproof plaster incorporating crushed terracotta tiles."
        },
        {
          tag: "D",
          text: "When an aqueduct route encountered deep, precipitous river valleys where masonry arcades would be prohibitively tall or structurally vulnerable, Roman engineers deployed the inverted siphon. Instead of keeping water in an open gravity channel, water was collected in a massive header tank at the valley lip and funneled into sealed lead or terracotta pipelines that plunged down to the valley floor and climbed up the opposing hill. Driven by hydrostatic pressure, the liquid rose in the receiving tank on the opposite side, conforming strictly to the physical law that fluids seek their own level. Venting towers were installed along siphon shoulders to alleviate destructive air pockets and hydraulic hammer shocks."
        }
      ],
      questionGroups: [
        {
          id: "aqg-1",
          passageIndex: 0,
          questionType: "matching_headings",
          title: "Questions 1–4",
          instruction: "Reading Passage 1 has four paragraphs, A–D. Choose the correct heading for each paragraph from the list below. Write the correct number, i–vi.",
          headingsList: [
            { roman: "i", text: "Hydraulic setting concrete and terracotta plaster" },
            { roman: "ii", text: "Subterranean prevalence versus popular architectural imagery" },
            { roman: "iii", text: "The economics of water taxation in Rome" },
            { roman: "iv", text: "Inverted siphons and pressurized pipeline crossings" },
            { roman: "v", text: "Surveying instruments and gradient calculations" },
            { roman: "vi", text: "Lead poisoning among patrician bathers" }
          ],
          questions: [
            {
              id: "aq1",
              number: 1,
              prompt: "Paragraph A",
              answerKey: "ii",
              evidenceParagraph: "Paragraph A",
              evidence: "more than eighty percent of an average aqueduct's overall length was actually concealed beneath the earth's surface in subterranean masonry conduits.",
              explanation: "Paragraph A addresses how aqueducts were mostly underground rather than the popular image of arch bridges."
            },
            {
              id: "aq2",
              number: 2,
              prompt: "Paragraph B",
              answerKey: "v",
              evidenceParagraph: "Paragraph B",
              evidence: "Roman surveyors (libratores) achieved astonishing precision using specialized optical instruments: the groma... and the chorobates...",
              explanation: "Paragraph B details surveying tools (groma, chorobates) and maintaining hydraulic gradients."
            },
            {
              id: "aq3",
              number: 3,
              prompt: "Paragraph C",
              answerKey: "i",
              evidenceParagraph: "Paragraph C",
              evidence: "opus caementicium... blended with pozzolana... Channels were further sealed with a smooth coating of opus signinum, a waterproof plaster...",
              explanation: "Paragraph C describes pozzolanic hydraulic concrete and terracotta plaster."
            },
            {
              id: "aq4",
              number: 4,
              prompt: "Paragraph D",
              answerKey: "iv",
              evidenceParagraph: "Paragraph D",
              evidence: "Roman engineers deployed the inverted siphon... sealed lead or terracotta pipelines that plunged down to the valley floor and climbed up...",
              explanation: "Paragraph D describes inverted siphons across deep valleys."
            }
          ]
        },
        {
          id: "aqg-2",
          passageIndex: 0,
          questionType: "diagram_label",
          title: "Questions 5–9",
          instruction: "Label the diagram of the Roman Inverted Siphon below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          diagramSvg: `<svg viewBox="0 0 520 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="510" height="190" rx="8" fill="var(--bg-surface-subtle)" stroke="var(--border-main)"/>
            <!-- Left Hill with Header Tank -->
            <polygon points="10,80 120,80 160,180 10,180" fill="var(--bg-surface)" stroke="var(--border-strong)"/>
            <rect x="80" y="55" width="45" height="25" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
            <text x="102" y="72" font-size="9" font-weight="bold" fill="#0c4a6e" text-anchor="middle">Tank [5]</text>
            <!-- Right Hill with Receiving Tank -->
            <polygon points="360,180 400,90 510,90 510,180" fill="var(--bg-surface)" stroke="var(--border-strong)"/>
            <rect x="395" y="65" width="45" height="25" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
            <text x="417" y="82" font-size="9" font-weight="bold" fill="#0c4a6e" text-anchor="middle">Tank [6]</text>
            <!-- Siphon Pipe across Valley -->
            <path d="M 125 75 L 160 170 L 360 170 L 395 85" fill="none" stroke="#f59e0b" stroke-width="6"/>
            <text x="260" y="162" font-size="10" font-weight="bold" fill="#78350f" text-anchor="middle">Pipeline [7]</text>
            <!-- Vent Tower on shoulder -->
            <rect x="150" y="110" width="14" height="40" fill="#94a3b8" stroke="#475569"/>
            <text x="157" y="105" font-size="8" font-weight="bold" fill="var(--text-main)" text-anchor="middle">Tower [8]</text>
            <!-- Principle force -->
            <text x="260" y="115" font-size="11" font-weight="bold" fill="var(--color-primary)" text-anchor="middle">Driven by [9]</text>
          </svg>`,
          questions: [
            {
              id: "aq5",
              number: 5,
              prompt: "Top reservoir at valley lip: [5] ______",
              answerKey: ["header tank"],
              evidenceParagraph: "Paragraph D",
              evidence: "water was collected in a massive header tank at the valley lip...",
              explanation: "Paragraph D designates the header tank at the valley lip."
            },
            {
              id: "aq6",
              number: 6,
              prompt: "Destination tank on the opposite hillside: [6] ______",
              answerKey: ["receiving tank"],
              evidenceParagraph: "Paragraph D",
              evidence: "the liquid rose in the receiving tank on the opposite side...",
              explanation: "Paragraph D names the receiving tank."
            },
            {
              id: "aq7",
              number: 7,
              prompt: "Pressurized underground conduits made of [7] ______ or lead",
              answerKey: ["terracotta"],
              evidenceParagraph: "Paragraph D",
              evidence: "funneled into sealed lead or terracotta pipelines...",
              explanation: "Paragraph D mentions lead or terracotta pipelines."
            },
            {
              id: "aq8",
              number: 8,
              prompt: "Structures preventing shock damage on pipeline shoulders: [8] ______",
              answerKey: ["venting towers", "vent towers"],
              evidenceParagraph: "Paragraph D",
              evidence: "Venting towers were installed along siphon shoulders to alleviate destructive air pockets...",
              explanation: "Paragraph D specifies venting towers."
            },
            {
              id: "aq9",
              number: 9,
              prompt: "Physical force driving water uphill: [9] ______",
              answerKey: ["hydrostatic pressure"],
              evidenceParagraph: "Paragraph D",
              evidence: "Driven by hydrostatic pressure, the liquid rose in the receiving tank...",
              explanation: "Paragraph D states the water is driven by hydrostatic pressure."
            }
          ]
        },
        {
          id: "aqg-3",
          passageIndex: 0,
          questionType: "completion_summary",
          title: "Questions 10–14",
          instruction: "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          questions: [
            {
              id: "aq10",
              number: 10,
              prompt: "Roman surveyors employed an optical instrument with a water trough called the [10] ______.",
              answerKey: ["chorobates"],
              evidenceParagraph: "Paragraph B",
              evidence: "the chorobates—a massive six-meter wooden bench fitted with plumb lines and a central water trough...",
              explanation: "Paragraph B defines the chorobates."
            },
            {
              id: "aq11",
              number: 11,
              prompt: "Concrete was enriched with [11] ______, a volcanic ash that enabled it to cure underwater.",
              answerKey: ["pozzolana"],
              evidenceParagraph: "Paragraph C",
              evidence: "blended with pozzolana, a reactive volcanic ash mined from the slopes of Mount Vesuvius.",
              explanation: "Paragraph C identifies pozzolana volcanic ash."
            },
            {
              id: "aq12",
              number: 12,
              prompt: "Waterproof plaster called [12] ______ was composed of slaked lime and crushed terracotta.",
              answerKey: ["opus signinum"],
              evidenceParagraph: "Paragraph C",
              evidence: "further sealed with a smooth coating of opus signinum, a waterproof plaster incorporating crushed terracotta tiles.",
              explanation: "Paragraph C names opus signinum."
            },
            {
              id: "aq13",
              number: 13,
              prompt: "More than [13] ______ percent of an aqueduct network ran completely underground.",
              answerKey: ["eighty", "80", "80%"],
              evidenceParagraph: "Paragraph A",
              evidence: "more than eighty percent of an average aqueduct's overall length was actually concealed beneath the earth's surface...",
              explanation: "Paragraph A confirms more than eighty percent was underground."
            },
            {
              id: "aq14",
              number: 14,
              prompt: "Surveyors kept slope gradients as gentle as one vertical meter per [14] ______.",
              answerKey: ["kilometer", "km"],
              evidenceParagraph: "Paragraph B",
              evidence: "maintained steady gradients as shallow as one vertical meter per kilometer of conduit.",
              explanation: "Paragraph B states one vertical meter per kilometer."
            }
          ]
        }
      ]
    }
  ]
};
