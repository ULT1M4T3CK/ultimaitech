import type { PrismaClient } from "@prisma/client";

/** Seeds VPTC course + Vragenset 1 structure (Dutch CCV practical test theory). */
export async function seedVptcContent(prisma: PrismaClient, courseId: string) {
  await prisma.questionSet.deleteMany({ where: { courseId } });

  const set = await prisma.questionSet.create({
    data: {
      courseId,
      name: "Vragenset 1 — Praktische toets",
      order: 1,
      passingSectionCount: 8,
    },
  });

  type QDef = {
    prompt: string;
    type: "SINGLE" | "MULTI" | "TRUE_FALSE" | "IMAGE_CHOICE" | "OPEN_ANSWER" | "OBSERVATION_CHECKLIST" | "PHYSICAL_INSPECTION" | "SAFETY_OVERRIDE";
    grading: "AUTO" | "INSTRUCTOR";
    feedback?: string;
    canonical?: string;
    options?: { text: string; correct: boolean }[];
    criteria?: string[];
    safety?: boolean;
  };

  const sections: { name: string; order: number; phase: string | null; code: string | null; pass: number; qs: QDef[] }[] =
    [
      {
        name: "Onderdeel A — Persoonlijke beschermingsmiddelen",
        order: 1,
        phase: "Fase 1: Voor vertrek",
        code: "A",
        pass: 2,
        qs: [
          {
            prompt:
              "De voorgeschreven PBM's zijn voorhanden. **Hoe zie je of een veiligheidshelm nog gebruikt kan worden?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback:
              "Het juiste antwoord is: aan de rode UV stip. Een helm moet ook vervangen worden na val vanaf 1 m of na een ongeluk; controleer ook de productiedatum (3–10 jaar).",
            options: [
              { text: "Rode stip op de helm", correct: true },
              { text: "CE-keurmerk alleen", correct: false },
              { text: "Geen scheuren in de helm (alleen dit)", correct: false },
              { text: "Binnenharnas intact (alleen dit)", correct: false },
            ],
          },
          {
            prompt: "**Vanaf hoeveel decibel moet je werkgever gehoorbescherming verstrekken?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Vanaf **80 dB(A)** moet gehoorbescherming worden aangeboden; vanaf **85 dB(A)** verplicht dragen.",
            options: [
              { text: "Vanaf 80 dB(A)", correct: true },
              { text: "Vanaf 75 dB(A)", correct: false },
              { text: "Vanaf 85 dB(A) (alleen dit)", correct: false },
              { text: "Vanaf 90 dB(A)", correct: false },
            ],
          },
          {
            prompt: "**Is een reflectiehesje een PBM?**",
            type: "TRUE_FALSE",
            grading: "AUTO",
            feedback: "Ja — het verhoogt zichtbaarheid (kleur, fluorescentie, retroreflectie).",
            options: [
              { text: "Ja", correct: true },
              { text: "Nee", correct: false },
            ],
          },
        ],
      },
      {
        name: "Onderdeel B — Lading en rij-eigenschappen",
        order: 2,
        phase: "Fase 1: Voor vertrek",
        code: "B",
        pass: 3,
        qs: [
          {
            prompt: "**Welke krachten werken er op een rijdend voertuig?** (meerdere goed)",
            type: "MULTI",
            grading: "AUTO",
            feedback:
              "Centrifugaal, optrekkend (acceleratie), zijwaarts, remmend — o.a. bepaald door zwaartepunt, snelheid, wegverkanting, bochtstraal, wind.",
            options: [
              { text: "Centrifugale krachten", correct: true },
              { text: "Optrekkende krachten", correct: true },
              { text: "Zijwaartse krachten", correct: true },
              { text: "Remmende krachten", correct: true },
              { text: "Alleen zwaartekracht naar beneden", correct: false },
            ],
          },
          {
            prompt: "**Wat is een centrifugale kracht?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Ontstaat bij het nemen van bochten / richtingsverandering.",
            options: [
              { text: "Ontstaat tijdens het rijden van bochten", correct: true },
              { text: "Alleen remkracht", correct: false },
              { text: "Alleen motorrem", correct: false },
            ],
          },
          {
            prompt: "**Is de keuze van je versnelling in een bocht belangrijk?**",
            type: "TRUE_FALSE",
            grading: "AUTO",
            feedback: "Ja — juiste versnelling geeft voldoende trekkracht om de bochtlijn te volgen.",
            options: [
              { text: "Ja", correct: true },
              { text: "Nee", correct: false },
            ],
          },
          {
            prompt:
              "**Je hebt een blok beton van 10.000 kg (geen antislipmatten). Hoeveel zijn de krachten samen naar links, rechts en naar achteren gericht?**",
            type: "OPEN_ANSWER",
            grading: "INSTRUCTOR",
            canonical: "15.000 kg totaal (0,5g zij + 0,5g zij + 0,5g achter = 1,5 × gewicht).",
            feedback: "0,5g = 50% van het gewicht per richting; voorwaarts hier niet gevraagd.",
          },
          {
            prompt: "**Welk behandelingsetiket betekent zeer breekbaar?** (oefening: kies B)",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "B = zeer breekbaar; A = documenten ingesloten; C = niet nat laten worden.",
            options: [
              { text: "Etiket A", correct: false },
              { text: "Etiket B", correct: true },
              { text: "Etiket C", correct: false },
            ],
          },
        ],
      },
      {
        name: "Onderdeel C — Laadklep en laadruimte",
        order: 3,
        phase: "Fase 1: Voor vertrek",
        code: "C",
        pass: 3,
        qs: [
          {
            prompt: "**Wanneer verloopt de keuring van deze laadklep?** (gebruik keurmerk sticker ter plaatse)",
            type: "PHYSICAL_INSPECTION",
            grading: "INSTRUCTOR",
            canonical: "Lees datum op de sticker van de aanwezige laadklep.",
          },
          {
            prompt: "**Hoe maak je andere weggebruikers attent dat je met een laadklep werkt?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Pionnen of afzetlint; moderne kleppen hebben vaak alarmlichten.",
            options: [
              { text: "Pionnen of afzetlint gebruiken", correct: true },
              { text: "Alleen claxonneren", correct: false },
              { text: "Niets doen", correct: false },
            ],
          },
          {
            prompt: "**Wat is de maximale last volgens de tabel van de aanwezige laadklep?**",
            type: "PHYSICAL_INSPECTION",
            grading: "INSTRUCTOR",
            canonical: "Lees max. last uit de tabel op de laadklep ter plaatse.",
          },
          {
            prompt: "**Waar controleer je de laadruimte op vóór het laden?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Net, droog, geen scherpe delen.",
            options: [
              { text: "Netheid, droog, geen scherpe delen", correct: true },
              { text: "Alleen de kleur van de wand", correct: false },
              { text: "Alleen bandenspanning", correct: false },
            ],
          },
        ],
      },
      {
        name: "Onderdeel D — Span- en stuwmaterialen",
        order: 4,
        phase: "Fase 1: Voor vertrek",
        code: "D",
        pass: 3,
        qs: [
          {
            prompt: "**Waar zit de noodstop van deze EPT?** (gebruik aanwezige truck)",
            type: "PHYSICAL_INSPECTION",
            grading: "INSTRUCTOR",
            canonical: "Wijs de noodstop op de aanwezige EPT.",
          },
          {
            prompt: "**Wat betekent \"LC\" op het spanband-etiket?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Lashing Capacity — toegestane trekkracht in rechte lijn (daN).",
            options: [
              { text: "Lashing Capacity", correct: true },
              { text: "Load Class", correct: false },
              { text: "Lashing Count", correct: false },
            ],
          },
          {
            prompt: "**Wanneer mag je een spanband niet meer gebruiken?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Ratel defect, slijtage, scheurtjes — direct afkeuren; niet knopen; fabrikant voor reparatie.",
            options: [
              {
                text: "Ratel werkt niet goed, slijtage of scheurtjes in de band",
                correct: true,
              },
              { text: "Alleen als de kleur vervaagt", correct: false },
              { text: "Nooit", correct: false },
            ],
          },
          {
            prompt: "**Mag iedereen een EPT gebruiken?**",
            type: "TRUE_FALSE",
            grading: "AUTO",
            feedback: "Nee — grondige instructie en specifieke deskundigheid vereist (Arbowet).",
            options: [
              { text: "Nee", correct: true },
              { text: "Ja", correct: false },
            ],
          },
        ],
      },
      {
        name: "Onderdeel E — Laden, stuwen en vastzetten",
        order: 5,
        phase: "Fase 1: Voor vertrek",
        code: "E",
        pass: 1,
        qs: [
          {
            prompt:
              "**Praktische opdracht (oefen-theorie):** lading combi 1 laden/stuwen/vastzetten; klep start/eind dicht; EPT veilig zekeren; pionnen/afzetlint bij open klep.",
            type: "OBSERVATION_CHECKLIST",
            grading: "INSTRUCTOR",
            criteria: [
              "Gesloten laadklep aan begin en einde",
              "EPT veilig gezekerd in laadruimte",
              "Lading deugdelijk vastgezet",
              "Geen onveilige situaties",
              "Pionnen/afzetlint bij open klep",
              "Juiste hulpmiddelen en -technieken",
              "Fysieke risico's beperkt (PBM, tillen, in-/uitstap)",
            ],
          },
        ],
      },
      {
        name: "Fase 2 — Onderweg A: Illegaliteit en criminaliteit",
        order: 6,
        phase: "Fase 2: Onderweg",
        code: "2A",
        pass: 2,
        qs: [
          {
            prompt: "**Noem plekken waar illegalen zich kunnen verstoppen in een vrachtauto** (meerdere goed).",
            type: "MULTI",
            grading: "AUTO",
            feedback: "Dak trailer, in trailer, tussen assen/chassis, tussen cabine en trailer, achter brandstoftanks.",
            options: [
              { text: "Op het dak van de trailer", correct: true },
              { text: "In de trailer", correct: true },
              { text: "Tussen assen en chassisbalken", correct: true },
              { text: "Tussen cabine en trailer", correct: true },
              { text: "Achter de brandstoftanks", correct: true },
              { text: "Alleen in de cabine", correct: false },
            ],
          },
          {
            prompt: "**Wie is verantwoordelijk wanneer illegalen in de laadruimte worden aangetroffen?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "De chauffeur.",
            options: [
              { text: "De chauffeur", correct: true },
              { text: "De verlader", correct: false },
              { text: "De politie", correct: false },
            ],
          },
          {
            prompt: "**Noem 2 preventieve maatregelen tegen diefstal bij pallets met waardevolle goederen.**",
            type: "OPEN_ANSWER",
            grading: "INSTRUCTOR",
            canonical: "Bv. alles in zwarte folie sealen; waardevolle pallets in het midden met goedkope pallets eromheen.",
          },
        ],
      },
      {
        name: "Fase 2 — Onderweg B: Noodsituaties (file)",
        order: 7,
        phase: "Fase 2: Onderweg",
        code: "2B",
        pass: 3,
        qs: [
          {
            prompt:
              "**Scenario file:** je staat achteraan in een file; achter jou botsing waardoor auto 1 tegen jou rijdt; benzine lekt; auto 2 rijdt op auto 1. **Moet jij een schadeformulier invullen?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Ja — twee formulieren: jij↔auto1 en auto1↔auto2; foto's en inleveren bij verzekering.",
            options: [
              { text: "Ja, twee schadeformulieren", correct: true },
              { text: "Nee, alleen auto 1 en 2", correct: false },
              { text: "Nee", correct: false },
            ],
          },
          {
            prompt: "**Zelfde scenario:** welk vakje kies je als er nog een ander voertuig betrokken is?",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Vakje 4 — andere voertuigen dan 1 en 2.",
            options: [
              { text: "Vakje 4 (andere voertuigen dan 1 en 2)", correct: true },
              { text: "Vakje 1", correct: false },
              { text: "Vakje 2", correct: false },
            ],
          },
          {
            prompt: "**Achterkant schadeformulier: wat vul je bij aansprakelijkheid het beste in?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Wees diplomatiek aan de voorzijde; achterzijde waarheid als gevraagd.",
            options: [
              { text: "De waarheid (achterzijde)", correct: true },
              { text: "Direct schuld toewijzen", correct: false },
              { text: "Niets invullen", correct: false },
            ],
          },
          {
            prompt:
              "**Op de snelweg:** twee auto's kop-staart; benzine lekt; bestuurder auto 2 bewusteloos op de rijbaan. **Wat is het belangrijkst bij aankomst?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "PAMAN — start met eigen veiligheid.",
            options: [
              { text: "Eigen persoonlijke veiligheid", correct: true },
              { text: "Direct slachtoffer verplaatsen", correct: false },
              { text: "Direct foto's maken", correct: false },
            ],
          },
          {
            prompt: "**Hoe voorkom je dat gelekte benzine verder gevaar oplevert?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Indammen en/of zand strooien.",
            options: [
              { text: "Indammen en/of zand strooien", correct: true },
              { text: "Water gieten", correct: false },
              { text: "Wegrijden", correct: false },
            ],
          },
        ],
      },
      {
        name: "Fase 2 — Onderweg C: Gladheid en storingen",
        order: 8,
        phase: "Fase 2: Onderweg",
        code: "2C",
        pass: 2,
        qs: [
          {
            prompt: "**Welke rem gebruik je bij een noodstop bij ~80 km/u in hevige regen?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Bedrijfsrem — ABS; retarder/motorrem vallen buiten veilig remmen in nood.",
            options: [
              { text: "Bedrijfsrem", correct: true },
              { text: "Retarder", correct: false },
              { text: "Motorrem alleen", correct: false },
            ],
          },
          {
            prompt: "**Start van de dag: alarmsignaal. Wat nu?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Waarschijnlijk geen druk in luchtsysteem — eerst lucht laten opbouwen.",
            options: [
              { text: "Waarschijnlijk geen druk in het luchtsysteem", correct: true },
              { text: "Motor olie bijvullen", correct: false },
            ],
          },
          {
            prompt: "**ABS storing oplegger — wat nu?**",
            type: "SINGLE",
            grading: "AUTO",
            feedback: "Stekkers controleren (juiste aansluiting).",
            options: [
              { text: "Controleren of stekkers goed zitten", correct: true },
              { text: "Rijden zonder oplegger", correct: false },
            ],
          },
        ],
      },
      {
        name: "Fase 2 — Praktisch lossen/herverdelen lading",
        order: 9,
        phase: "Fase 2: Onderweg",
        code: "2-prakt",
        pass: 1,
        qs: [
          {
            prompt: "**Praktijkopdracht:** één stuk lading tegen kopschot eruit; rest stuwen en vastzetten; klep start/eind dicht.",
            type: "OBSERVATION_CHECKLIST",
            grading: "INSTRUCTOR",
            criteria: [
              "Klep start/eind gesloten",
              "Lading deugdelijk vast",
              "EPT/pompwagen veilig gezekerd",
              "Geen onveilige situaties",
              "Juiste hulpmiddelen en technieken",
            ],
          },
        ],
      },
      {
        name: "Fase 3 — Eindbestemming",
        order: 10,
        phase: "Fase 3: Eindbestemming",
        code: "3",
        pass: 2,
        qs: [
          {
            prompt: "**Eindbestemming:** rest lading lossen op aangewezen plaats (theorie-checklist).",
            type: "OBSERVATION_CHECKLIST",
            grading: "INSTRUCTOR",
            criteria: [
              "Lading netjes neergezet",
              "Geen onveilige situaties",
              "Controle over lading behouden",
              "Dozen naast rolcontainer",
            ],
          },
          {
            prompt: "**Laadruimte gereed voor vervoer — eindcontrole.**",
            type: "OBSERVATION_CHECKLIST",
            grading: "INSTRUCTOR",
            criteria: ["Laadruimte leeg en gereed", "Laadklep gesloten", "Afsluiten en rijklaar"],
          },
        ],
      },
      {
        name: "Veiligheid — slotvraag",
        order: 11,
        phase: "Fase 3: Eindbestemming",
        code: "Safety",
        pass: 1,
        qs: [
          {
            prompt: "**Was er een veiligheidswaarschuwing voor een onveilige handeling?**",
            type: "SAFETY_OVERRIDE",
            grading: "INSTRUCTOR",
            safety: true,
            criteria: ["Geen onveilige handeling met waarschuwing (anders toets onvoldoende)."],
          },
        ],
      },
    ];

  let scenarioFile: { id: string } | null = null;

  for (const block of sections) {
    const sec = await prisma.section.create({
      data: {
        questionSetId: set.id,
        name: block.name,
        order: block.order,
        phaseLabel: block.phase,
        code: block.code,
        passingQuestionCount: block.pass,
      },
    });

    if (block.order === 7 && !scenarioFile) {
      scenarioFile = await prisma.scenario.create({
        data: {
          sectionId: sec.id,
          title: "Scenario — file en kettingbotsing",
          body: `Je rijdt achteraan in een file op de autosnelweg. Achter jou rijdt een auto met 2 inzittenden. Een andere auto botst hierop waardoor auto 1 weer tegen jou aanbotst. Auto 1 heeft lekkende benzinetank; auto 2 zwaar beschadigd voorin.`,
        },
      });
    }

    let qOrder = 1;
    for (const q of block.qs) {
      const opts = q.options ?? [];
      const crits = q.criteria ?? [];
      await prisma.question.create({
        data: {
          sectionId: sec.id,
          type: q.type,
          gradingMode: q.grading,
          prompt: q.prompt,
          feedback: q.feedback ?? null,
          canonicalAnswer: q.canonical ?? null,
          safetyCritical: q.safety ?? false,
          order: qOrder++,
          scenarioId: block.order === 7 && scenarioFile ? scenarioFile.id : null,
          options:
            opts.length > 0
              ? {
                  create: opts.map((o, i) => ({
                    text: o.text,
                    isCorrect: o.correct,
                    order: i + 1,
                  })),
                }
              : undefined,
          criteria:
            crits.length > 0
              ? {
                  create: crits.map((text, i) => ({
                    text,
                    order: i + 1,
                    isRequired: true,
                  })),
                }
              : undefined,
        },
      });
    }
  }
}
