// Readify IELTS - Targeted Drill: AI in Clinical Medicine (13 Questions, 1 Passage)

export const drillAiMedicine = {
  id: "drill-ai-medicine",
  title: "Targeted Drill: Artificial Intelligence in Clinical Medicine",
  type: "academic",
  isFullTest: false,
  durationMinutes: 20,
  difficulty: "medium",
  topic: "Technology & Healthcare",
  description: "A focused 13-question single-passage drill on convolutional neural networks, algorithmic bias, and automated medical imaging diagnostics.",
  passages: [
    {
      id: "drill-passage-1",
      number: 1,
      title: "Artificial Intelligence in Clinical Diagnostics",
      subtitle: "How deep learning algorithms and predictive analytics are reshaping radiology, pathology, and clinical decision-making",
      paragraphs: [
        {
          tag: "A",
          text: "In the span of a single decade, artificial intelligence has migrated from experimental academic laboratories directly into acute hospital settings. The most prominent successes have materialized within medical image interpretation, where convolutional neural networks (CNNs) analyze radiological scans with superhuman speed. In dermatology, deep learning models trained on hundreds of thousands of dermoscopic images match or exceed board-certified dermatologists in distinguishing benign melanocytic nevi from malignant melanoma. Similarly, automated ophthalmic screening algorithms detect diabetic retinopathy and macular edema from fundus photography in seconds, enabling prompt interventions before permanent visual impairment occurs."
        },
        {
          tag: "B",
          text: "Beyond static pattern recognition, predictive algorithmic systems are transforming critical care medicine. Intensive care units generate vast streams of physiological data, including arterial oxygen saturation, continuous cardiac telemetry, and arterial lactate levels. Machine learning models such as DeepSepsis process these high-dimensional temporal datasets to forecast septic shock up to six hours prior to clinical onset. Because each hour of delayed antimicrobial therapy in severe sepsis correlates with a significant rise in mortality, early predictive warnings offer an indispensable therapeutic window."
        },
        {
          tag: "C",
          text: "Despite these remarkable achievements, the widespread deployment of clinical AI is shadowed by persistent challenges. The most concerning of these is algorithmic bias. When machine learning models are trained predominantly on demographic datasets sourced from high-income urban populations, their diagnostic accuracy declines sharply when applied to under-represented racial minorities or rural cohorts. Furthermore, the opaque 'black-box' nature of deep multilayer neural networks frustrates clinicians who require interpretable pathophysiological reasoning before administering hazardous chemotherapy or recommending invasive surgeries."
        },
        {
          tag: "D",
          text: "To address these shortcomings, medical ethicists and computational scientists advocate for 'explainable artificial intelligence' (XAI) and rigorous multi-center external validation trials. Saliency mapping techniques, such as Grad-CAM, generate visual heatmaps that highlight the exact pixel clusters an algorithm utilized to reach its classification. Rather than replacing human physicians, the emerging consensus envisions human-in-the-loop collaborative frameworks where AI acts as a tireless diagnostic co-pilot, augmenting human empathy and judgment with computational precision."
        }
      ],
      questionGroups: [
        {
          id: "dqg-1",
          passageIndex: 0,
          questionType: "completion_table",
          title: "Questions 1–5",
          instruction: "Complete the table below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          questions: [
            {
              id: "d1",
              number: 1,
              prompt: "Technology used in medical image interpretation: [1] ______",
              answerKey: ["convolutional neural networks", "CNNs"],
              evidenceParagraph: "Paragraph A",
              evidence: "where convolutional neural networks (CNNs) analyze radiological scans with superhuman speed.",
              explanation: "Paragraph A specifies convolutional neural networks (CNNs)."
            },
            {
              id: "d2",
              number: 2,
              prompt: "Dermatological algorithms distinguish benign nevi from [2] ______",
              answerKey: ["malignant melanoma", "melanoma"],
              evidenceParagraph: "Paragraph A",
              evidence: "distinguishing benign melanocytic nevi from malignant melanoma.",
              explanation: "Paragraph A refers to malignant melanoma."
            },
            {
              id: "d3",
              number: 3,
              prompt: "Eye screening scans evaluate images from [3] ______",
              answerKey: ["fundus photography"],
              evidenceParagraph: "Paragraph A",
              evidence: "detect diabetic retinopathy and macular edema from fundus photography in seconds...",
              explanation: "Paragraph A identifies fundus photography."
            },
            {
              id: "d4",
              number: 4,
              prompt: "Predictive ICU model can forecast [4] ______ six hours in advance",
              answerKey: ["septic shock", "sepsis"],
              evidenceParagraph: "Paragraph B",
              evidence: "process these high-dimensional temporal datasets to forecast septic shock up to six hours prior to clinical onset.",
              explanation: "Paragraph B names septic shock."
            },
            {
              id: "d5",
              number: 5,
              prompt: "Technique that generates heatmaps of algorithmic pixel clusters: [5] ______",
              answerKey: ["Grad-CAM", "saliency mapping"],
              evidenceParagraph: "Paragraph D",
              evidence: "Saliency mapping techniques, such as Grad-CAM, generate visual heatmaps...",
              explanation: "Paragraph D cites Grad-CAM or saliency mapping."
            }
          ]
        },
        {
          id: "dqg-2",
          passageIndex: 0,
          questionType: "matching_endings",
          title: "Questions 6–9",
          instruction: "Complete each sentence with the correct ending, A–F, below. Write the correct letter, A–F.",
          endingsList: [
            { letter: "A", text: "delays in administering antimicrobial treatment." },
            { letter: "B", text: "fails when applied to demographic groups missing from training data." },
            { letter: "C", text: "replaces the need for human physicians completely." },
            { letter: "D", text: "conceals the pathophysiological logic behind medical decisions." },
            { letter: "E", text: "pairs machine computational speed with physician empathy and judgment." },
            { letter: "F", text: "is only suitable for laboratory experiments." }
          ],
          questions: [
            {
              id: "d6",
              number: 6,
              prompt: "The black-box characteristic of neural networks [6] ______",
              answerKey: "D",
              evidenceParagraph: "Paragraph C",
              evidence: "the opaque 'black-box' nature of deep multilayer neural networks frustrates clinicians who require interpretable pathophysiological reasoning...",
              explanation: "The black box hides the reasoning behind classifications (D)."
            },
            {
              id: "d7",
              number: 7,
              prompt: "Algorithmic bias occurs because diagnostic performance [7] ______",
              answerKey: "B",
              evidenceParagraph: "Paragraph C",
              evidence: "When machine learning models are trained predominantly on demographic datasets sourced from high-income urban populations, their diagnostic accuracy declines sharply when applied to under-represented racial minorities...",
              explanation: "Performance drops when applied to cohorts missing from training sets (B)."
            },
            {
              id: "d8",
              number: 8,
              prompt: "Higher patient mortality in septic shock is directly associated with [8] ______",
              answerKey: "A",
              evidenceParagraph: "Paragraph B",
              evidence: "Because each hour of delayed antimicrobial therapy in severe sepsis correlates with a significant rise in mortality...",
              explanation: "Mortality is tied to delays in antimicrobial treatment (A)."
            },
            {
              id: "d9",
              number: 9,
              prompt: "A human-in-the-loop framework is designed so that AI [9] ______",
              answerKey: "E",
              evidenceParagraph: "Paragraph D",
              evidence: "collaborative frameworks where AI acts as a tireless diagnostic co-pilot, augmenting human empathy and judgment with computational precision.",
              explanation: "Human-in-the-loop pairs AI speed with doctor empathy and judgment (E)."
            }
          ]
        },
        {
          id: "dqg-3",
          passageIndex: 0,
          questionType: "ynng",
          title: "Questions 10–13",
          instruction: "Do the following statements agree with the views of the writer in the passage? Write YES, NO, or NOT GIVEN.",
          questions: [
            {
              id: "d10",
              number: 10,
              prompt: "Deep learning algorithms can classify malignant melanoma as accurately as human dermatologists.",
              answerKey: "YES",
              evidenceParagraph: "Paragraph A",
              evidence: "match or exceed board-certified dermatologists in distinguishing benign melanocytic nevi from malignant melanoma.",
              explanation: "Paragraph A confirms algorithms match or exceed board-certified dermatologists."
            },
            {
              id: "d11",
              number: 11,
              prompt: "Most public hospitals currently spend more than 20% of their budgets on AI software.",
              answerKey: "NOT GIVEN",
              evidenceParagraph: "Paragraph A",
              evidence: "In the span of a single decade, artificial intelligence has migrated from experimental academic laboratories directly into acute hospital settings.",
              explanation: "No mention of budget percentages spent on AI software."
            },
            {
              id: "d12",
              number: 12,
              prompt: "Clinicians are always confident administering toxic medications based purely on black-box AI advice.",
              answerKey: "NO",
              evidenceParagraph: "Paragraph C",
              evidence: "the opaque 'black-box' nature of deep multilayer neural networks frustrates clinicians who require interpretable pathophysiological reasoning before administering hazardous chemotherapy...",
              explanation: "Clinicians are frustrated and hesitant, directly contradicting the statement."
            },
            {
              id: "d13",
              number: 13,
              prompt: "Explainable AI tools are being developed to reveal how algorithms arrive at diagnostic decisions.",
              answerKey: "YES",
              evidenceParagraph: "Paragraph D",
              evidence: "advocate for 'explainable artificial intelligence' (XAI)... Saliency mapping techniques, such as Grad-CAM, generate visual heatmaps that highlight the exact pixel clusters an algorithm utilized...",
              explanation: "XAI tools like Grad-CAM are being developed for this exact purpose."
            }
          ]
        }
      ]
    }
  ]
};
