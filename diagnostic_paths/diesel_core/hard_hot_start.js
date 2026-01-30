/**
 * DIESEL ENGINE CORE: HARD HOT START
 * Focus: Injection pump wear (viscosity), starter heat soak, sensors, fuel vapor.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const hardHotStartPath = {
    tree_id: "hard_hot_start",
    metadata: {
        title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "engine_start_check",
    nodes: {
        "engine_start_check": {
            "question": {
                "en": "What is the primary symptom regarding the engine start?",
                "pl": "Jaki jest główny objaw dotyczący rozruchu silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Hard to start when hot/warm (but starts fine when cold)", "pl": "Trudno zapala gdy jest ciepły/gorący (ale zapala dobrze na zimno)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "hot_crank_speed_verify" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Cold Start paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Zimny Rozruch)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "hot_crank_speed_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "hot_crank_speed_verify": {
            "question": {
                "en": "Does the engine crank at normal speed when hot, or does it sound slower/labored compared to a cold start?",
                "pl": "Czy silnik kręci się z normalną prędkością gdy jest gorący, czy brzmi na wolniejszy/ociężały w porównaniu do zimnego rozruchu?"
            },
            "answers": [
                {
                    "text": { "en": "Crank speed is normal", "pl": "Prędkość kręcenia jest normalna" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "hot_pump_cooling_test" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Crank is slower/labored when hot", "pl": "Kręcenie jest wolniejsze/ociężałe gdy jest gorący" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "starter_heat_soak_check" },
                    "probability": 0.7,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "hot_pump_cooling_test" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "starter_heat_soak_check": {
            "question": {
                "en": "Check the starter motor and solenoid. Does the engine start better if you cool the starter with a damp cloth or wait for it to cool?",
                "pl": "Sprawdź rozrusznik i elektrowłącznik. Czy silnik zapala lepiej, jeśli schłodzisz rozrusznik wilgotną szmatką lub poczekasz, aż ostygnie?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, cooling the starter helps", "pl": "Tak, schłodzenie rozrusznika pomaga" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_starter_heat_soak_fix" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, cooling doesn't help", "pl": "Nie, chłodzenie nie pomaga" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "battery_cable_heat_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "battery_cable_heat_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "battery_cable_heat_check": {
            "question": {
                "en": "Check the battery cables and terminals. Are they hot to the touch or showing high resistance when hot?",
                "pl": "Sprawdź kable akumulatora i zaciski. Czy są gorące w dotyku lub wykazują duży opór gdy są ciepłe?"
            },
            "answers": [
                {
                    "text": { "en": "Cables/Terminals are hot", "pl": "Kable/Zaciski są gorące" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_cable_heat_resistance" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Cables feel normal", "pl": "Kable wydają się normalne" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "hot_pump_cooling_test" },
                    "probability": 0.2,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "hot_pump_cooling_test" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "hot_pump_cooling_test": {
            "question": {
                "en": "Cool the high-pressure injection pump with a damp cloth or cool water. Does the engine start immediately after cooling the pump?",
                "pl": "Schłodź wysokociśnieniową pompę wtryskową wilgotną szmatką lub chłodną wodą. Czy silnik zapala natychmiast po schłodzeniu pompy?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, starts after cooling pump", "pl": "Tak, zapala po schłodzeniu pompy" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_pump_internal_wear" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, cooling pump doesn't help", "pl": "Nie, schłodzenie pompy nie pomaga" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "sensor_thermal_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "sensor_thermal_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "sensor_thermal_verify": {
            "question": {
                "en": "Does the tachometer (RPM gauge) move while cranking hot? Are there any sensor-related fault lights?",
                "pl": "Czy obrotomierz (wskaźnik RPM) porusza się podczas kręcenia na gorąco? Czy świecą się jakieś lampki błędów czujników?"
            },
            "answers": [
                {
                    "text": { "en": "No RPM reading / Fault light on", "pl": "Brak odczytu RPM / Świeci lampka błędu" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_sensor_thermal_fault" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "RPM reading is normal", "pl": "Odczyt RPM jest normalny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "fuel_vapor_vent_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "fuel_vapor_vent_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "fuel_vapor_vent_check": {
            "question": {
                "en": "Is the engine room extremely hot? Try venting the engine space for 10 mins. Does it start then?",
                "pl": "Czy w maszynowni jest ekstremalnie gorąco? Spróbuj przewietrzyć komorę silnika przez 10 min. Czy wtedy zapala?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, starts after venting", "pl": "Tak, zapala po przewietrzeniu" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_engine_room_venting" },
                    "probability": 0.7,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Venting doesn't help", "pl": "Wietrzenie nie pomaga" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.3,
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
        "sol_starter_heat_soak_fix": {
            "title": { "en": "Starter Heat Soak", "pl": "Nagrzanie Rozrusznika (Heat Soak)" },
            "description": { "en": "High engine room temperatures increase the electrical resistance in the starter windings.", "pl": "Wysokie temperatury w maszynowni zwiększają opór elektryczny w uzwojeniach rozrusznika." },
            "steps": [
                { "en": "Allow the engine room to cool down or use a blower.", "pl": "Pozwól maszynowni ostygnąć lub użyj wentylatora." },
                { "en": "Install a heat shield between the exhaust and the starter if possible.", "pl": "Zainstaluj osłonę termiczną między wydechem a rozrusznikiem, jeśli to możliwe." },
                { "en": "Rebuild or replace the starter with a high-torque unit designed for hot conditions.", "pl": "Zregeneruj lub wymień rozrusznik na model o dużym momencie obrotowym dostosowany do pracy w cieple." }
            ],
            "is_temporary": true
        },
        "sol_cable_heat_resistance": {
            "title": { "en": "Battery Cable Resistance", "pl": "Opór Kabli Akumulatora" },
            "description": { "en": "Hot cables or corroded terminals increase resistance, preventing enough current from reaching the starter.", "pl": "Gorące kable lub skorodowane zaciski zwiększają opór, uniemożliwiając dotarcie wystarczającego prądu do rozrusznika." },
            "steps": [
                { "en": "Clean all battery terminals and engine ground points.", "pl": "Wyczyść wszystkie zaciski akumulatora i punkty masowe silnika." },
                { "en": "Ensure cables are properly sized (AWG) for the length of the run.", "pl": "Upewnij się, że kable mają odpowiedni przekrój (AWG) dla ich długości." },
                { "en": "Replace cables if the insulation is brittle or the copper is oxidized.", "pl": "Wymień kable, jeśli izolacja jest krucha lub miedź jest utleniona." }
            ],
            "is_temporary": false
        },
        "sol_pump_internal_wear": {
            "title": { "en": "Injection Pump Internal Wear", "pl": "Wewnętrzne Zużycie Pompy Wtryskowej" },
            "description": { "en": "Hot, thin fuel leaks past worn internal pump components, preventing enough pressure for starting.", "pl": "Gorące, rzadkie paliwo wycieka przez zużyte elementy wewnętrzne pompy, uniemożliwiając wytworzenie ciśnienia do rozruchu." },
            "steps": [
                { "en": "This is a definitive sign of injection pump wear.", "pl": "To definitywny objaw zużycia pompy wtryskowej." },
                { "en": "The pump must be removed and rebuilt by a specialist diesel shop.", "pl": "Pompa musi zostać wymontowana i zregenerowana przez specjalistyczny serwis diesla." },
                { "en": "As a temporary measure, using higher quality fuel or additives may slightly help.", "pl": "Tymczasowo, użycie paliwa wyższej jakości lub dodatków może nieco pomóc." }
            ],
            "is_temporary": false
        },
        "sol_sensor_thermal_fault": {
            "title": { "en": "Sensor Thermal Failure", "pl": "Termiczna Awaria Czujnika" },
            "description": { "en": "Crankshaft or camshaft position sensors often fail when hot due to thermal expansion.", "pl": "Czujniki położenia wału korbowego lub wałka rozrządu często ulegają awarii na gorąco przez rozszerzalność cieplną." },
            "steps": [
                { "en": "Verify the sensor resistance with a multimeter when hot.", "pl": "Sprawdź oporność czujnika multimetrem, gdy jest gorący." },
                { "en": "Replace the faulty sensor (Crankshaft Position Sensor is most common).", "pl": "Wymień wadliwy czujnik (najczęściej czujnik położenia wału korbowego)." },
                { "en": "Ensure sensor wiring is not routed too close to hot exhaust components.", "pl": "Upewnij się, że okablowanie czujnika nie przebiega zbyt blisko gorących elementów wydechu." }
            ],
            "is_temporary": false
        },
        "sol_engine_room_venting": {
            "title": { "en": "Improve Engine Room Ventilation", "pl": "Popraw Wentylację Maszynowni" },
            "description": { "en": "Excessive ambient heat leads to fuel thinning and air density issues.", "pl": "Nadmierne ciepło otoczenia prowadzi do rzednięcia paliwa i problemów z gęstością powietrza." },
            "steps": [
                { "en": "Check that engine room blowers are operational.", "pl": "Sprawdź, czy wentylatory maszynowni działają." },
                { "en": "Ensure intake and exhaust vents are not obstructed.", "pl": "Upewnij się, że wloty i wyloty powietrza nie są zasłonięte." },
                { "en": "Add insulation to exhaust dry-stack components.", "pl": "Dodaj izolację na suche elementy układu wydechowego." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The hot start issue requires specialized testing of the fuel and control systems.", "pl": "Problem z rozruchem na gorąco wymaga specjalistycznych testów układu paliwowego i sterowania." },
            "steps": [
                { "en": "Do not attempt to rebuild the injection pump yourself.", "pl": "Nie próbuj samodzielnie regenerować pompy wtryskowej." },
                { "en": "Contact a diesel specialist for pump and sensor diagnostics.", "pl": "Skontaktuj się ze specjalistą diesla w celu diagnostyki pompy i czujników." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_hard_start_hot"],
        "entry_conditions_conflicting": ["engine_no_start", "engine_hard_start_cold"],
        "convergence": {
            "confidence_margin_threshold": 0.3,
            "max_steps": 10,
            "active_cause_limit": 1
        },
        "priority_order": ["safety", "knockout", "elimination", "probability"]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = hardHotStartPath;
}


