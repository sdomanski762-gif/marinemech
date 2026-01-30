/**
 * DIESEL ENGINE CORE: LOSS OF POWER UNDER LOAD
 * Focus: Fuel flow, air restriction, exhaust restriction, overheating, drivetrain load.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const lossOfPowerUnderLoadPath = {
    tree_id: "loss_of_power_under_load",
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
                    "text": { "en": "Loss of power or unable to reach max RPM under load", "pl": "Utrata mocy lub niemożność osiągnięcia maksymalnych obrotów pod obciążeniem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "power_loss_smoke_check" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Stalls / Shutdown paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Gaśnięcie / Wyłączenie)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "power_loss_smoke_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "power_loss_smoke_check": {
            "question": {
                "en": "When the engine loses power or struggles, what is the color of the exhaust smoke?",
                "pl": "Gdy silnik traci moc lub ma trudności, jaki jest kolor dymu z wydechu?"
            },
            "answers": [
                {
                    "text": { "en": "Black smoke", "pl": "Czarny dym" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "black_smoke_restriction_check" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "White smoke or No visible smoke", "pl": "Biały dym lub brak widocznego dymu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "fuel_starvation_under_load_check" },
                    "probability": 0.4,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't see the exhaust clearly", "pl": "Nie widzę wyraźnie wydechu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "overheating_under_load_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "black_smoke_restriction_check": {
            "question": {
                "en": "Black smoke indicates an air/exhaust restriction or overload. Check the air filter and intake. Is the intake clear?",
                "pl": "Czarny dym wskazuje na ograniczenie dolotu/wydechu lub przeciążenie. Sprawdź filtr powietrza i wlot. Czy dolot jest drożny?"
            },
            "answers": [
                {
                    "text": { "en": "Air filter is dirty or intake blocked", "pl": "Filtr powietrza jest brudny lub dolot zablokowany" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_air_intake_service" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Intake is clear", "pl": "Dolot jest drożny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_elbow_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the filter now", "pl": "Nie mogę teraz sprawdzić filtra" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "exhaust_elbow_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "exhaust_elbow_check": {
            "question": {
                "en": "Check the exhaust mixing elbow (where water joins exhaust). Is there excessive carbon buildup or reduced flow?",
                "pl": "Sprawdź kolanko wydechowe (miejsce łączenia wody z wydechem). Czy jest nadmierny osad węgla lub ograniczony przepływ?"
            },
            "answers": [
                {
                    "text": { "en": "Elbow is clogged/restricted", "pl": "Kolanko jest zapchane/ograniczone" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_exhaust_elbow_clean" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Elbow seems clear", "pl": "Kolanko wydaje się drożne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "prop_fouling_under_load_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the elbow now", "pl": "Nie mogę teraz sprawdzić kolanka" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "prop_fouling_under_load_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "fuel_starvation_under_load_check": {
            "question": {
                "en": "No smoke often indicates fuel starvation. Check the primary and secondary fuel filters. Are they dirty or containing water?",
                "pl": "Brak dymu często wskazuje na głód paliwowy. Sprawdź główny i pomocniczy filtr paliwa. Czy są brudne lub zawierają wodę?"
            },
            "answers": [
                {
                    "text": { "en": "Filters are dirty/clogged", "pl": "Filtry są brudne/zapchane" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fuel_filter_service" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Filters are clean", "pl": "Filtry są czyste" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "overheating_under_load_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the filters now", "pl": "Nie mogę teraz sprawdzić filtrów" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "overheating_under_load_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "overheating_under_load_check": {
            "question": {
                "en": "Is the engine temperature rising above normal while under load?",
                "pl": "Czy temperatura silnika wzrasta powyżej normy pod obciążeniem?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, engine is running hot", "pl": "Tak, silnik się grzeje" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "cooling_system_load_check" },
                    "probability": 0.6,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, temperature is stable", "pl": "Nie, temperatura jest stabilna" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "prop_fouling_under_load_check" },
                    "probability": 0.4,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "prop_fouling_under_load_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "cooling_system_load_check": {
            "question": {
                "en": "Check raw water flow. Is the sea strainer clear and is there strong water flow at the exhaust?",
                "pl": "Sprawdź przepływ wody zaburtowej. Czy filtr wody (strainer) jest drożny i czy jest silny przepływ wody przy wydechu?"
            },
            "answers": [
                {
                    "text": { "en": "Blocked strainer or weak flow", "pl": "Zablokowany filtr lub słaby przepływ" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_raw_water_service" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Cooling system seems fine", "pl": "Układ chłodzenia wydaje się sprawny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "prop_fouling_under_load_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check now", "pl": "Nie mogę teraz sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "prop_fouling_under_load_check": {
            "question": {
                "en": "Is there any evidence of propeller fouling (barnacles, rope, net) or severe drivetrain resistance?",
                "pl": "Czy są dowody na zaplątanie śruby (pąkle, lina, sieć) lub silny opór układu napędowego?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, propeller is fouled/heavy", "pl": "Tak, śruba jest zanieczyszczona/ciężko pracuje" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_prop_fouling_clean" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Propeller seems clear", "pl": "Śruba wydaje się czysta" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the propeller now", "pl": "Nie mogę teraz sprawdzić śruby" },
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
        "sol_air_intake_service": {
            "title": { "en": "Air Intake Service", "pl": "Serwis Dolotu Powietrza" },
            "description": { "en": "The engine is starved of oxygen, causing black smoke and loss of power.", "pl": "Silnik ma zbyt mało tlenu, co powoduje czarny dym i utratę mocy." },
            "steps": [
                { "en": "Replace or clean the air filter element.", "pl": "Wymień lub wyczyść wkład filtra powietrza." },
                { "en": "Check all air intake hoses for collapses or internal delamination.", "pl": "Sprawdź wszystkie węże dolotowe pod kątem załamań lub rozwarstwień wewnętrznych." },
                { "en": "Verify the turbocharger impeller rotates freely (if applicable).", "pl": "Sprawdź, czy wirnik turbosprężarki obraca się swobodnie (jeśli dotyczy)." }
            ],
            "is_temporary": false
        },
        "sol_exhaust_elbow_clean": {
            "title": { "en": "Clean/Replace Exhaust Mixing Elbow", "pl": "Wyczyść/Wymień Kolanko Wydechowe" },
            "description": { "en": "Carbon buildup in the mixing elbow restricts exhaust gas flow, creating high backpressure.", "pl": "Osad węgla w kolanku mieszającym ogranicza przepływ spalin, tworząc duże ciśnienie wstrotne." },
            "steps": [
                { "en": "Remove the exhaust mixing elbow.", "pl": "Zdemontuj kolanko mieszające wydechu." },
                { "en": "Clean out carbon deposits using a wire brush or chemical cleaner.", "pl": "Wyczyść osady węgla za pomocą szczotki drucianej lub środka chemicznego." },
                { "en": "Inspect for internal corrosion or cracks; replace if damaged.", "pl": "Sprawdź pod kątem korozji wewnętrznej lub pęknięć; wymień jeśli uszkodzone." }
            ],
            "is_temporary": false
        },
        "sol_fuel_filter_service": {
            "title": { "en": "Fuel Filter Service", "pl": "Serwis Filtrów Paliwa" },
            "description": { "en": "Fuel flow is restricted to the high-pressure pump, preventing power under load.", "pl": "Przepływ paliwa do pompy wysokiego ciśnienia jest ograniczony, co uniemożliwia uzyskanie mocy pod obciążeniem." },
            "steps": [
                { "en": "Replace primary fuel filter (water separator).", "pl": "Wymień główny filtr paliwa (separator wody)." },
                { "en": "Replace secondary fuel filter on the engine.", "pl": "Wymień pomocniczy filtr paliwa na silniku." },
                { "en": "Bleed the fuel system to remove any air introduced during service.", "pl": "Odpowietrz układ paliwowy, aby usunąć powietrze wprowadzone podczas serwisu." }
            ],
            "is_temporary": false
        },
        "sol_raw_water_service": {
            "title": { "en": "Raw Water Cooling Service", "pl": "Serwis Chłodzenia Wodą Zaburtową" },
            "description": { "en": "The cooling system cannot keep up with the heat generated under load.", "pl": "Układ chłodzenia nie nadąża z odprowadzaniem ciepła generowanego pod obciążeniem." },
            "steps": [
                { "en": "Clean the raw water sea strainer of debris.", "pl": "Oczyść filtr wody zaburtowej (strainer) z zanieczyszczeń." },
                { "en": "Inspect and replace the raw water pump impeller if worn.", "pl": "Sprawdź i wymień wirnik pompy wody zaburtowej, jeśli jest zużyty." },
                { "en": "Check the sea cock is fully open and not partially blocked.", "pl": "Upewnij się, że zawór denny (sea cock) jest w pełni otwarty i nie jest częściowo zablokowany." }
            ],
            "is_temporary": true
        },
        "sol_prop_fouling_clean": {
            "title": { "en": "Clean Propeller and Shaft", "pl": "Oczyść Śrubę i Wał" },
            "description": { "en": "External resistance on the propeller is overloading the engine.", "pl": "Zewnętrzny opór na śrubie przeciąża silnik." },
            "steps": [
                { "en": "Inspect the propeller and shaft for ropes, nets, or heavy growth.", "pl": "Sprawdź śrubę i wał pod kątem lin, sieci lub silnego porostu." },
                { "en": "Remove all debris and scrape off barnacles if safe to do so.", "pl": "Usuń wszystkie zanieczyszczenia i zeskrob pąkle, jeśli jest to bezpieczne." },
                { "en": "Check for signs of shaft misalignment or bearing wear.", "pl": "Sprawdź oznaki niewspółosiowości wału lub zużycia łożysk." }
            ],
            "is_temporary": true
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The issue requires deeper mechanical investigation into the turbo, injectors, or internal engine health.", "pl": "Problem wymaga głębszego badania mechanicznego turbiny, wtryskiwaczy lub ogólnego stanu silnika." },
            "steps": [
                { "en": "Reduce engine load to a minimum to reach port safely.", "pl": "Zredukuj obciążenie silnika do minimum, aby bezpiecznie dotrzeć do portu." },
                { "en": "Contact service for diagnostic testing (compression, boost pressure, fuel timing).", "pl": "Skontaktuj się z serwisem w celu przeprowadzenia testów (kompresja, ciśnienie doładowania, kąt wtrysku)." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_loss_of_power"],
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
    module.exports = lossOfPowerUnderLoadPath;
}


