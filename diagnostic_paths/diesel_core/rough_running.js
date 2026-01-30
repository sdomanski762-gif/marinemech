/**
 * DIESEL ENGINE CORE: ROUGH RUNNING AT IDLE OR CRUISE
 * Focus: Injectors, Air in Fuel, Engine Mounts, Cylinder Imbalance.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const roughRunningPath = {
    tree_id: "rough_running",
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
                    "text": { "en": "Rough running, shaking, or stumbling at idle or cruise", "pl": "Nierówna praca, drżenie lub dławienie na biegu jałowym lub podczas płynięcia" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "vibration_source_check" },
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
                    "next": { "type": "node", "id": "vibration_source_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "vibration_source_check": {
            "question": {
                "en": "Is the engine itself stumbling/misfiring, or is the hull vibrating excessively despite steady RPM?",
                "pl": "Czy sam silnik się dławi/przerywa, czy kadłub nadmiernie wibruje mimo stabilnych obrotów?"
            },
            "answers": [
                {
                    "text": { "en": "Engine is stumbling/misfiring", "pl": "Silnik się dławi/przerywa" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "air_ingress_idle_check" },
                    "probability": 0.6,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Excessive vibration (Hull/Engine shaking)", "pl": "Nadmierne wibracje (Drżenie kadłuba/silnika)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "engine_mount_inspection" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "air_ingress_idle_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "engine_mount_inspection": {
            "question": {
                "en": "Inspect the engine mounts. Are they collapsed, oil-soaked, or are the mounting bolts loose?",
                "pl": "Sprawdź poduszki silnika. Czy są zapadnięte, nasączone olejem lub czy śruby mocujące są luźne?"
            },
            "answers": [
                {
                    "text": { "en": "Mounts are collapsed or loose", "pl": "Poduszki są zapadnięte lub luźne" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_engine_mount_service" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Mounts look okay", "pl": "Poduszki wyglądają na dobre" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "shaft_alignment_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the mounts", "pl": "Nie mogę sprawdzić poduszek" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "shaft_alignment_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "shaft_alignment_check": {
            "question": {
                "en": "Does the vibration increase significantly when put into gear compared to neutral?",
                "pl": "Czy wibracje znacznie wzrastają po włączeniu biegu w porównaniu do luzu?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, vibration is much worse in gear", "pl": "Tak, wibracje są znacznie gorsze na biegu" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_shaft_alignment_issue" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Vibration is similar in neutral and gear", "pl": "Wibracje są podobne na luzie i na biegu" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "air_ingress_idle_check" },
                    "probability": 0.2,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "air_ingress_idle_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "air_ingress_idle_check": {
            "question": {
                "en": "Look at the fuel lines and primary filter bowl at idle. Do you see any air bubbles or 'frothing' in the fuel?",
                "pl": "Spójrz na przewody paliwowe i odstojnik filtra na biegu jałowym. Czy widzisz pęcherzyki powietrza lub 'pienienie się' paliwa?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, air bubbles visible", "pl": "Tak, widać pęcherzyki powietrza" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fuel_air_ingress_fix" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Fuel is clear of air", "pl": "Paliwo jest czyste, bez powietrza" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "injector_knock_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "injector_knock_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "injector_knock_check": {
            "question": {
                "en": "Listen to the engine. Do you hear a rhythmic metallic 'knock' or 'clatter' from one specific cylinder?",
                "pl": "Posłuchaj silnika. Czy słyszysz rytmiczne metaliczne 'stukanie' lub 'klekot' z jednego konkretnego cylindra?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, rhythmic knocking from one cylinder", "pl": "Tak, rytmiczne stukanie z jednego cylindra" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "injector_balance_cutout_test" },
                    "probability": 0.7,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "General rough running, no specific knock", "pl": "Ogólna nierówna praca, bez konkretnego stukania" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "valve_clatter_check" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "valve_clatter_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "injector_balance_cutout_test": {
            "question": {
                "en": "If safe (Expert Mode): Loosen the high-pressure fuel nut at each injector one by one. Does the engine RPM drop for every cylinder?",
                "pl": "Jeśli bezpieczne (Tryb Ekspert): Poluzuj nakrętkę wysokiego ciśnienia na każdym wtryskiwaczu po kolei. Czy obroty spadają dla każdego cylindra?"
            },
            "answers": [
                {
                    "text": { "en": "One cylinder does NOT cause a drop", "pl": "Jeden cylinder NIE powoduje spadku obrotów" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_injector_fault_identified" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "All cylinders cause a drop", "pl": "Wszystkie cylindry powodują spadek obrotów" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "valve_clatter_check" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I cannot perform this test safely", "pl": "Nie mogę bezpiecznie wykonać tego testu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "valve_clatter_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "valve_clatter_check": {
            "question": {
                "en": "Check for valve clatter. Is there a high-pitched metallic tapping from the top of the engine?",
                "pl": "Sprawdź klekot zaworów. Czy słychać wysoki metaliczny stukot z góry silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, high-pitched tapping heard", "pl": "Tak, słychać wysoki metaliczny stukot" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_valve_adjustment_required" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No valve clatter heard", "pl": "Nie słychać klekotu zaworów" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "compression_imbalance_verify" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "compression_imbalance_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "compression_imbalance_verify": {
            "question": {
                "en": "If other checks pass, compression imbalance is likely. Is there white smoke from the exhaust at idle that disappears when warm?",
                "pl": "Jeśli inne testy przeszły pomyślnie, prawdopodobna jest nierówna kompresja. Czy z wydechu wydobywa się biały dym na wolnych obrotach, który znika po rozgrzaniu?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, white smoke at idle", "pl": "Tak, biały dym na jałowym" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_compression_overhaul_needed" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No white smoke", "pl": "Brak białego dymu" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.2,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
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
        "sol_engine_mount_service": {
            "title": { "en": "Service/Replace Engine Mounts", "pl": "Serwisuj/wymień poduszki silnika" },
            "description": { "en": "Collapsed or loose mounts transfer engine vibration directly to the hull.", "pl": "Zapadnięte lub luźne poduszki przenoszą wibracje silnika bezpośrednio na kadłub." },
            "steps": [
                { "en": "Tighten all engine mounting bolts and bracket bolts.", "pl": "Dokręć wszystkie śruby mocujące silnik i śruby wsporników." },
                { "en": "Inspect for oil-soaked rubber, which causes mounts to collapse.", "pl": "Sprawdź, czy guma nie jest nasączona olejem, co powoduje zapadanie się poduszek." },
                { "en": "Replace collapsed mounts as a set for consistent support.", "pl": "Wymień zapadnięte poduszki jako komplet dla zapewnienia równego wsparcia." }
            ],
            "is_temporary": false
        },
        "sol_shaft_alignment_issue": {
            "title": { "en": "Check Shaft Alignment", "pl": "Sprawdź osiowanie wału" },
            "description": { "en": "Misalignment between the engine and propeller shaft creates severe vibration in gear.", "pl": "Niewspółosiowość między silnikiem a wałem śruby powoduje silne wibracje na biegu." },
            "steps": [
                { "en": "Check the gap between the transmission coupling and shaft coupling with a feeler gauge.", "pl": "Sprawdź szczelinę między sprzęgłem przekładni a sprzęgłem wału za pomocą szczelinomierza." },
                { "en": "Adjust engine mount height to align the couplings within 0.003 - 0.005 inches.", "pl": "Wyreguluj wysokość poduszek silnika, aby osiować sprzęgła w granicach 0,07 - 0,12 mm." },
                { "en": "Perform final alignment when the boat is in the water (hull flexes).", "pl": "Wykonaj końcowe osiowanie, gdy łódź jest na wodzie (kadłub pracuje)." }
            ],
            "is_temporary": false
        },
        "sol_fuel_air_ingress_fix": {
            "title": { "en": "Repair Fuel Air Ingress", "pl": "Napraw zapowietrzenie paliwa" },
            "description": { "en": "Tiny air leaks cause the engine to stumble and run roughly at low speeds.", "pl": "Małe wycieki powietrza powodują dławienie się silnika i nierówną pracę na małych obrotach." },
            "steps": [
                { "en": "Tighten all fuel line connections and primary filter seals.", "pl": "Dokręć wszystkie połączenia przewodów paliwowych i uszczelki filtra głównego." },
                { "en": "Check fuel hoses for tiny cracks or 'sweating' (sign of air leak).", "pl": "Sprawdź węże paliwowe pod kątem małych pęknięć lub 'pocenia się' (oznaka nieszczelności)." },
                { "en": "Bleed the fuel system thoroughly to remove all air pockets.", "pl": "Dokładnie odpowietrz układ paliwowy, aby usunąć wszystkie poduszki powietrzne." }
            ],
            "is_temporary": false
        },
        "sol_injector_fault_identified": {
            "title": { "en": "Service/Replace Fuel Injector", "pl": "Serwisuj/wymień wtryskiwacz paliwa" },
            "description": { "en": "A faulty injector nozzle is causing uneven combustion and rough running.", "pl": "Wadliwa końcówka wtryskiwacza powoduje nierównomierne spalanie i nierówną pracę." },
            "steps": [
                { "en": "Remove the suspected injector and have it tested at a diesel shop.", "pl": "Wymontuj podejrzany wtryskiwacz i oddaj go do testów w serwisie diesla." },
                { "en": "Check for proper atomization (spray pattern) and pop-pressure.", "pl": "Sprawdź poprawność rozpylania (obraz wtrysku) i ciśnienie otwarcia." },
                { "en": "Replace the injector nozzle if the spray pattern is poor or 'streaming'.", "pl": "Wymień końcówkę wtryskiwacza, jeśli obraz wtrysku jest zły lub 'leje'." }
            ],
            "is_temporary": false
        },
        "sol_valve_adjustment_required": {
            "title": { "en": "Adjust Valve Clearances", "pl": "Wyreguluj luzy zaworowe" },
            "description": { "en": "Incorrect valve timing or clearance disrupts air intake and exhaust timing.", "pl": "Nieprawidłowy czas otwarcia zaworów lub luz zaworowy zakłóca dolot powietrza i wylot spalin." },
            "steps": [
                { "en": "Remove the valve cover and rotate the engine to Top Dead Center (TDC) for each cylinder.", "pl": "Zdejmij pokrywę zaworów i obróć silnik do Górnego Martwego Punktu (TDC) dla każdego cylindra." },
                { "en": "Use a feeler gauge to check intake and exhaust clearances.", "pl": "Użyj szczelinomierza, aby sprawdzić luzy dolotowe i wylotowe." },
                { "en": "Adjust rocker arm screws to meet manufacturer specifications.", "pl": "Wyreguluj śruby ramion dźwigienek zaworowych zgodnie ze specyfikacją producenta." }
            ],
            "is_temporary": false
        },
        "sol_compression_overhaul_needed": {
            "title": { "en": "Compression Overhaul Needed", "pl": "Wymagany remont kompresji" },
            "description": { "en": "Uneven cylinder pressure creates a mechanical imbalance that causes rough running.", "pl": "Nierówne ciśnienie w cylindrach powoduje brak równowagi mechanicznej, co objawia się nierówną pracą." },
            "steps": [
                { "en": "Perform a leak-down test to identify where compression is escaping (valves or rings).", "pl": "Przeprowadź test szczelności cylindrów, aby sprawdzić, którędy ucieka kompresja (zawory czy pierścienie)." },
                { "en": "Top-end overhaul (valves/head gasket) or full rebuild may be required.", "pl": "Może być wymagany remont góry (zawory/uszczelka głowicy) lub pełna odbudowa silnika." },
                { "en": "Contact a marine diesel specialist for engine internal repair.", "pl": "Skontaktuj się ze specjalistą od morskich diesli w celu naprawy wnętrza silnika." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The rough running issue likely involves internal engine wear or complex fuel delivery faults.", "pl": "Problem z nierówną pracą wynika prawdopodobnie z wewnętrznego zużycia silnika lub złożonych wad układu paliwowego." },
            "steps": [
                { "en": "Do not operate the engine under heavy load to prevent further damage.", "pl": "Nie używaj silnika pod dużym obciążeniem, aby zapobiec dalszym uszkodzeniom." },
                { "en": "Request a cylinder contribution test and compression check from a technician.", "pl": "Poproś technika o test wydajności cylindrów i sprawdzenie kompresji." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_running_rough"],
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
    module.exports = roughRunningPath;
}


