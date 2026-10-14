// Readify IELTS - IELTS General Training Full Practice Test 1 (40 Questions, 3 Sections)

export const generalFullTest1 = {
  id: "general-full-1",
  title: "General Training Reading Test 1: Workplace, Training & Wind Energy",
  type: "general",
  isFullTest: true,
  durationMinutes: 60,
  difficulty: "medium",
  topic: "Workplace, Community & Engineering",
  description: "A complete 40-question IELTS General Training practice test featuring workplace ergonomics, vocational development policies, and wind turbine engineering.",
  passages: [
    {
      id: "section-1",
      number: 1,
      title: "Section 1: Ergonomics Guidelines & Volunteer Opportunities",
      subtitle: "Everyday workplace health safety regulations and local community volunteer programs",
      paragraphs: [
        {
          tag: "A",
          text: "Workplace Ergonomics and Display Screen Equipment (DSE) Guidelines: All employees who routinely use visual display units for continuous periods exceeding one hour per working day are classified as formal DSE operators. Employers are legally obligated to conduct thorough workstation assessments every eighteen months or immediately following any significant hardware relocation. Ergonomic chairs must feature adjustable lumbar support, pneumatic height calibration, and five-point castor bases. Display monitors should sit directly perpendicular to natural window light to eliminate glare, with the top bezel positioned level with or slightly below eye height. Users must take short postural breaks of 5 to 10 minutes for every 50 minutes of intensive keyboard entry, rather than a single prolonged pause after several hours."
        },
        {
          tag: "B",
          text: "Eyecare Subsidies: Full-time personnel who operate display equipment are eligible for biennial comprehensive optical examinations funded entirely through corporate health accounts. Should specialized corrective lenses be prescribed solely for VDU focal distance (typically 50 to 70 centimeters), the company will reimburse standard single-vision frames up to the statutory allowance of £85. Upgrades to designer frames or transitions coating remain the employee's personal expense."
        },
        {
          tag: "C",
          text: "Community Volunteer Placement Opportunities: (1) Riverside Habitat Restoration: Volunteers meet fortnightly on Saturday mornings to plant native riparian shrubs, clear invasive Japanese knotweed, and install wooden bird nesting boxes. Heavy-duty waterproof boots and high-visibility vests are provided on-site. Participants must be at least sixteen years old. (2) Senior Digital Literacy Mentors: Volunteers provide one-on-one computer assistance to elder residents at community libraries on Wednesday afternoons. Prior technical accreditation is not mandatory, but patience and fluency in basic email navigation and scam awareness are vital. (3) Community Food Bank Drivers: Requires a clean driving record and valid Category B license to collect surplus perishables from supermarkets and deliver parcels to distribution centers."
        }
      ],
      questionGroups: [
        {
          id: "gqg-1-1",
          passageIndex: 0,
          questionType: "tfng",
          title: "Questions 1–7",
          instruction: "Do the following statements agree with the information given in Section 1? Write TRUE if the statement agrees, FALSE if the statement contradicts, or NOT GIVEN if there is no information on this.",
          questions: [
            {
              id: "g1",
              number: 1,
              prompt: "Employees must use display screens for over one hour daily to be considered formal DSE operators.",
              answerKey: "TRUE",
              evidenceParagraph: "Paragraph A",
              evidence: "All employees who routinely use visual display units for continuous periods exceeding one hour per working day are classified as formal DSE operators.",
              explanation: "The text explicitly states continuous periods exceeding one hour per working day qualify employees as DSE operators."
            },
            {
              id: "g2",
              number: 2,
              prompt: "Workstation ergonomic reviews are carried out once every twelve months.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph A",
              evidence: "Employers are legally obligated to conduct thorough workstation assessments every eighteen months...",
              explanation: "The guidelines require assessments every eighteen months, not twelve months."
            },
            {
              id: "g3",
              number: 3,
              prompt: "The top edge of the computer screen should be higher than the worker's eye line.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph A",
              evidence: "with the top bezel positioned level with or slightly below eye height.",
              explanation: "The top bezel must be level with or slightly below eye height, not higher."
            },
            {
              id: "g4",
              number: 4,
              prompt: "Workers are encouraged to take a single 30-minute break after four hours of typing.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph A",
              evidence: "Users must take short postural breaks of 5 to 10 minutes for every 50 minutes of intensive keyboard entry, rather than a single prolonged pause after several hours.",
              explanation: "Short frequent breaks of 5-10 minutes every 50 minutes are required rather than a single prolonged pause."
            },
            {
              id: "g5",
              number: 5,
              prompt: "The company covers all costs if an employee selects designer spectacle frames.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph B",
              evidence: "Upgrades to designer frames or transitions coating remain the employee's personal expense.",
              explanation: "Designer frames remain the employee's personal expense."
            },
            {
              id: "g6",
              number: 6,
              prompt: "Volunteers for the Riverside Habitat project must provide their own safety boots.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph C",
              evidence: "Heavy-duty waterproof boots and high-visibility vests are provided on-site.",
              explanation: "The text states boots and vests are provided on-site."
            },
            {
              id: "g7",
              number: 7,
              prompt: "Senior digital mentors must hold a formal computer science certificate.",
              answerKey: "FALSE",
              evidenceParagraph: "Paragraph C",
              evidence: "Prior technical accreditation is not mandatory, but patience and fluency in basic email navigation and scam awareness are vital.",
              explanation: "The text confirms prior technical accreditation is not mandatory."
            }
          ]
        },
        {
          id: "gqg-1-2",
          passageIndex: 0,
          questionType: "matching_info",
          title: "Questions 8–11",
          instruction: "Look at the three volunteer programs described in Paragraph C. Which program matches the following requirements? Write 1, 2, or 3.",
          questions: [
            {
              id: "g8",
              number: 8,
              prompt: "Which role requires helping older people identify online fraud?",
              answerKey: "2",
              evidenceParagraph: "Paragraph C",
              evidence: "fluency in basic email navigation and scam awareness are vital.",
              explanation: "Senior Digital Literacy Mentors (Program 2) mentions scam awareness."
            },
            {
              id: "g9",
              number: 9,
              prompt: "Which role involves removing a destructive foreign plant species?",
              answerKey: "1",
              evidenceParagraph: "Paragraph C",
              evidence: "clear invasive Japanese knotweed, and install wooden bird nesting boxes.",
              explanation: "Riverside Habitat Restoration (Program 1) involves clearing invasive Japanese knotweed."
            },
            {
              id: "g10",
              number: 10,
              prompt: "Which role demands an official vehicle driving certification?",
              answerKey: "3",
              evidenceParagraph: "Paragraph C",
              evidence: "Requires a clean driving record and valid Category B license...",
              explanation: "Community Food Bank Drivers (Program 3) requires a Category B license."
            },
            {
              id: "g11",
              number: 11,
              prompt: "Which role takes place specifically on alternate weekend mornings?",
              answerKey: "1",
              evidenceParagraph: "Paragraph C",
              evidence: "Volunteers meet fortnightly on Saturday mornings...",
              explanation: "Riverside Habitat Restoration (Program 1) meets fortnightly on Saturday mornings."
            }
          ]
        },
        {
          id: "gqg-1-3",
          passageIndex: 0,
          questionType: "completion_sentence",
          title: "Questions 12–14",
          instruction: "Complete the sentences below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
          questions: [
            {
              id: "g12",
              number: 12,
              prompt: "The standard distance from the eye to the visual display unit is typically ______ centimeters.",
              answerKey: ["50 to 70", "50-70", "50 to 70 centimeters"],
              evidenceParagraph: "Paragraph B",
              evidence: "prescribed solely for VDU focal distance (typically 50 to 70 centimeters)...",
              explanation: "Paragraph B notes VDU focal distance is typically 50 to 70 centimeters."
            },
            {
              id: "g13",
              number: 13,
              prompt: "Employers will reimburse single-vision frames up to the limit of ______.",
              answerKey: ["£85", "85 pounds", "85"],
              evidenceParagraph: "Paragraph B",
              evidence: "reimburse standard single-vision frames up to the statutory allowance of £85.",
              explanation: "Paragraph B states the reimbursement limit is £85."
            },
            {
              id: "g14",
              number: 14,
              prompt: "Minimum age requirement for riverside conservation volunteers is ______ years.",
              answerKey: ["sixteen", "16"],
              evidenceParagraph: "Paragraph C",
              evidence: "Participants must be at least sixteen years old.",
              explanation: "Paragraph C specifies participants must be at least sixteen years old."
            }
          ]
        }
      ]
    },
    {
      id: "section-2",
      number: 2,
      title: "Section 2: Professional Development & Grievance Procedures",
      subtitle: "Employee course schedules, tuition sponsorship rules, and dispute resolution workflows",
      paragraphs: [
        {
          tag: "A",
          text: "Corporate Vocational Training Catalog: Course PR-101 (Agile Project Management): 4 weeks, hybrid delivery. Designed for newly promoted team leads seeking Scrum Alliance certification. Focuses on sprint planning, burndown analytics, and backlog grooming. Course CS-204 (Cybersecurity Fundamentals): 2 weeks, asynchronous e-learning. Mandatory for all systems administrators and payroll staff. Covers multi-factor authentication, phishing defense, and GDPR data breach reporting. Course FL-305 (Financial Modeling for Non-Financial Managers): 6 weeks, evening seminars on Tuesdays and Thursdays. Pre-requisite: intermediate spreadsheet competency."
        },
        {
          tag: "B",
          text: "Tuition Assistance Rules: Staff completing six months of continuous service may apply for tuition reimbursement up to £2,500 per fiscal year. Applications must be countersigned by the department director and submitted to HR at least four weeks prior to course registration. Employees who voluntarily resign within twelve months of course completion must repay 100% of the disbursed sponsorship; those departing between thirteen and twenty-four months repay 50%."
        },
        {
          tag: "C",
          text: "Workplace Grievance Procedure: Stage 1 (Informal Resolution): Employees should first discuss concerns candidly with their direct line supervisor within ten calendar days of the disputed incident. Stage 2 (Formal Written Grievance): If informal dialogue fails to achieve consensus, a formal grievance form must be lodged with the Head of Employee Relations. An independent investigating officer will be appointed to interview involved parties within seven working days. The employee possesses the statutory right to be accompanied by a trade union representative or a certified workplace colleague. Stage 3 (Appeals Panel): Appeals against formal determinations must be registered within five business days of receipt of the findings."
        }
      ],
      questionGroups: [
        {
          id: "gqg-2-1",
          passageIndex: 1,
          questionType: "matching_features",
          title: "Questions 15–20",
          instruction: "Classify the following statements as applying to Course PR-101 (A), Course CS-204 (B), or Course FL-305 (C). Write the correct letter, A, B, or C.",
          questions: [
            {
              id: "g15",
              number: 15,
              prompt: "This training is strictly compulsory for workers in payroll and systems administration.",
              answerKey: "B",
              evidenceParagraph: "Paragraph A",
              evidence: "Course CS-204... Mandatory for all systems administrators and payroll staff.",
              explanation: "Course CS-204 (B) is mandatory for payroll and systems administrators."
            },
            {
              id: "g16",
              number: 16,
              prompt: "Participants must already have intermediate spreadsheet skills before enrolling.",
              answerKey: "C",
              evidenceParagraph: "Paragraph A",
              evidence: "Course FL-305... Pre-requisite: intermediate spreadsheet competency.",
              explanation: "Course FL-305 (C) requires intermediate spreadsheet competency."
            },
            {
              id: "g17",
              number: 17,
              prompt: "This course assists students in obtaining Scrum Alliance credentials.",
              answerKey: "A",
              evidenceParagraph: "Paragraph A",
              evidence: "Course PR-101... Designed for newly promoted team leads seeking Scrum Alliance certification.",
              explanation: "Course PR-101 (A) targets Scrum Alliance certification."
            },
            {
              id: "g18",
              number: 18,
              prompt: "It is delivered entirely through asynchronous online study.",
              answerKey: "B",
              evidenceParagraph: "Paragraph A",
              evidence: "Course CS-204 (Cybersecurity Fundamentals): 2 weeks, asynchronous e-learning.",
              explanation: "Course CS-204 (B) is asynchronous e-learning."
            },
            {
              id: "g19",
              number: 19,
              prompt: "Lectures are scheduled during weekday evenings twice a week.",
              answerKey: "C",
              evidenceParagraph: "Paragraph A",
              evidence: "Course FL-305... evening seminars on Tuesdays and Thursdays.",
              explanation: "Course FL-305 (C) runs on Tuesday and Thursday evenings."
            },
            {
              id: "g20",
              number: 20,
              prompt: "The course curriculum covers the management of sprint backlogs.",
              answerKey: "A",
              evidenceParagraph: "Paragraph A",
              evidence: "Course PR-101... Focuses on sprint planning, burndown analytics, and backlog grooming.",
              explanation: "Course PR-101 (A) covers sprint planning and backlog grooming."
            }
          ]
        },
        {
          id: "gqg-2-2",
          passageIndex: 1,
          questionType: "completion_table",
          title: "Questions 21–24",
          instruction: "Complete the table below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
          questions: [
            {
              id: "g21",
              number: 21,
              prompt: "Minimum employment period required before applying for funding: [21] ______",
              answerKey: ["six months", "6 months"],
              evidenceParagraph: "Paragraph B",
              evidence: "Staff completing six months of continuous service may apply for tuition reimbursement...",
              explanation: "Paragraph B requires six months of continuous service."
            },
            {
              id: "g22",
              number: 22,
              prompt: "Maximum allowable tuition support per fiscal year: [22] ______",
              answerKey: ["£2,500", "2500", "2,500"],
              evidenceParagraph: "Paragraph B",
              evidence: "tuition reimbursement up to £2,500 per fiscal year.",
              explanation: "Paragraph B states the maximum is £2,500."
            },
            {
              id: "g23",
              number: 23,
              prompt: "Repayment proportion if worker resigns between 13 and 24 months: [23] ______",
              answerKey: ["50%", "50 percent", "fifty percent"],
              evidenceParagraph: "Paragraph B",
              evidence: "those departing between thirteen and twenty-four months repay 50%.",
              explanation: "Paragraph B specifies departing employees repay 50%."
            },
            {
              id: "g24",
              number: 24,
              prompt: "Timeframe for investigating officer to conduct hearings: within [24] ______",
              answerKey: ["seven working days", "7 working days"],
              evidenceParagraph: "Paragraph C",
              evidence: "An independent investigating officer will be appointed to interview involved parties within seven working days.",
              explanation: "Paragraph C designates seven working days."
            }
          ]
        },
        {
          id: "gqg-2-3",
          passageIndex: 1,
          questionType: "short_answer",
          title: "Questions 25–27",
          instruction: "Answer the questions below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
          questions: [
            {
              id: "g25",
              number: 25,
              prompt: "How many weeks in advance must tuition applications be submitted to HR?",
              answerKey: ["four weeks", "4 weeks"],
              evidenceParagraph: "Paragraph B",
              evidence: "submitted to HR at least four weeks prior to course registration.",
              explanation: "Paragraph B requires applications at least four weeks prior to registration."
            },
            {
              id: "g26",
              number: 26,
              prompt: "Who may accompany an employee to a formal grievance hearing besides a certified colleague?",
              answerKey: ["trade union representative", "union representative"],
              evidenceParagraph: "Paragraph C",
              evidence: "accompanied by a trade union representative or a certified workplace colleague.",
              explanation: "Paragraph C identifies a trade union representative."
            },
            {
              id: "g27",
              number: 27,
              prompt: "Within how many business days must an appeal against a formal ruling be submitted?",
              answerKey: ["five business days", "5 business days", "five days", "5 days"],
              evidenceParagraph: "Paragraph C",
              evidence: "Appeals against formal determinations must be registered within five business days...",
              explanation: "Paragraph C states within five business days."
            }
          ]
        }
      ]
    },
    {
      id: "section-3",
      number: 3,
      title: "Section 3: The Engineering and History of Modern Wind Turbines",
      subtitle: "From early Persian vertical windmills to multi-megawatt offshore aerodynamic generators",
      paragraphs: [
        {
          tag: "A",
          text: "Harnessing kinetic wind energy to perform mechanical labor ranks among humanity's oldest technologies. Historical chronicles document vertical-axis panemone windmills grinding grain in Sistan, Persia, as early as the seventh century CE. These early contraptions relied purely on drag forces: reeds and woven mats caught the prevailing wind on one side while a wooden shroud shielded the retreating blades. However, drag-based machinery was intrinsically inefficient, unable to rotate faster than the velocity of the driving breeze itself."
        },
        {
          tag: "B",
          text: "The critical evolutionary breakthrough arrived during the European Middle Ages with the development of horizontal-axis post and tower mills. By angling rotating canvas sails into the wind, medieval millwrights utilized aerodynamic lift rather than crude drag. By the late nineteenth century, Danish inventor Poul la Cour integrated aerodynamic blade shaping with dynamo technology to generate electrical currents, demonstrating that fewer, rapidly spinning aerodynamic blades yielded substantially greater electrical power than traditional broad multi-blade water-pumping designs."
        },
        {
          tag: "C",
          text: "Contemporary utility-scale wind turbines are sophisticated monuments of composite materials engineering. Modern horizontal-axis wind turbines (HAWT) predominantly feature three-bladed rotors manufactured from fiberglass-reinforced epoxy and carbon fiber composites. As laminar airflow crosses the airfoil contours of each blade, differential air velocities produce low pressure across the upper surface and high pressure underneath, generating aerodynamic lift. This lift creates rotational torque that drives a low-speed main shaft rotating at roughly 8 to 15 revolutions per minute."
        },
        {
          tag: "D",
          text: "To convert this slow mechanical rotation into electricity suitable for municipal utility grids, the low-speed shaft connects to an internal speed-increasing planetary gearbox housed within the nacelle. The gearbox multiplies rotational velocity by a ratio of roughly 1:100, driving a high-speed shaft at approximately 1,500 revolutions per minute directly into a doubly-fed induction generator or permanent-magnet synchronous alternator. Alternatively, direct-drive turbines eliminate the heavy gearbox entirely, pairing large multi-pole annular generators directly to the rotor hub to minimize mechanical friction and maintenance downtime."
        },
        {
          tag: "E",
          text: "Active control mechanisms are vital to turbine survival and power optimization. An active yaw drive system continually reorients the nacelle to face directly into incoming wind directions detected by ultrasonic sonic anemometers mounted atop the roof. Concurrently, individual blade pitch actuators rotate each blade along its longitudinal axis by fractional degrees. In light breezes, blades feather to maximize aerodynamic lift; during violent gales exceeding the cut-out speed of 25 meters per second, pitch motors turn the blade leading edges fully parallel to the wind, arresting rotation to protect internal gear trains and structural foundations from catastrophic stress."
        },
        {
          tag: "F",
          text: "The technological vanguard of the renewable energy sector has decisively relocated offshore. Marine wind regimes offer significantly higher, smoother, and more predictable wind speeds unhindered by terrestrial topography or surface friction. While initial offshore installations were anchored into shallow coastlines using driven steel monopiles, next-generation deep-water wind farms employ floating spar buoys and tension-leg tethered platforms anchored in depths surpassing two hundred meters. These immense offshore units, boasting rotor diameters exceeding 220 meters and single-unit outputs over 15 megawatts, produce clean energy at scale with minimal terrestrial land footprint."
        }
      ],
      questionGroups: [
        {
          id: "gqg-3-1",
          passageIndex: 2,
          questionType: "matching_headings",
          title: "Questions 28–33",
          instruction: "Section 3 has six paragraphs, A–F. Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i–viii.",
          headingsList: [
            { roman: "i", text: "Aerodynamic lift mechanics and modern blade composites" },
            { roman: "ii", text: "The transition to deep-water floating marine platforms" },
            { roman: "iii", text: "Early Persian drag devices and their physical limits" },
            { roman: "iv", text: "Gearing systems and direct-drive electrical generation" },
            { roman: "v", text: "The economic impact of wind subsidies" },
            { roman: "vi", text: "From medieval post mills to electrical generation experiments" },
            { roman: "vii", text: "Yaw alignment and pitch feathering safety controls" },
            { roman: "viii", text: "Bird conservation around agricultural wind farms" }
          ],
          questions: [
            {
              id: "g28",
              number: 28,
              prompt: "Paragraph A",
              answerKey: "iii",
              evidenceParagraph: "Paragraph A",
              evidence: "panemone windmills grinding grain in Sistan, Persia... relied purely on drag forces... intrinsically inefficient...",
              explanation: "Paragraph A details early Persian panemone mills and the limitations of drag."
            },
            {
              id: "g29",
              number: 29,
              prompt: "Paragraph B",
              answerKey: "vi",
              evidenceParagraph: "Paragraph B",
              evidence: "European Middle Ages with the development of horizontal-axis post and tower mills... Poul la Cour integrated aerodynamic blade shaping with dynamo technology...",
              explanation: "Paragraph B traces the evolution from medieval mills to early electrical dynamos."
            },
            {
              id: "g30",
              number: 30,
              prompt: "Paragraph C",
              answerKey: "i",
              evidenceParagraph: "Paragraph C",
              evidence: "manufactured from fiberglass-reinforced epoxy and carbon fiber composites... generating aerodynamic lift...",
              explanation: "Paragraph C discusses composite blade engineering and aerodynamic lift principles."
            },
            {
              id: "g31",
              number: 31,
              prompt: "Paragraph D",
              answerKey: "iv",
              evidenceParagraph: "Paragraph D",
              evidence: "internal speed-increasing planetary gearbox... Alternatively, direct-drive turbines eliminate the heavy gearbox entirely...",
              explanation: "Paragraph D covers speed-increasing gearboxes and direct-drive generators."
            },
            {
              id: "g32",
              number: 32,
              prompt: "Paragraph E",
              answerKey: "vii",
              evidenceParagraph: "Paragraph E",
              evidence: "active yaw drive system continually reorients the nacelle... blade pitch actuators rotate each blade... during violent gales...",
              explanation: "Paragraph E describes yaw orientation and blade pitch feathering for safety."
            },
            {
              id: "g33",
              number: 33,
              prompt: "Paragraph F",
              answerKey: "ii",
              evidenceParagraph: "Paragraph F",
              evidence: "relocated offshore... deep-water wind farms employ floating spar buoys and tension-leg tethered platforms...",
              explanation: "Paragraph F focuses on the move offshore to floating deep-water platforms."
            }
          ]
        },
        {
          id: "gqg-3-2",
          passageIndex: 2,
          questionType: "completion_flowchart",
          title: "Questions 34–37",
          instruction: "Complete the flowchart below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
          questions: [
            {
              id: "g34",
              number: 34,
              prompt: "Airflow creates low pressure above blade, generating [34] ______",
              answerKey: ["aerodynamic lift", "lift"],
              evidenceParagraph: "Paragraph C",
              evidence: "producing low pressure across the upper surface and high pressure underneath, generating aerodynamic lift.",
              explanation: "Paragraph C describes aerodynamic lift generation."
            },
            {
              id: "g35",
              number: 35,
              prompt: "Torque turns the [35] ______ at approximately 8 to 15 rpm",
              answerKey: ["low-speed main shaft", "low-speed shaft", "main shaft"],
              evidenceParagraph: "Paragraph C",
              evidence: "generating aerodynamic lift. This lift creates rotational torque that drives a low-speed main shaft...",
              explanation: "Paragraph C specifies the low-speed main shaft."
            },
            {
              id: "g36",
              number: 36,
              prompt: "Rotation accelerated 1:100 inside the nacelle by a [36] ______",
              answerKey: ["planetary gearbox", "gearbox"],
              evidenceParagraph: "Paragraph D",
              evidence: "connects to an internal speed-increasing planetary gearbox housed within the nacelle.",
              explanation: "Paragraph D refers to the planetary gearbox."
            },
            {
              id: "g37",
              number: 37,
              prompt: "High-speed shaft powers an alternator or [37] ______ at 1,500 rpm",
              answerKey: ["doubly-fed induction generator", "induction generator", "generator"],
              evidenceParagraph: "Paragraph D",
              evidence: "driving a high-speed shaft at approximately 1,500 revolutions per minute directly into a doubly-fed induction generator...",
              explanation: "Paragraph D identifies a doubly-fed induction generator."
            }
          ]
        },
        {
          id: "gqg-3-3",
          passageIndex: 2,
          questionType: "ynng",
          title: "Questions 38–40",
          instruction: "Do the following statements agree with the views of the writer in Section 3? Write YES if the statement agrees, NO if the statement contradicts, or NOT GIVEN if it is impossible to say.",
          questions: [
            {
              id: "g38",
              number: 38,
              prompt: "Persian panemone windmills were able to spin faster than the wind itself.",
              answerKey: "NO",
              evidenceParagraph: "Paragraph A",
              evidence: "drag-based machinery was intrinsically inefficient, unable to rotate faster than the velocity of the driving breeze itself.",
              explanation: "The text states panemone windmills were unable to rotate faster than the wind itself."
            },
            {
              id: "g39",
              number: 39,
              prompt: "Direct-drive wind turbines reduce maintenance issues by eliminating gearboxes.",
              answerKey: "YES",
              evidenceParagraph: "Paragraph D",
              evidence: "direct-drive turbines eliminate the heavy gearbox entirely, pairing large multi-pole annular generators directly to the rotor hub to minimize mechanical friction and maintenance downtime.",
              explanation: "The passage confirms that direct-drive turbines eliminate gearboxes to minimize maintenance downtime."
            },
            {
              id: "g40",
              number: 40,
              prompt: "Floating offshore platforms produce more mechanical noise than onshore turbines.",
              answerKey: "NOT GIVEN",
              evidenceParagraph: "Paragraph F",
              evidence: "These immense offshore units, boasting rotor diameters exceeding 220 meters and single-unit outputs over 15 megawatts, produce clean energy at scale...",
              explanation: "There is no mention of mechanical noise levels of floating offshore platforms compared to onshore turbines."
            }
          ]
        }
      ]
    }
  ]
};
