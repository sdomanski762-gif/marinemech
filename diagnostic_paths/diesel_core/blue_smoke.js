/**
 * DIESEL ENGINE CORE: PERSISTENT BLUE SMOKE
 * Focus: Oil consumption, Turbo seals, Valve guides, Crankcase ventilation.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const blueSmokePath = {
    tree_id: "blue_smoke",
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
                    "text": { "en": "Persistent blue-grey smoke from exhaust", "pl": "Utrzymujący się niebiesko-szary dym z wydechu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_level_verify_gate" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Overheating / Loss of Power paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Przegrzewanie / Utrata Mocy)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "oil_level_verify_gate" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "oil_level_verify_gate": {
            "question": {
                "en": "Check the oil level on the dipstick. Is it above the MAX mark?",
                "pl": "Sprawdź poziom oleju na bagnecie. Czy jest powyżej znaku MAX?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, oil is overfilled", "pl": "Tak, jest za dużo oleju" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_oil_overfilled_fix" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, oil level is within normal range", "pl": "Nie, poziom oleju jest w normie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "breather_pressure_test" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the oil now", "pl": "Nie mogę teraz sprawdzić oleju" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "breather_pressure_test" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "breather_pressure_test": {
            "question": {
                "en": "With the engine running, carefully remove the oil filler cap. Is there significant pressure or 'huffing' smoke (blow-by)?",
                "pl": "Przy pracującym silniku ostrożnie zdejmij korek wlewu oleju. Czy widać znaczne ciśnienie lub 'buchanie' dymem (przedmuchy)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, heavy pressure/smoke from filler", "pl": "Tak, silne ciśnienie/dym z wlewu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "breather_system_clog_check" },
                    "probability": 0.7,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No pressure, or very light mist", "pl": "Brak ciśnienia lub bardzo lekka mgiełka" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "turbo_oil_seal_verify" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't perform this test safely", "pl": "Nie mogę bezpiecznie wykonać tego testu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "turbo_oil_seal_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "breather_system_clog_check": {
            "question": {
                "en": "Check the crankcase breather hose and PCV/CCV filter. Is it clogged, kinked, or dripping with oil?",
                "pl": "Sprawdź wąż odpowietrzenia skrzyni korbowej i filtr PCV/CCV. Czy jest zapchany, zagięty lub ocieka olejem?"
            },
            "answers": [
                {
                    "text": { "en": "Breather is clogged/restricted", "pl": "Odpowietrzenie jest zapchane/ograniczone" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_breather_service" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Breather is clear", "pl": "Odpowietrzenie jest drożne" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_piston_ring_wear_detected" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the breather", "pl": "Nie mogę sprawdzić odpowietrzenia" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "turbo_oil_seal_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "turbo_oil_seal_verify": {
            "question": {
                "en": "Is the engine turbocharged? If so, check the intake pipes for excessive liquid oil. Is oil present in the turbo intake/outlet?",
                "pl": "Czy silnik ma turbosprężarkę? Jeśli tak, sprawdź rury dolotowe pod kątem nadmiaru płynnego oleju. Czy olej jest obecny we wlocie/wylocie turbo?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, liquid oil found in turbo pipes", "pl": "Tak, znaleziono płynny olej w rurach turbo" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_turbo_oil_seal_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No oil, or engine is naturally aspirated", "pl": "Brak oleju lub silnik wolnossący" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "smoke_timing_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the turbo", "pl": "Nie mogę sprawdzić turbo" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "smoke_timing_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "smoke_timing_check": {
            "question": {
                "en": "When is the blue smoke most visible? At cold start (clears later) or persistent throughout operation?",
                "pl": "Kiedy niebieski dym jest najbardziej widoczny? Przy zimnym rozruchu (później znika) czy utrzymuje się cały czas?"
            },
            "answers": [
                {
                    "text": { "en": "Mainly at cold start / idling", "pl": "Głównie przy zimnym starcie / na jałowym" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_valve_stem_seal_failure" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Persistent / Worsens under load", "pl": "Utrzymuje się / Pogarsza pod obciążeniem" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_piston_ring_wear_detected" },
                    "probability": 0.8,
                    "knockout": "others",
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
        "sol_oil_overfilled_fix": {
            "title": { "en": "Drain Excess Engine Oil", "pl": "Spuść nadmiar oleju silnikowego" },
            "description": { "en": "Excessive oil is being whipped into a mist and burned in the combustion chamber.", "pl": "Nadmiar oleju jest zamieniany w mgiełkę i spalany w komorze spalania." },
            "steps": [
                { "en": "Drain oil until it reaches the midpoint between MIN and MAX on the dipstick.", "pl": "Spuść olej, aż osiągnie połowę odległości między MIN a MAX na bagnecie." },
                { "en": "Run the engine to burn off residual oil in the intake/exhaust.", "pl": "Uruchom silnik, aby wypalić resztki oleju w dolocie/wydechu." },
                { "en": "Monitor oil level; if it rises again, suspect fuel dilution (rising oil).", "pl": "Monitoruj poziom oleju; jeśli ponownie wzrośnie, podejrzewaj rozrzedzenie paliwem." }
            ],
            "is_temporary": false
        },
        "sol_breather_service": {
            "title": { "en": "Service Crankcase Breather", "pl": "Serwisuj odpowietrzenie skrzyni korbowej" },
            "description": { "en": "High crankcase pressure is forcing oil into the air intake system.", "pl": "Wysokie ciśnienie w skrzyni korbowej wypycha olej do układu dolotowego." },
            "steps": [
                { "en": "Clean or replace the crankcase breather filter/element.", "pl": "Wyczyść lub wymień filtr/element odpowietrzenia skrzyni korbowej." },
                { "en": "Ensure the breather hose is not kinked or blocked.", "pl": "Upewnij się, że wąż odpowietrzenia nie jest zagięty ani zablokowany." },
                { "en": "Clean liquid oil from the air intake manifold if accessible.", "pl": "Wyczyść płynny olej z kolektora dolotowego, jeśli jest dostępny." }
            ],
            "is_temporary": false
        },
        "sol_turbo_oil_seal_failure": {
            "title": { "en": "Turbocharger Oil Seal Failure", "pl": "Awaria uszczelnienia olejowego turbo" },
            "description": { "en": "Oil is leaking past internal turbo seals into the air intake or exhaust stream.", "pl": "Olej wycieka przez wewnętrzne uszczelnienia turbo do dolotu lub wydechu." },
            "steps": [
                { "en": "Do not operate the engine under high load to prevent 'runaway' (engine running on its own oil).", "pl": "Nie używaj silnika pod dużym obciążeniem, aby zapobiec rozbieganiu (silnik pracujący na własnym oleju)." },
                { "en": "The turbocharger must be rebuilt or replaced by a specialist.", "pl": "Turbosprężarka musi zostać zregenerowana lub wymieniona przez specjalistę." },
                { "en": "Clean all oil from the intercooler and intake piping.", "pl": "Wyczyść cały olej z intercoolera i rur dolotowych." }
            ],
            "is_temporary": false
        },
        "sol_valve_stem_seal_failure": {
            "title": { "en": "Valve Stem Seal Failure", "pl": "Awaria uszczelniaczy zaworowych" },
            "description": { "en": "Oil is leaking down the valve guides into the cylinders, especially when cold.", "pl": "Olej ścieka po prowadnicach zaworów do cylindrów, szczególnie na zimno." },
            "steps": [
                { "en": "Monitor oil consumption; this issue is often manageable in the short term.", "pl": "Monitoruj zużycie oleju; ten problem jest często do opanowania w krótkim terminie." },
                { "en": "The cylinder head must eventually be removed to replace seals and guides.", "pl": "Głowica cylindrów musi zostać w końcu zdemontowana w celu wymiany uszczelniaczy i prowadnic." },
                { "en": "Avoid prolonged idling, which increases oil pull-down into the cylinders.", "pl": "Unikaj długotrwałej pracy na jałowym, co zwiększa zaciąganie oleju do cylindrów." }
            ],
            "is_temporary": false
        },
        "sol_piston_ring_wear_detected": {
            "title": { "en": "Severe Piston Ring/Cylinder Wear", "pl": "Poważne zużycie pierścieni/cylindrów" },
            "description": { "en": "Worn oil control rings are allowing oil to be burned during every power stroke.", "pl": "Zużyte pierścienie zgarniające pozwalają na spalanie oleju podczas każdego suwu pracy." },
            "steps": [
                { "en": "Perform a compression and leak-down test to confirm internal wear.", "pl": "Przeprowadź test kompresji i szczelności cylindrów, aby potwierdzić zużycie wewnętrzne." },
                { "en": "A top-end or full engine overhaul is required.", "pl": "Wymagany jest remont góry lub całego silnika." },
                { "en": "Check for 'cylinder glazing' if the engine has been run under light load for long periods.", "pl": "Sprawdź, czy nie wystąpiło szkliwienie gładzi cylindrów, jeśli silnik pracował długo pod małym obciążeniem." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "Persistent blue smoke indicates internal engine wear or turbocharger failure.", "pl": "Utrzymujący się niebieski dym wskazuje na wewnętrzne zużycie silnika lub awarię turbosprężarki." },
            "steps": [
                { "en": "Secure the vessel safely.", "pl": "Bezpiecznie zabezpiecz jednostkę." },
                { "en": "Request a compression test and turbocharger inspection.", "pl": "Poproś o test kompresji i inspekcję turbosprężarki." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_smoke_blue"],
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
    module.exports = blueSmokePath;
}


