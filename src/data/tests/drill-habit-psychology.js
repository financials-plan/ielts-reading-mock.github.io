// Readify IELTS - Targeted Drill: Psychology of Habit Formation (10 Questions, 1 Passage)

export const drillHabitPsychology = {
  id: "drill-habit-psychology",
  title: "Targeted Drill: The Psychology and Neuroscience of Habits",
  type: "academic",
  isFullTest: false,
  durationMinutes: 15,
  difficulty: "easy",
  topic: "Psychology & Behavioral Science",
  description: "A 10-question behavioral science drill on the neurological habit loop, dopamine prediction errors, and friction reduction.",
  passages: [
    {
      id: "habit-passage-1",
      number: 1,
      title: "The Architecture of Automaticity: How Habits Shape Human Action",
      subtitle: "Neurological loops in the basal ganglia, contextual cues, and cognitive friction",
      paragraphs: [
        {
          tag: "A",
          text: "Virtually forty percent of daily human behavior is governed not by deliberate conscious decisions, but by ingrained automatic habits. In neurobiology, a habit is defined as an automated sequence of actions triggered by a specific environmental contextual cue, maintained through repetition, and reinforced by neurological reward. Seminal research at the Massachusetts Institute of Technology identified the anatomical seat of habit execution within the basal ganglia—an evolutionarily ancient subcortical cluster situated deep beneath the cerebral cortex. While deliberate planning heavily taxes the energy-hungry prefrontal cortex, routing familiar routines through the basal ganglia conserves precious cognitive bandwidth for unforeseen survival dilemmas."
        },
        {
          tag: "B",
          text: "MIT researchers modeled this phenomenon as the three-part 'habit loop': cue, routine, and reward. The cue acts as an environmental catalyst, informing the brain which routine to launch. Once triggered, the behavioral routine unfolds almost subconsciously. Finally, the reward reinforces the neurological feedback loop by releasing dopamine within the nucleus accumbens. Crucially, as a habit consolidates over time, neurochemical activity changes: dopamine stops spiking after the reward and begins surging upon perception of the cue itself. This anticipatory spike constitutes biological craving, compelling an individual to execute the routine to alleviate psychological tension."
        },
        {
          tag: "C",
          text: "Modern behavioral economists like Wendy Wood and James Clear argue that willpower is an extraordinarily fragile strategy for sustaining behavioral modification. Instead, environmental architecture—specifically manipulating 'activation friction'—proves far more durable. Adding small friction barriers (such as placing a smartphone in another room or requiring an alphanumeric password to unlock entertainment apps) dramatically curtails unwanted behaviors. Conversely, eliminating friction (such as setting running shoes beside the bed or preparing fresh vegetables in advance) leverages default human laziness to foster healthy rituals."
        }
      ],
      questionGroups: [
        {
          id: "hqg-1",
          passageIndex: 0,
          questionType: "mcq",
          title: "Questions 1–4",
          instruction: "Choose the correct letter, A, B, C, or D.",
          questions: [
            {
              id: "h1",
              number: 1,
              prompt: "What percentage of daily human behavior is estimated to be habit-driven?",
              options: [
                { letter: "A", text: "Around twenty percent" },
                { letter: "B", text: "Approximately forty percent" },
                { letter: "C", text: "More than eighty percent" },
                { letter: "D", text: "Virtually one hundred percent" }
              ],
              answerKey: "B",
              evidenceParagraph: "Paragraph A",
              evidence: "Virtually forty percent of daily human behavior is governed not by deliberate conscious decisions, but by ingrained automatic habits.",
              explanation: "Paragraph A states roughly forty percent."
            },
            {
              id: "h2",
              number: 2,
              prompt: "Why does the human brain delegate routine tasks to the basal ganglia?",
              options: [
                { letter: "A", text: "To permanently disable the nucleus accumbens" },
                { letter: "B", text: "To conserve cognitive energy in the prefrontal cortex" },
                { letter: "C", text: "To speed up physical motor muscle growth" },
                { letter: "D", text: "To prevent memory decay during sleep cycles" }
              ],
              answerKey: "B",
              evidenceParagraph: "Paragraph A",
              evidence: "routing familiar routines through the basal ganglia conserves precious cognitive bandwidth for unforeseen survival dilemmas.",
              explanation: "Paragraph A explains that delegating routines conserves prefrontal cortex energy (B)."
            },
            {
              id: "h3",
              number: 3,
              prompt: "How does dopamine release change after a habit becomes deeply established?",
              options: [
                { letter: "A", text: "It ceases to be released anywhere in the central nervous system." },
                { letter: "B", text: "It spikes upon perceiving the initial environmental cue." },
                { letter: "C", text: "It only releases during intense physical exercise." },
                { letter: "D", text: "It doubles after the physical routine terminates." }
              ],
              answerKey: "B",
              evidenceParagraph: "Paragraph B",
              evidence: "dopamine stops spiking after the reward and begins surging upon perception of the cue itself.",
              explanation: "Paragraph B explicitly states that dopamine shifts to surging upon perception of the cue."
            },
            {
              id: "h4",
              number: 4,
              prompt: "What does the author suggest regarding personal willpower in habit change?",
              options: [
                { letter: "A", text: "It is an unreliable tool compared to altering environmental friction." },
                { letter: "B", text: "It is the sole dependable method for breaking addictive loops." },
                { letter: "C", text: "It can be expanded infinitely through meditation exercises." },
                { letter: "D", text: "It has no biological basis in neuroscience." }
              ],
              answerKey: "A",
              evidenceParagraph: "Paragraph C",
              evidence: "willpower is an extraordinarily fragile strategy for sustaining behavioral modification. Instead, environmental architecture... proves far more durable.",
              explanation: "Paragraph C describes willpower as extraordinarily fragile compared to environmental architecture (A)."
            }
          ]
        },
        {
          id: "hqg-2",
          passageIndex: 0,
          questionType: "matching_features",
          title: "Questions 5–7",
          instruction: "Match each brain region with its specific functional role described in Paragraphs A and B. Write the correct letter, A, B, or C.",
          questions: [
            {
              id: "h5",
              number: 5,
              prompt: "Coordinates conscious, high-energy deliberate planning: [5] ______",
              options: [
                { letter: "A", text: "Prefrontal cortex" },
                { letter: "B", text: "Basal ganglia" },
                { letter: "C", text: "Nucleus accumbens" }
              ],
              answerKey: "A",
              evidenceParagraph: "Paragraph A",
              evidence: "deliberate planning heavily taxes the energy-hungry prefrontal cortex...",
              explanation: "Paragraph A notes deliberate planning taxes the prefrontal cortex (A)."
            },
            {
              id: "h6",
              number: 6,
              prompt: "Executes subconscious automatic routine sequences: [6] ______",
              options: [
                { letter: "A", text: "Prefrontal cortex" },
                { letter: "B", text: "Basal ganglia" },
                { letter: "C", text: "Nucleus accumbens" }
              ],
              answerKey: "B",
              evidenceParagraph: "Paragraph A",
              evidence: "anatomical seat of habit execution within the basal ganglia...",
              explanation: "Paragraph A identifies the basal ganglia as the seat of habit execution (B)."
            },
            {
              id: "h7",
              number: 7,
              prompt: "Site of dopamine release in response to neurological reward: [7] ______",
              options: [
                { letter: "A", text: "Prefrontal cortex" },
                { letter: "B", text: "Basal ganglia" },
                { letter: "C", text: "Nucleus accumbens" }
              ],
              answerKey: "C",
              evidenceParagraph: "Paragraph B",
              evidence: "releasing dopamine within the nucleus accumbens.",
              explanation: "Paragraph B identifies the nucleus accumbens as the site of dopamine release (C)."
            }
          ]
        },
        {
          id: "hqg-3",
          passageIndex: 0,
          questionType: "completion_note",
          title: "Questions 8–10",
          instruction: "Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          questions: [
            {
              id: "h8",
              number: 8,
              prompt: "The three elements of MIT's model are the cue, routine, and [8] ______.",
              answerKey: ["reward"],
              evidenceParagraph: "Paragraph B",
              evidence: "modeled this phenomenon as the three-part 'habit loop': cue, routine, and reward.",
              explanation: "Paragraph B identifies cue, routine, and reward."
            },
            {
              id: "h9",
              number: 9,
              prompt: "The surge of anticipatory dopamine corresponds to a biological [9] ______.",
              answerKey: ["craving"],
              evidenceParagraph: "Paragraph B",
              evidence: "This anticipatory spike constitutes biological craving...",
              explanation: "Paragraph B states this spike constitutes biological craving."
            },
            {
              id: "h10",
              number: 10,
              prompt: "Behavioral architects modify physical habits by adjusting [10] ______ barriers.",
              answerKey: ["activation friction", "friction"],
              evidenceParagraph: "Paragraph C",
              evidence: "specifically manipulating 'activation friction'—proves far more durable. Adding small friction barriers...",
              explanation: "Paragraph C mentions manipulating activation friction."
            }
          ]
        }
      ]
    }
  ]
};
