/**
 * DIESEL ENGINE CORE: RANDOM SHUTDOWN UNDERWAY
 * Focus: Safety-critical failures, fuel starvation, electrical stops.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const randomShutdownPath = {
    tree_id: "random_shutdown_underway",
    metadata: {
        title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "engine_start_check",
    nodes: {
        "engine_start_check": {
            "question": {
                "en": "What is the primary symptom regarding the engine shutdown?",
                "pl": "Jaki jest główny objaw dotyczący wyłączenia silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Engine shut down randomly while underway", "pl": "Silnik wyłączył się nagle podczas pracy/płynięcia" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "shutdown_safety_gate" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Stalls paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Gaśnięcie)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "shutdown_safety_gate" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "shutdown_safety_gate": {
            "question": {
                "en": "SAFETY CHECK: Do you see smoke, sparks, or feel intense heat from the engine space?",
                "pl": "KONTROLA BEZPIECZEŃSTWA: Czy widzisz dym, iskry lub czujesz intensywne ciepło z komory silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, smoke/sparks/intense heat", "pl": "Tak, dym/iskry/intensywne ciepło" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_emergency_fire_hazard" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": true
                },
                {
                    "text": { "en": "No visible smoke or fire signs", "pl": "Brak widocznego dymu lub oznak ognia" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "alarm_status_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check safely", "pl": "Nie mogę bezpiecznie sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "sol_emergency_fire_hazard" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": true
                }
            ]
        },
        "alarm_status_check": {
            "question": {
                "en": "Look at the control panel. Were there any alarms active during or immediately after shutdown?",
                "pl": "Spójrz na panel kontrolny. Czy podczas lub tuż po wyłączeniu aktywne były jakieś alarmy?"
            },
            "answers": [
                {
                    "text": { "en": "High Temperature alarm", "pl": "Alarm wysokiej temperatury (High Temp)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "thermal_shutdown_verify" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Low Oil Pressure alarm", "pl": "Alarm niskiego ciśnienia oleju (Low Oil)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "lube_system_verify" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No alarms / Panel went dark", "pl": "Brak alarmów / Panel zgasł" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "shutdown_behavior_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "shutdown_behavior_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "thermal_shutdown_verify": {
            "question": {
                "en": "Check the coolant level and raw water flow. Is the engine visibly overheating (steam, boiling)?",
                "pl": "Sprawdź poziom płynu chłodzącego i przepływ wody zaburtowej. Czy silnik widocznie się przegrzewa (para, gotowanie)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, extreme heat or steam", "pl": "Tak, ekstremalne ciepło lub para" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_critical_overheat" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": true
                },
                {
                    "text": { "en": "No, temperature seems normal", "pl": "Nie, temperatura wydaje się normalna" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "shutdown_behavior_check" },
                    "probability": 0.1,
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
        "lube_system_verify": {
            "question": {
                "en": "Check the oil level on the dipstick. Is it critically low or empty?",
                "pl": "Sprawdź poziom oleju na bagnecie. Czy jest krytycznie niski lub go brak?"
            },
            "answers": [
                {
                    "text": { "en": "Oil level below MIN / Empty", "pl": "Poziom oleju poniżej MIN / Brak" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_oil_pressure_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": true
                },
                {
                    "text": { "en": "Oil level is normal", "pl": "Poziom oleju jest w normie" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "shutdown_behavior_check" },
                    "probability": 0.1,
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
        "shutdown_behavior_check": {
            "question": {
                "en": "How did the engine stop? Abruptly (like the key was turned) or struggling/slowing down?",
                "pl": "Jak silnik zgasł? Nagle (jak po przekręceniu kluczyka) czy dławiąc się/zwalniając?"
            },
            "answers": [
                {
                    "text": { "en": "Abrupt stop (Instant)", "pl": "Nagłe zatrzymanie (Natychmiast)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "electrical_stop_solenoid_check" },
                    "probability": 0.6,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Struggling/Slowing down", "pl": "Dławienie się / Zwalnianie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "fuel_starvation_underway_check" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "electrical_stop_solenoid_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "electrical_stop_solenoid_check": {
            "question": {
                "en": "Check the stop solenoid wiring. Is there any loose connection or vibration-induced damage?",
                "pl": "Sprawdź okablowanie elektrozaworu stopu. Czy jest jakieś luźne połączenie lub uszkodzenie wywołane wibracjami?"
            },
            "answers": [
                {
                    "text": { "en": "Loose or damaged wire found", "pl": "Znaleziono luźny lub uszkodzony przewód" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_electrical_stop_fault" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Wiring looks secure", "pl": "Okablowanie wygląda na pewne" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "fuel_starvation_underway_check" },
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
        "fuel_starvation_underway_check": {
            "question": {
                "en": "Check for fuel starvation. Is the tank vent clear and are filters clean?",
                "pl": "Sprawdź pod kątem braku paliwa. Czy odpowietrznik zbiornika jest drożny i filtry są czyste?"
            },
            "answers": [
                {
                    "text": { "en": "Vacuum in tank or dirty filters", "pl": "Próżnia w zbiorniku lub brudne filtry" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fuel_vacuum_starvation" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Fuel system seems clear", "pl": "Układ paliwowy wydaje się drożny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "drivetrain_overload_check" },
                    "probability": 0.2,
                    "knockout": "none",
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
        "drivetrain_overload_check": {
            "question": {
                "en": "Check for propeller entanglement. Is there anything wrapped around the shaft or prop?",
                "pl": "Sprawdź pod kątem zaplątania śruby. Czy coś jest owinięte wokół wału lub śruby?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, prop is fouled/entangled", "pl": "Tak, śruba jest zablokowana/zaplątana" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_prop_entanglement" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Propeller is clear", "pl": "Śruba jest czysta" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check underway", "pl": "Nie mogę sprawdzić podczas płynięcia" },
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
        "sol_emergency_fire_hazard": {
            "title": { "en": "EMERGENCY: Fire Hazard", "pl": "ALARM: Zagrożenie Pożarowe" },
            "description": { "en": "Signs of fire or extreme electrical heat detected. Immediate shutdown required.", "pl": "Wykryto oznaki ognia lub ekstremalnego nagrzania elektrycznego. Wymagane natychmiastowe wyłączenie." },
            "steps": [
                { "en": "SHUT OFF main battery switch immediately.", "pl": "NATYCHMIAST wyłącz główny wyłącznik akumulatorów." },
                { "en": "Close fuel supply valves.", "pl": "Zamknij zawory odcinające paliwo." },
                { "en": "Prepare fire extinguisher; do NOT open engine space if fire is suspected.", "pl": "Przygotuj gaśnicę; NIE otwieraj komory silnika, jeśli podejrzewasz pożar." },
                { "en": "Check for crew safety and broadcast Pan-Pan if necessary.", "pl": "Sprawdź bezpieczeństwo załogi i nadaj sygnał Pan-Pan, jeśli to konieczne." }
            ],
            "is_temporary": false
        },
        "sol_critical_overheat": {
            "title": { "en": "Critical Engine Overheating", "pl": "Krytyczne Przegrzanie Silnika" },
            "description": { "en": "Engine shut down due to extreme temperature. Possible seizure risk.", "pl": "Silnik wyłączył się z powodu ekstremalnej temperatury. Możliwe ryzyko zatarcia." },
            "steps": [
                { "en": "Let the engine cool for at least 30 minutes before opening any caps.", "pl": "Pozwól silnikowi ostygnąć przez co najmniej 30 minut przed otwarciem jakichkolwiek korków." },
                { "en": "Check raw water strainer for blockages (plastic bags, seaweed).", "pl": "Sprawdź filtr wody zaburtowej pod kątem blokad (torby plastikowe, glony)." },
                { "en": "Inspect water pump impeller for damage.", "pl": "Sprawdź wirnik pompy wody pod kątem uszkodzeń." },
                { "en": "Check coolant level only when cold; top up if needed.", "pl": "Sprawdź poziom płynu chłodzącego tylko gdy jest zimny; uzupełnij w razie potrzeby." }
            ],
            "is_temporary": false
        },
        "sol_oil_pressure_failure": {
            "title": { "en": "Low Oil Pressure Shutdown", "pl": "Wyłączenie - Niskie Ciśnienie Oleju" },
            "description": { "en": "Engine shut down to prevent catastrophic internal damage due to lack of lubrication.", "pl": "Silnik wyłączył się, aby zapobiec katastrofalnemu uszkodzeniu wewnętrznemu z powodu braku smarowania." },
            "steps": [
                { "en": "DO NOT ATTEMPT RESTART until oil level is corrected.", "pl": "NIE PRÓBUJ URUCHAMIAĆ, dopóki poziom oleju nie zostanie skorygowany." },
                { "en": "Check for massive oil leaks in the bilge.", "pl": "Sprawdź, czy w zęzie nie ma ogromnych wycieków oleju." },
                { "en": "Top up oil to correct level and check dipstick again.", "pl": "Uzupełnij olej do właściwego poziomu i ponownie sprawdź bagnet." },
                { "en": "If level was okay, oil pump or sensor failure is suspected; professional help required.", "pl": "Jeśli poziom był w porządku, podejrzewa się awarię pompy oleju lub czujnika; wymagana profesjonalna pomoc." }
            ],
            "is_temporary": false
        },
        "sol_electrical_stop_fault": {
            "title": { "en": "Intermittent Stop Solenoid Fault", "pl": "Usterka Elektrozaworu Stopu" },
            "description": { "en": "Engine stopped due to accidental activation of the stop solenoid or loss of hold-in power.", "pl": "Silnik zgasł z powodu przypadkowej aktywacji elektrozaworu stopu lub utraty zasilania podtrzymującego." },
            "steps": [
                { "en": "Secure loose wiring at the stop solenoid terminals.", "pl": "Zabezpiecz luźne okablowanie na zaciskach elektrozaworu stopu." },
                { "en": "Check the stop relay in the engine electrical box.", "pl": "Sprawdź przekaźnik stopu w skrzynce elektrycznej silnika." },
                { "en": "Ensure the ignition switch is not vibrating into the 'off' or 'stop' position.", "pl": "Upewnij się, że stacyjka nie przeskakuje pod wpływem wibracji w pozycję 'off' lub 'stop'." }
            ],
            "is_temporary": true
        },
        "sol_fuel_vacuum_starvation": {
            "title": { "en": "Fuel Starvation (Vacuum or Clog)", "pl": "Brak Paliwa (Próżnia lub Zator)" },
            "description": { "en": "Engine died slowly due to inability to draw fuel from the tank.", "pl": "Silnik zgasł powoli z powodu niemożności pobrania paliwa ze zbiornika." },
            "steps": [
                { "en": "Open the fuel filler cap. If you hear a hiss (suction), the vent is blocked.", "pl": "Otwórz korek wlewu paliwa. Jeśli usłyszysz syczenie (ssanie), odpowietrznik jest zatkany." },
                { "en": "Check primary fuel filter (water separator) for heavy sludge or water.", "pl": "Sprawdź główny filtr paliwa (separator wody) pod kątem gęstego szlamu lub wody." },
                { "en": "Switch to a backup filter if a dual-filter system is installed.", "pl": "Przełącz na filtr zapasowy, jeśli zainstalowany jest system podwójnych filtrów." }
            ],
            "is_temporary": true
        },
        "sol_prop_entanglement": {
            "title": { "en": "Propeller Entanglement", "pl": "Zaplątana Śruba" },
            "description": { "en": "Engine stalled because the drivetrain was overloaded by external debris.", "pl": "Silnik zgasł, ponieważ układ napędowy został przeciążony przez zewnętrzne zanieczyszczenia." },
            "steps": [
                { "en": "Shift to neutral and attempt a very brief restart to check for vibration.", "pl": "Wrzuć luz i spróbuj bardzo krótkiego restartu, aby sprawdzić wibracje." },
                { "en": "If safe, inspect the propeller and shaft for ropes or nets.", "pl": "Jeśli to bezpieczne, sprawdź śrubę i wał pod kątem lin lub sieci." },
                { "en": "Do NOT engage gear if entanglement is confirmed until cleared.", "pl": "NIE włączaj biegu, jeśli zaplątanie zostanie potwierdzone, dopóki nie zostanie usunięte." }
            ],
            "is_temporary": true
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The issue cannot be diagnosed or fixed with onboard tools safely.", "pl": "Problemu nie można bezpiecznie zdiagnozować ani naprawić za pomocą narzędzi pokładowych." },
            "steps": [
                { "en": "Secure the vessel (anchor or sails).", "pl": "Zabezpiecz jednostkę (kotwica lub żagle)." },
                { "en": "Contact your charter base or local marine service.", "pl": "Skontaktuj się z bazą charterową lub lokalnym serwisem marynistycznym." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_shutdown_underway"],
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
    module.exports = randomShutdownPath;
}


