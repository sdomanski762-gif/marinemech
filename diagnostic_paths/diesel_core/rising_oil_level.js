/**
 * DIESEL ENGINE CORE: RISING OIL LEVEL (FUEL DILUTION)
 * Focus: Lift pump diaphragm, Injector leakage, DPF regeneration, Pump seals.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const risingOilPath = {
    tree_id: "rising_oil_level",
    metadata: {
        title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "engine_start_check",
    nodes: {
        "engine_start_check": {
            "question": {
                "en": "What is the primary symptom regarding the engine fluids?",
                "pl": "Jaki jest główny objaw dotyczący płynów silnikowych?"
            },
            "answers": [
                {
                    "text": { "en": "Oil level is rising on the dipstick ('making oil')", "pl": "Poziom oleju rośnie na bagnecie ('przybywa oleju')" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_smell_dilution_test" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Overheating / Smoke paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Przegrzewanie / Dym)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "oil_smell_dilution_test" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "oil_smell_dilution_test": {
            "question": {
                "en": "Perform a smell and blotter test. Does the oil smell strongly of diesel and form a light ring around a dark drop on paper?",
                "pl": "Przeprowadź test zapachu i test bibułowy. Czy olej pachnie intensywnie ropą i tworzy jasną obwódkę wokół ciemnej kropli na papierze?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, oil is diluted with fuel", "pl": "Tak, olej jest rozrzedzony paliwem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "engine_technology_branch" },
                    "probability": 0.8,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, oil looks/smells normal (possible coolant leak)", "pl": "Nie, olej wygląda/pachnie normalnie (możliwy wyciek płynu)" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_coolant_contamination_check" },
                    "probability": 0.2,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't perform this test", "pl": "Nie mogę wykonać tego testu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "engine_technology_branch" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "engine_technology_branch": {
            "question": {
                "en": "Is this an older mechanical engine or a modern electronic (Common Rail / DPF) engine?",
                "pl": "Czy to starszy silnik mechaniczny, czy nowoczesny silnik elektroniczny (Common Rail / DPF)?"
            },
            "answers": [
                {
                    "text": { "en": "Mechanical engine (External lift pump)", "pl": "Silnik mechaniczny (Zewnętrzna pompka zasilająca)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "lift_pump_diaphragm_verify" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Modern electronic / DPF engine", "pl": "Nowoczesny silnik elektroniczny / DPF" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "dpf_regeneration_behavior_check" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "lift_pump_diaphragm_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "lift_pump_diaphragm_verify": {
            "question": {
                "en": "Is the mechanical lift pump mounted to the engine block? Check for fuel leaking from the 'weep hole' or back of the pump.",
                "pl": "Czy mechaniczna pompka zasilająca jest zamontowana do bloku silnika? Sprawdź, czy paliwo wycieka z 'otworu kontrolnego' lub tyłu pompki."
            },
            "answers": [
                {
                    "text": { "en": "Yes, pump is leaking into block", "pl": "Tak, pompka przecieka do bloku" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_lift_pump_diaphragm_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Pump appears dry externally", "pl": "Pompka wydaje się sucha z zewnątrz" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "injector_dripping_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the pump", "pl": "Nie mogę sprawdzić pompki" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "injector_dripping_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "dpf_regeneration_behavior_check": {
            "question": {
                "en": "Has the engine been run frequently at low load (idling/trolling) or have regeneration cycles been interrupted?",
                "pl": "Czy silnik pracował często pod małym obciążeniem (bieg jałowy/trolling) lub czy cykle regeneracji były przerywane?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, frequent low-load use", "pl": "Tak, częsta praca pod małym obciążeniem" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_dpf_regeneration_dilution" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, engine runs under proper load", "pl": "Nie, silnik pracuje pod odpowiednim obciążeniem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "high_pressure_pump_seal_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "high_pressure_pump_seal_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "injector_dripping_check": {
            "question": {
                "en": "Is the engine running roughly or producing white smoke at idle? This may indicate a dripping injector (bore wash).",
                "pl": "Czy silnik pracuje nierówno lub dymi na biało na biegu jałowym? Może to wskazywać na 'lejący' wtryskiwacz (bore wash)."
            },
            "answers": [
                {
                    "text": { "en": "Yes, rough idle and white smoke", "pl": "Tak, nierówny jałowy i biały dym" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_injector_leak_bore_wash" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Idle is smooth, no smoke", "pl": "Bieg jałowy jest płynny, brak dymu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "high_pressure_pump_seal_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "high_pressure_pump_seal_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "high_pressure_pump_seal_check": {
            "question": {
                "en": "If other sources are ruled out, the internal shaft seal of the high-pressure pump may be failing. Is the pump gear-driven from the timing case?",
                "pl": "Jeśli inne źródła zostały wykluczone, wewnętrzne uszczelnienie wałka pompy wysokiego ciśnienia może być uszkodzone. Czy pompa jest napędzana kołem zębatym z rozrządu?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, gear-driven pump", "pl": "Tak, pompa napędzana zębatką" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_hp_pump_seal_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, belt-driven or external", "pl": "Nie, napęd paskiem lub zewnętrzny" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
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
            "question": { "en": "Unresolved dilution issue. Contact mechanic.", "pl": "Nierozwiązany problem rozrzedzenia. Skontaktuj się z mechanikiem." },
            "answers": [
                { "text": { "en": "Exit", "pl": "Wyjście" }, "type": "terminate", "next": { "type": "solution", "id": "expert_required" } }
            ]
        }
    },
    "solutions": {
        "sol_lift_pump_diaphragm_failure": {
            "title": { "en": "Replace Lift Pump Diaphragm", "pl": "Wymień membranę pompki zasilającej" },
            "description": { "en": "The internal rubber diaphragm has ruptured, forcing fuel into the engine oil.", "pl": "Wewnętrzna gumowa membrana pękła, wtłaczając paliwo do oleju silnikowego." },
            "steps": [
                { "en": "IMMEDIATE: Drain the fuel-diluted oil to prevent engine runaway.", "pl": "NATYCHMIAST: Spuść olej rozrzedzony paliwem, aby zapobiec rozbieganiu silnika." },
                { "en": "Remove the mechanical lift pump from the engine block.", "pl": "Zdemontuj mechaniczną pompkę zasilającą z bloku silnika." },
                { "en": "Install a new pump or rebuild kit with a fresh diaphragm.", "pl": "Zainstaluj nową pompkę lub zestaw naprawczy z nową membraną." },
                { "en": "Flush the engine with fresh oil and replace the filter.", "pl": "Przepłucz silnik świeżym olejem i wymień filtr." }
            ],
            "is_temporary": false
        },
        "sol_injector_leak_bore_wash": {
            "title": { "en": "Service/Replace Leaking Injectors", "pl": "Serwisuj/wymień nieszczelne wtryskiwacze" },
            "description": { "en": "One or more injectors are 'dripping' unburned fuel into the cylinders, which then washes into the oil.", "pl": "Jeden lub więcej wtryskiwaczy 'leje' niespalone paliwo do cylindrów, skąd przedostaje się ono do oleju." },
            "steps": [
                { "en": "Identify the faulty injector(s) through a cylinder cutout test.", "pl": "Zidentyfikuj wadliwe wtryskiwacze za pomocą testu odłączania cylindrów." },
                { "en": "Remove and test injectors for pop-pressure and spray pattern.", "pl": "Wymontuj i przetestuj wtryskiwacze pod kątem ciśnienia otwarcia i obrazu wtrysku." },
                { "en": "Replace faulty nozzles or complete injector units.", "pl": "Wymień wadliwe końcówki lub całe wtryskiwacze." },
                { "en": "IMPORTANT: Change oil and filter immediately to restore lubrication.", "pl": "WAŻNE: Natychmiast wymień olej i filtr, aby przywrócić smarowanie." }
            ],
            "is_temporary": false
        },
        "sol_dpf_regeneration_dilution": {
            "title": { "en": "Manage DPF Regeneration Cycles", "pl": "Zarządzaj cyklami regeneracji DPF" },
            "description": { "en": "Post-injection fuel during interrupted or frequent regens is migrating into the oil.", "pl": "Paliwo z wtrysku wtórnego podczas przerwanych lub częstych regeneracji przedostaje się do oleju." },
            "steps": [
                { "en": "Avoid prolonged idling or low-load operation.", "pl": "Unikaj długotrwałej pracy na jałowym lub pod małym obciążeniem." },
                { "en": "Run the engine at high load/RPM for at least 30 minutes to complete a full regen.", "pl": "Uruchom silnik pod dużym obciążeniem/obrotami przez co najmniej 30 minut, aby zakończyć pełną regenerację." },
                { "en": "If oil level continues to rise, check for sensor faults triggering excessive regens.", "pl": "Jeśli poziom oleju nadal rośnie, sprawdź błędy czujników wyzwalających nadmierne regeneracje." },
                { "en": "Change oil and filter more frequently in low-load applications.", "pl": "Wymieniaj olej i filtr częściej w zastosowaniach o małym obciążeniu." }
            ],
            "is_temporary": false
        },
        "sol_hp_pump_seal_failure": {
            "title": { "en": "Rebuild High-Pressure Pump", "pl": "Regeneruj pompę wysokiego ciśnienia" },
            "description": { "en": "The internal shaft seal has failed, allowing pressurized fuel to leak into the timing case.", "pl": "Wewnętrzne uszczelnienie wałka uległo awarii, pozwalając paliwu pod ciśnieniem wyciekać do obudowy rozrządu." },
            "steps": [
                { "en": "This is a specialist repair. Remove the high-pressure injection pump.", "pl": "To naprawa specjalistyczna. Zdemontuj wysokociśnieniową pompę wtryskową." },
                { "en": "Send the pump to a certified diesel injection shop for seal replacement.", "pl": "Wyślij pompę do certyfikowanego serwisu aparatury wtryskowej w celu wymiany uszczelnień." },
                { "en": "Flush the engine lubrication system thoroughly after repair.", "pl": "Dokładnie przepłucz układ smarowania silnika po naprawie." }
            ],
            "is_temporary": false
        },
        "sol_coolant_contamination_check": {
            "title": { "en": "Check for Coolant Contamination", "pl": "Sprawdź zanieczyszczenie płynem chłodzącym" },
            "description": { "en": "The rising level may be caused by coolant (milky appearance) rather than fuel.", "pl": "Wzrost poziomu może być spowodowany płynem chłodzącym (mleczny wygląd) a nie paliwem." },
            "steps": [
                { "en": "Check for 'milky' or 'chocolate milkshake' appearance of the oil.", "pl": "Sprawdź, czy olej ma 'mleczny' wygląd lub przypomina 'shake czekoladowy'." },
                { "en": "Check coolant level in the expansion tank; is it dropping?", "pl": "Sprawdź poziom płynu w zbiorniku wyrównawczym; czy ubywa go?" },
                { "en": "Refer to the 'Milky Oil' diagnostic path for further steps.", "pl": "Przejdź do ścieżki diagnostycznej 'Mleczny Olej' w celu dalszych kroków." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "Fuel dilution is a critical risk to engine health and safety (runaway).", "pl": "Rozrzedzenie oleju paliwem to krytyczne zagrożenie dla trwałości silnika i bezpieczeństwa (rozbieganie)." },
            "steps": [
                { "en": "Do not operate the engine until the source of dilution is fixed.", "pl": "Nie używaj silnika, dopóki źródło rozrzedzenia nie zostanie usunięte." },
                { "en": "Drain all diluted oil immediately to protect engine bearings.", "pl": "Natychmiast spuść cały rozrzedzony olej, aby chronić łożyska silnika." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_rising_oil"],
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
    module.exports = risingOilPath;
}


