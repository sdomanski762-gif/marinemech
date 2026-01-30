/**
 * DIESEL ENGINE CORE: VIBRATION INCREASING WITH RPM
 * Focus: Engine mounts, misfire, shaft alignment, and rotating components.
 */

const vibrationIncreasingRPMPath = {
    tree_id: "vibration_increasing_rpm",
    metadata: {
        title: { en: "Vibration Increasing with RPM Diagnostic", pl: "Diagnostyka Wibracji Rosnących z Obrotami" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "vibration_gear_check",
    nodes: {
        "vibration_gear_check": {
            "question": {
                "en": "Does the vibration occur when the engine is in NEUTRAL, or only when it is IN GEAR and moving?",
                "pl": "Czy wibracje występują, gdy silnik jest na luzie (NEUTRAL), czy tylko gdy jest WŁĄCZONY BIEG i łódź płynie?"
            },
            "answers": [
                {
                    "text": { "en": "Occurs in Neutral (Engine only)", "pl": "Występuje na luzie (Tylko silnik)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "engine_mount_check" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Only In Gear (Drivetrain)", "pl": "Tylko na biegu (Układ napędowy)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "shaft_alignment_check" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "engine_mount_check" }
                }
            ]
        },
        "engine_mount_check": {
            "question": {
                "en": "Check the engine mounts. Are any bolts loose, or is the rubber cracked/collapsed? Does the engine move excessively when you push it?",
                "pl": "Sprawdź poduszki silnika. Czy jakieś śruby są luźne, lub czy guma jest pęknięta/zapadnięta? Czy silnik rusza się nadmiernie, gdy go popchniesz?"
            },
            "answers": [
                {
                    "text": { "en": "Mounts are loose or damaged", "pl": "Poduszki są luźne lub uszkodzone" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fix_engine_mounts" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Mounts seem fine", "pl": "Poduszki wydają się sprawne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "misfire_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot access all mounts", "pl": "Nie mam dostępu do wszystkich poduszek" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "misfire_check" }
                }
            ]
        },
        "misfire_check": {
            "question": {
                "en": "Does the engine sound 'uneven' or like it's missing a cylinder? Is there excessive smoke along with the vibration?",
                "pl": "Czy silnik brzmi 'nierówno' lub jakby nie pracował na wszystkie cylindry? Czy wibracjom towarzyszy nadmierne dymienie?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, sounds like a misfire", "pl": "Tak, brzmi jakby nie palił na jeden cylinder" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_misfire_diagnostic" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Engine sounds smooth but vibrates", "pl": "Silnik brzmi równo, ale wibruje" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "rotating_component_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot tell engine balance", "pl": "Nie potrafię ocenić pracy silnika" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "rotating_component_check" }
                }
            ]
        },
        "shaft_alignment_check": {
            "question": {
                "en": "Check the shaft alignment. Is there excessive noise/vibration from the stuffing box or shaft log? Does the vibration get worse at specific speeds?",
                "pl": "Sprawdź osiowość wału. Czy słychać nadmierny hałas/wibracje z dławnicy lub wału? Czy wibracje nasilają się przy konkretnych prędkościach?"
            },
            "answers": [
                {
                    "text": { "en": "Suspect alignment/cutless bearing", "pl": "Podejrzewam niewspółosiowość/łożysko gumowe" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_align_shaft" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Alignment seems fine", "pl": "Osiowość wydaje się sprawna" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "propeller_damage_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot check alignment here", "pl": "Nie mogę tu sprawdzić osiowości" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "propeller_damage_check" }
                }
            ]
        },
        "propeller_damage_check": {
            "question": {
                "en": "Is the propeller damaged, fouled, or bent? Even a small nick or a piece of rope can cause severe vibration at high RPM.",
                "pl": "Czy śruba jest uszkodzona, porośnięta lub skrzywiona? Nawet małe wyszczerbienie lub kawałek liny może powodować silne wibracje na wysokich obrotach."
            },
            "answers": [
                {
                    "text": { "en": "Propeller is damaged/fouled", "pl": "Śruba jest uszkodzona/porośnięta" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fix_propeller" },
                    "probability": 0.9,
                    "knockout": "others"
                },
                {
                    "text": { "en": "Propeller seems fine", "pl": "Śruba wydaje się sprawna" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "rotating_component_check" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "Cannot check propeller underwater", "pl": "Nie mogę sprawdzić śruby pod wodą" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "rotating_component_check" }
                }
            ]
        },
        "rotating_component_check": {
            "question": {
                "en": "Could the vibration be from other rotating parts? Check the alternator, belts, pulleys, and the flywheel for loose components.",
                "pl": "Czy wibracje mogą pochodzić z innych części wirujących? Sprawdź alternator, paski, koła pasowe i koło zamachowe pod kątem luźnych elementów."
            },
            "answers": [
                {
                    "text": { "en": "Found loose rotating component", "pl": "Znaleziono luźny element wirujący" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fix_rotating_parts" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Everything rotating seems solid", "pl": "Wszystkie części wirujące wydają się solidne" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot inspect all rotating parts", "pl": "Nie mogę sprawdzić wszystkich części wirujących" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_fix_engine_mounts": {
            "title": { "en": "Service/Replace Engine Mounts", "pl": "Serwis/Wymiana Poduszek Silnika" },
            "description": { "en": "Loose or collapsed mounts allow engine vibration to transfer directly to the hull.", "pl": "Luźne lub zapadnięte poduszki pozwalają wibracjom silnika przenosić się bezpośrednio na kadłub." },
            "steps": [
                { "en": "Tighten all engine mount bolts to specification.", "pl": "Dokręć wszystkie śruby poduszek silnika zgodnie ze specyfikacją." },
                { "en": "Inspect rubber for cracks or separation from metal parts.", "pl": "Sprawdź gumę pod kątem pęknięć lub oddzielenia od części metalowych." },
                { "en": "If mounts have collapsed (metal touching metal), they MUST be replaced.", "pl": "Jeśli poduszki osiadły (metal dotyka metalu), MUSZĄ zostać wymienione." }
            ]
        },
        "sol_misfire_diagnostic": {
            "title": { "en": "Diagnose Engine Misfire", "pl": "Diagnozuj Nierówną Pracę Silnika" },
            "description": { "en": "An unbalanced engine (missing a cylinder) creates severe vibration that increases with speed.", "pl": "Niewyważony silnik (niepalący na jeden cylinder) tworzy silne wibracje, które rosną wraz z prędkością." },
            "steps": [
                { "en": "Check fuel filters for water or air in the system.", "pl": "Sprawdź filtry paliwa pod kątem wody lub powietrza w układzie." },
                { "en": "Perform a 'crack test' on injectors (loosen one by one) to find the dead cylinder.", "pl": "Przeprowadź test wtryskiwaczy (poluzuj je kolejno), aby znaleźć niedziałający cylinder." },
                { "en": "Inspect for damaged injectors or low compression on one cylinder.", "pl": "Sprawdź pod kątem uszkodzonych wtryskiwaczy lub niskiej kompresji na jednym cylindrze." }
            ]
        },
        "sol_align_shaft": {
            "title": { "en": "Align Propeller Shaft", "pl": "Ustaw Osiowość Wału Śruby" },
            "description": { "en": "Misalignment between the engine and the shaft creates a 'whipping' vibration in the drivetrain.", "pl": "Niewspółosiowość między silnikiem a wałem tworzy wibracje 'bicia' w układzie napędowym." },
            "steps": [
                { "en": "Check the gap between the engine coupler and shaft coupler using a feeler gauge.", "pl": "Sprawdź szczelinę między sprzęgłem silnika a sprzęgłem wału za pomocą szczelinomierza." },
                { "en": "Adjust engine mounts to bring the couplers into perfect alignment (less than 0.003 inch gap).", "pl": "Wyreguluj poduszki silnika, aby ustawić sprzęgła w idealnej osiowości (szczelina poniżej 0,08 mm)." },
                { "en": "Inspect the cutless bearing (in the strut) for excessive play.", "pl": "Sprawdź łożysko gumowe (w wsporniku) pod kątem nadmiernego luzu." }
            ]
        },
        "sol_fix_propeller": {
            "title": { "en": "Repair/Clean Propeller", "pl": "Napraw/Oczyść Śrubę Napędową" },
            "description": { "en": "Even slight damage to a blade or heavy growth creates a massive centrifugal imbalance.", "pl": "Nawet lekkie uszkodzenie łopatki lub silne porosty tworzą ogromne niewyważenie odśrodkowe." },
            "steps": [
                { "en": "Remove ropes or fishing lines from the shaft and propeller.", "pl": "Usuń liny lub żyłki z wału i śruby." },
                { "en": "Scrape all barnacles and growth from the propeller blades.", "pl": "Zeskrob wszystkie pąkle i porosty z łopat śruby." },
                { "en": "If a blade is bent or nicked, the propeller must be removed and balanced by a pro shop.", "pl": "Jeśli łopatka jest skrzywiona lub wyszczerbiona, śruba musi zostać zdemontowana i wyważona profesjonalnie." }
            ]
        },
        "sol_fix_rotating_parts": {
            "title": { "en": "Secure Rotating Components", "pl": "Zabezpiecz Elementy Wirujące" },
            "description": { "en": "Vibration from peripheral components like the alternator or pulleys can feel like engine vibration.", "pl": "Wibracje z osprzętu, takiego jak alternator lub koła pasowe, mogą być odczuwalne jako wibracje silnika." },
            "steps": [
                { "en": "Check alternator mounting bolts for tightness.", "pl": "Sprawdź dokręcenie śrub montażowych alternatora." },
                { "en": "Inspect all pulleys for wobble or play while running (Carefully!).", "pl": "Sprawdź wszystkie koła pasowe pod kątem bicia lub luzu podczas pracy (Ostrożnie!)." },
                { "en": "Ensure the belts are properly tensioned and not damaged.", "pl": "Upewnij się, że paski są prawidłowo napięte i nieuszkodzone." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "If external points are clear, the issue may be an internal engine imbalance (crankshaft/flywheel) or a bent shaft.", "pl": "Jeśli punkty zewnętrzne są sprawne, problemem może być wewnętrzne niewyważenie silnika (wał/koło zamachowe) lub skrzywiony wał." },
            "steps": [
                { "en": "Check for a bent propeller shaft using a dial indicator.", "pl": "Sprawdź pod kątem skrzywionego wału używając czujnika zegarowego." },
                { "en": "Inspect the flywheel and damper plate for internal failure.", "pl": "Sprawdź koło zamachowe i tłumik drgań pod kątem wewnętrznej awarii." },
                { "en": "Call a marine mechanic for a vibration analysis test.", "pl": "Wezwij mechanika w celu przeprowadzenia analizy drgań." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = vibrationIncreasingRPMPath;
}


