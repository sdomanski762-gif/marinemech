/**
 * DIESEL ENGINE CORE: RPM SURGING / HUNTING
 * Focus: Air ingress, fuel delivery instability, governor hunting, sensor faults.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const rpmSurgingPath = {
    tree_id: "rpm_surging",
    metadata: {
        title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "engine_start_check",
    nodes: {
        "engine_start_check": {
            "question": {
                "en": "What is the primary symptom regarding the engine performance?",
                "pl": "Jaki jest główny objaw dotyczący wydajności silnika?"
            },
            "answers": [
                {
                    "text": { "en": "RPM is surging or 'hunting' at steady throttle", "pl": "Obroty falują lub 'pływają' przy stałym położeniu manetki" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "surging_air_ingress_check" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Stalls / Power Loss paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Gaśnięcie / Utrata Mocy)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "surging_air_ingress_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "surging_air_ingress_check": {
            "question": {
                "en": "Check for air in the fuel system. Are there visible air bubbles in the fuel lines or at the bleed point?",
                "pl": "Sprawdź zapowietrzenie układu. Czy w przewodach paliwowych lub w punkcie odpowietrzania widać pęcherzyki powietrza?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, air bubbles are present", "pl": "Tak, widać pęcherzyki powietrza" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_air_in_fuel_surging" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No air bubbles visible", "pl": "Brak widocznych pęcherzyków powietrza" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "linkage_mechanical_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "linkage_mechanical_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "linkage_mechanical_check": {
            "question": {
                "en": "Inspect the throttle and governor linkage. Is there any binding, excessive friction, or significant 'slop' (play) in the connections?",
                "pl": "Sprawdź cięgna manetki i regulatora. Czy w połączeniach występują zacięcia, nadmierny opór lub znaczne luzy?"
            },
            "answers": [
                {
                    "text": { "en": "Linkage is binding or has excessive play", "pl": "Cięgna zacinają się lub mają nadmierny luz" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_linkage_repair_surging" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Linkage moves smoothly and is tight", "pl": "Cięgna poruszają się płynnie i nie mają luzów" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "engine_type_tech_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "engine_type_tech_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "engine_type_tech_check": {
            "question": {
                "en": "Is this a modern electronic (Common Rail) engine or a traditional mechanical engine?",
                "pl": "Czy to nowoczesny silnik elektroniczny (Common Rail), czy tradycyjny silnik mechaniczny?"
            },
            "answers": [
                {
                    "text": { "en": "Mechanical engine", "pl": "Silnik mechaniczny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "governor_damping_verify" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Electronic (Common Rail) engine", "pl": "Silnik elektroniczny (Common Rail)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "frp_sensor_stability_check" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "governor_damping_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "governor_damping_verify": {
            "question": {
                "en": "For mechanical governors: Check the governor oil level (if separate) or sensitivity settings. Is the governor 'hunting' even when the linkage is disconnected?",
                "pl": "Dla regulatorów mechanicznych: Sprawdź poziom oleju w regulatorze (jeśli oddzielny) lub ustawienia czułości. Czy regulator 'pływa' nawet po odłączeniu cięgien?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, governor itself is hunting", "pl": "Tak, sam regulator pływa" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_governor_service_required" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Governor seems stable", "pl": "Regulator wydaje się stabilny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "lift_pump_delivery_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "lift_pump_delivery_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "frp_sensor_stability_check": {
            "question": {
                "en": "For electronic engines: Check the Fuel Rail Pressure (FRP) sensor connector. Is there any corrosion or evidence of erratic signal behavior on the display?",
                "pl": "Dla silników elektronicznych: Sprawdź złącze czujnika ciśnienia na szynie (FRP). Czy widać korozję lub oznaki niestabilnego sygnału na wyświetlaczu?"
            },
            "answers": [
                {
                    "text": { "en": "Corroded connector or erratic FRP reading", "pl": "Skorodowane złącze lub skaczący odczyt FRP" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_frp_sensor_fault_fix" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "FRP sensor and signal look stable", "pl": "Czujnik i sygnał FRP wydają się stabilne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "lift_pump_delivery_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "lift_pump_delivery_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "lift_pump_delivery_check": {
            "question": {
                "en": "Check the fuel lift pump. Is it providing consistent pressure to the main injection pump?",
                "pl": "Sprawdź pompkę zasilającą (lift pump). Czy zapewnia ona stałe ciśnienie do głównej pompy wtryskowej?"
            },
            "answers": [
                {
                    "text": { "en": "Lift pump pressure is low or erratic", "pl": "Ciśnienie pompki zasilającej jest niskie lub skaczące" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_lift_pump_replacement_surging" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Lift pump pressure is normal", "pl": "Ciśnienie pompki zasilającej jest w normie" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.2,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "expert_required": {
            "question": { "en": "Unresolved issue. Contact mechanic.", "pl": "Nierozwiązany problem. Skontaktuj się z mechanikiem." },
            "answers": [
                { "text": { "en": "Exit", "pl": "Wyjście" }, "type": "terminate", "next": { "type": "solution", "id": "expert_required" } }
            ]
        }
    },
    "solutions": {
        "sol_air_in_fuel_surging": {
            "title": { "en": "Purge Air from Fuel System", "pl": "Odpowietrz układ paliwowy" },
            "description": { "en": "Air bubbles in the fuel lines cause inconsistent fuel delivery and RPM surging.", "pl": "Pęcherzyki powietrza w przewodach paliwowych powodują nierównomierne dawkowanie paliwa i falowanie obrotów." },
            "steps": [
                { "en": "Locate and tighten all fuel line fittings from the tank to the engine.", "pl": "Zlokalizuj i dokręć wszystkie złącza przewodów paliwowych od zbiornika do silnika." },
                { "en": "Bleed the fuel system thoroughly using the manual primer pump.", "pl": "Dokładnie odpowietrz układ paliwowy za pomocą ręcznej pompki paliwa." },
                { "en": "Check fuel filter seals for any damage that could allow air ingress.", "pl": "Sprawdź uszczelki filtra paliwa pod kątem uszkodzeń, które mogą wpuszczać powietrze." }
            ],
            "is_temporary": false
        },
        "sol_linkage_repair_surging": {
            "title": { "en": "Repair Throttle/Governor Linkage", "pl": "Napraw cięgna manetki/regulatora" },
            "description": { "en": "Binding or loose mechanical linkages prevent the governor from controlling RPM accurately.", "pl": "Zacinające się lub luźne cięgna mechaniczne uniemożliwiają regulatorowi precyzyjne sterowanie obrotami." },
            "steps": [
                { "en": "Clean and lubricate all throttle and governor linkage pivot points.", "pl": "Wyczyść i nasmaruj wszystkie punkty obrotu cięgien manetki i regulatora." },
                { "en": "Replace any worn pins, bushings, or ball joints to eliminate play.", "pl": "Wymień zużyte sworznie, tuleje lub przeguby kulowe, aby wyeliminować luzy." },
                { "en": "Ensure the linkage moves freely through its entire range without sticking.", "pl": "Upewnij się, że cięgna poruszają się swobodnie w całym zakresie bez zacięć." }
            ],
            "is_temporary": false
        },
        "sol_governor_service_required": {
            "title": { "en": "Governor Service Required", "pl": "Wymagany serwis regulatora" },
            "description": { "en": "Internal governor wear or incorrect settings are causing the engine to 'hunt' for the correct RPM.", "pl": "Wewnętrzne zużycie regulatora lub błędne ustawienia powodują, że silnik 'szuka' właściwych obrotów." },
            "steps": [
                { "en": "Check the oil level in the governor (for hydraulic/separate units) and top up if needed.", "pl": "Sprawdź poziom oleju w regulatorze (dla jednostek hydraulicznych/oddzielnych) i uzupełnij w razie potrzeby." },
                { "en": "Adjust the governor sensitivity/compensation settings if equipped.", "pl": "Wyreguluj czułość/kompensację regulatora, jeśli jest w nie wyposażony." },
                { "en": "If surging persists, the injection pump/governor must be serviced by a specialist.", "pl": "Jeśli falowanie trwa nadal, pompa wtryskowa/regulator musi zostać oddana do specjalistycznego serwisu." }
            ],
            "is_temporary": false
        },
        "sol_frp_sensor_fault_fix": {
            "title": { "en": "Repair FRP Sensor Circuit", "pl": "Napraw obwód czujnika FRP" },
            "description": { "en": "Erratic signals from the Fuel Rail Pressure sensor cause the ECU to rapidly fluctuate fuel delivery.", "pl": "Niestabilne sygnały z czujnika ciśnienia na szynie (FRP) powodują gwałtowne zmiany dawkowania paliwa przez ECU." },
            "steps": [
                { "en": "Disconnect and clean the FRP sensor electrical connector with contact cleaner.", "pl": "Odłącz i wyczyść złącze elektryczne czujnika FRP za pomocą preparatu do styków." },
                { "en": "Check the sensor wiring harness for any signs of chafing or heat damage.", "pl": "Sprawdź wiązkę czujnika pod kątem przetarć lub uszkodzeń od temperatury." },
                { "en": "If the signal remains erratic, the FRP sensor must be replaced.", "pl": "Jeśli sygnał pozostaje niestabilny, czujnik FRP musi zostać wymieniony." }
            ],
            "is_temporary": false
        },
        "sol_lift_pump_replacement_surging": {
            "title": { "en": "Service/Replace Fuel Lift Pump", "pl": "Serwisuj/wymień pompkę zasilającą" },
            "description": { "en": "A failing lift pump provides inconsistent fuel flow, leading to RPM instability.", "pl": "Wadliwa pompka zasilająca zapewnia nierównomierny przepływ paliwa, co prowadzi do niestabilności obrotów." },
            "steps": [
                { "en": "Perform a fuel flow/pressure test at the lift pump outlet.", "pl": "Przeprowadź test przepływu/ciśnienia paliwa na wyjściu pompki zasilającej." },
                { "en": "Check the lift pump filter screen (if equipped) for blockages.", "pl": "Sprawdź sitko filtra pompki zasilającej (jeśli jest) pod kątem zatorów." },
                { "en": "Replace the lift pump if it fails to maintain steady supply pressure.", "pl": "Wymień pompkę zasilającą, jeśli nie utrzymuje stałego ciśnienia zasilania." }
            ],
            "is_temporary": true
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The surging issue requires specialized diagnostic tools to evaluate the injection pump or ECU parameters.", "pl": "Problem falowania obrotów wymaga specjalistycznych narzędzi diagnostycznych do oceny pompy wtryskowej lub parametrów ECU." },
            "steps": [
                { "en": "Secure the vessel safely at the dock.", "pl": "Bezpiecznie zacumuj jednostkę w porcie." },
                { "en": "Avoid operating the engine under heavy load while surging is present.", "pl": "Unikaj pracy silnika pod dużym obciążeniem, gdy występuje falowanie." },
                { "en": "Contact a diesel engine specialist for internal pump diagnostics.", "pl": "Skontaktuj się ze specjalistą od silników diesla w celu diagnostyki wnętrza pompy." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_rpm_surging"],
        "entry_conditions_conflicting": ["engine_no_start"],
        "convergence": {
            "confidence_margin_threshold": 0.3,
            "max_steps": 10,
            "active_cause_limit": 1
        },
        "priority_order": ["safety", "knockout", "elimination", "probability"]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = rpmSurgingPath;
}


