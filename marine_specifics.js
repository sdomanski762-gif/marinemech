
// ==========================================
// BAZA WIEDZY SPECYFICZNA DLA MAREK (ENGINE SPECIFICS)
// ==========================================

const marineSpecifics = {
    // === YANMAR (GM / YM / JH Series) ===
    yanmar: {
        id: 'yanmar',
        name: 'Yanmar Diesel (GM/YM/JH)',
        common_issues: {
            // Yanmar Specific: Mixing Elbow
            mixing_elbow_clog: {
                id: 'yan_mixing_elbow',
                name_pl: 'Zatkana kolanko wydechowe (Mixing Elbow)',
                base_probability: 0.35, 
                symptoms: ['vis_smoke_black', 'vis_smoke_white', 'eng_stalls_load'],
                verification_questions: [
                    {
                        id: 'q_yan_elbow_age',
                        question_pl: 'Kiedy ostatnio wymieniano kolanko wydechowe (Mixing Elbow)?',
                        question_amateur_pl: 'Czy silnik dymi na czarno i nie ma siły płynąć pod wiatr?',
                        question_expert_pl: 'Jaki jest przebieg na obecnym kolanku wydechowym (Mixing Elbow)?',
                        answers: [
                            { text_pl: 'Ponad 500h / 3 lata temu', probability_change: 0.8, type: 'confirm' },
                            { text_pl: 'Jest nowe (<100h)', probability_change: -0.9, type: 'reject' }
                        ],
                        answers_amateur: [
                            { text_pl: 'Tak, dymi i słabnie', probability_change: 0.8, type: 'confirm' },
                            { text_pl: 'Nie, działa normalnie', probability_change: -0.5, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Yanmar zaleca wymianę co 500h. Sprawdź zwężenie przekroju (nagarem).'
            },
            // Yanmar Specific: Lift Pump
            lift_pump_diaphragm: {
                id: 'yan_lift_pump',
                name_pl: 'Pęknięta membrana pompki paliwa',
                base_probability: 0.2,
                symptoms: ['eng_stalls_load', 'vis_leak_oil'], 
                verification_questions: [
                    {
                        id: 'q_yan_oil_level_rise',
                        question_pl: 'Czy poziom oleju w silniku się PODNIÓSŁ?',
                        question_amateur_pl: 'Sprawdź bagnet oleju. Czy oleju jest ZA DUŻO (powyżej MAX)?',
                        question_expert_pl: 'Czy występuje zjawisko przybywania oleju (rozrzedzenie ropą)?',
                        answers: [
                            { text_pl: 'Tak, oleju jest więcej i śmierdzi ropą', probability_change: 0.95, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Nie, poziom w normie', probability_change: -0.6, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Wymień mechaniczną pompkę paliwa (lift pump). Nie naprawiaj membrany.'
            }
        }
    },

    // === VOLVO PENTA (2000 Series / MD / D1-D2) ===
    volvo: {
        id: 'volvo',
        name: 'Volvo Penta (MD/2000/D-Series)',
        common_issues: {
            // Volvo D1/D2 Specific: MDI Box
            mdi_failure: {
                id: 'vp_mdi_box',
                name_pl: 'Awaria modułu MDI (Czarna skrzynka)',
                base_probability: 0.35, // Bardzo częste w serii D
                symptoms: ['eng_no_crank', 'elec_flicker', 'ins_volt_low'],
                verification_questions: [
                    {
                        id: 'q_vp_mdi_button',
                        question_pl: 'Czy przycisk startu w ogóle nie reaguje?',
                        question_amateur_pl: 'Znajdź czarną skrzynkę na silniku. Czy jest tam mały guzik bezpiecznika?',
                        question_expert_pl: 'Czy MDI zgłasza błędy? Czy bezpiecznik bimetaliczny na MDI wybił?',
                        answers: [
                            { text_pl: 'Tak, wcisnąłem go i odpalił!', probability_change: 0.99, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Guzik jest wciśnięty / Brak guzika', probability_change: -0.2, type: 'neutral' }
                        ]
                    }
                ],
                repair_tip: 'Wciśnij bezpiecznik na module MDI (na górze silnika). Jeśli wraca - wymień MDI.'
            },
            // Volvo Specific: Cold Start
            cold_start_procedure: {
                id: 'vp_cold_start',
                name_pl: 'Błędna procedura startu (Zimny start)',
                base_probability: 0.4, 
                symptoms: ['eng_cranks_no_start', 'vis_smoke_white'],
                verification_questions: [
                    {
                        id: 'q_vp_glow_time',
                        question_pl: 'Czy grzałeś świece przez 10-15 sekund?',
                        question_amateur_pl: 'Czy trzymałeś kluczyk/guzik w pozycji "Glow" (Grzanie) przez 15 sekund?',
                        question_expert_pl: 'Weryfikacja czasu grzania świec żarowych.',
                        answers: [
                            { text_pl: 'Nie, kręciłem od razu', probability_change: 0.8, type: 'confirm' },
                            { text_pl: 'Tak, grzałem długo', probability_change: -0.4, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Volvo D1/D2 wymagają długiego grzania świec, nawet w ciepłe dni.'
            }
        }
    },

    // === OUTBOARD ENGINES (GENERIC & SPECIFIC) ===
    yamaha: {
        id: 'yamaha',
        name: 'Yamaha Outboard (F Series)',
        common_issues: {
            // Yamaha Specific: Transport Leak
            yam_transport_leak: {
                id: 'yam_transport_leak',
                name_pl: 'Wyciek oleju po transporcie',
                base_probability: 0.6,
                symptoms: ['vis_leak_oil', 'eng_cranks_no_start', 'vis_smoke_white'],
                verification_questions: [
                    {
                        id: 'q_yam_side',
                        question_pl: 'Na którym boku leżał silnik podczas transportu?',
                        question_amateur_pl: 'Czy silnik leżał na boku z rączką (rumplem)?',
                        answers: [
                            { text_pl: 'Na stronie rumpla (Dobrze)', probability_change: -0.5, type: 'reject' },
                            { text_pl: 'Na drugim boku / Na śrubie', probability_change: 0.9, knockout: 'others', type: 'confirm' }
                        ]
                    }
                ],
                repair_tip: 'Yamaha 4-suw musi leżeć na stronie rumpla. Olej zalał cylinder/gaźnik. Wykręć świecę, wydmuchaj cylinder.'
            },
            // Yamaha: Old Fuel
            yam_carb_clog: {
                id: 'yam_carb_clog',
                name_pl: 'Zatkanie dyszy gaźnika (Stare paliwo)',
                base_probability: 0.4,
                symptoms: ['eng_stalls_idle', 'eng_cranks_no_start'],
                verification_questions: [
                    {
                        id: 'q_yam_storage',
                        question_pl: 'Czy paliwo zostało wypalone przed zimą/postojem?',
                        answers: [
                            { text_pl: 'Nie, zostało w gaźniku', probability_change: 0.8, type: 'confirm' },
                            { text_pl: 'Tak, wypalone do zera', probability_change: -0.6, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Spuść paliwo z komory pływakowej (śrubka na dole gaźnika). Nalej świeżego.'
            }
        }
    },

    mercury: {
        id: 'mercury',
        name: 'Mercury Outboard (4/5/6hp)',
        common_issues: {
            // Mercury: Tank Selection
            merc_tank_select: {
                id: 'merc_tank_select',
                name_pl: 'Zły wybór zbiornika (Int/Ext)',
                base_probability: 0.5,
                symptoms: ['eng_stalls_load', 'eng_stalls_idle'],
                verification_questions: [
                    {
                        id: 'q_merc_valve',
                        question_pl: 'Jak ustawiony jest przełącznik paliwa (na górze obudowy)?',
                        question_amateur_pl: 'Czy pokrętło na górze silnika wskazuje na właściwy zbiornik?',
                        answers: [
                            { text_pl: 'Na wewnętrzny (a używam zewnętrznego)', probability_change: 0.95, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Jest OK', probability_change: -0.3, type: 'neutral' }
                        ]
                    }
                ],
                repair_tip: 'Mercury 4/5/6hp ma zawór 2-drożny. Ustaw zgodnie ze źródłem paliwa.'
            },
             // Mercury: Fuel Pump
            merc_fuel_pump: {
                id: 'merc_fuel_pump',
                name_pl: 'Awaria membrany pompy paliwa',
                base_probability: 0.3,
                symptoms: ['eng_stalls_load', 'eng_stalls_idle'],
                verification_questions: [
                    {
                        id: 'q_merc_bulb',
                        question_pl: 'Czy pompowanie gruszką utrzymuje silnik przy życiu?',
                        answers: [
                            { text_pl: 'Tak, jak pompuję to działa', probability_change: 0.9, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Nie pomaga', probability_change: -0.3, type: 'neutral' }
                        ]
                    }
                ],
                repair_tip: 'Wymień zestaw naprawczy pompy paliwa (membrany).'
            }
        }
    },

    honda: {
        id: 'honda',
        name: 'Honda Outboard (BF 2.3 Air Cooled)',
        common_issues: {
            // Honda Specific: Air Cooled (No Water Stream!)
            honda_air_cooled_confusion: {
                id: 'honda_no_water',
                name_pl: 'Brak wody chłodzącej (To normalne!)',
                base_probability: 0.9, // Bardzo częsta pomyłka amatorów
                symptoms: ['ins_temp_high', 'vis_smoke_white'], // Użytkownik myśli że dymi/grzeje się bo nie ma wody
                verification_questions: [
                    {
                        id: 'q_honda_model',
                        question_pl: 'Czy to model Honda 2.3 (z czarną kratką na górze)?',
                        answers: [
                            { text_pl: 'Tak, BF 2.3', probability_change: 1.0, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Nie, większy (chłodzony wodą)', probability_change: -1.0, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Honda BF 2.3 jest chłodzona POWIETRZEM. Nie ma "sikawki" wody. To nie awaria.'
            },
            // Honda: Centrifugal Clutch
            honda_prop_idle: {
                id: 'honda_prop_idle',
                name_pl: 'Śruba nie kręci się na wolnych (Sprzęgło)',
                base_probability: 0.8,
                symptoms: ['eng_stalls_load'], // Użytkownik myśli że coś nie tak z napędem
                verification_questions: [
                    {
                        id: 'q_honda_gas',
                        question_pl: 'Czy śruba zaczyna się kręcić dopiero po dodaniu gazu?',
                        answers: [
                            { text_pl: 'Tak, na wolnych stoi', probability_change: 0.9, knockout: 'others', type: 'confirm' },
                            { text_pl: 'Nie kręci się wcale', probability_change: -0.5, type: 'reject' }
                        ]
                    }
                ],
                repair_tip: 'Ten silnik ma sprzęgło odśrodkowe. Śruba stoi na wolnych obrotach - to funkcja bezpieczeństwa.'
            }
        }
    }
};

// ==========================================
// DRZEWA DECYZYJNE (DIAGNOSTIC TREES)
// ==========================================
// Template for users to add new logic
const diagnosticTrees = {
    // Electrical Core (Legacy format for reference)
    "electrical_core_legacy": {
        id: "electrical_core_legacy",
        title_pl: "System Elektryczny (Legacy)",
        start_node: "safety_check",
        nodes: {
            "safety_check": {
                question_pl: "Czy czujesz zapach spalenizny?",
                answers: [
                    { text_pl: "Tak", solution_id: "fire_hazard" },
                    { text_pl: "Nie", next_node: "main_symptom" }
                ]
            }
        }
    }
};

/**
 * PRODUCTION DIAGNOSTIC TREES (Strict Contract)
 */
const productionTrees = {
    "electrical_core": {
        tree_id: "electrical_core",
        metadata: {
            title: { en: "Marine Electrical System Diagnostic Tree", pl: "System Elektryczny (Electrical System)" },
            version: "1.1",
            engine_type: "electrical"
        },
        start_node: "electrical_system_select",
        nodes: {
            "electrical_system_select": {
                question: { en: "Select the system you have trouble with:", pl: "Wybierz system, z którym masz problem:" },
                answers: [
                    { text: { en: "⚠️ SMOKE / FIRE / SPARKS", pl: "⚠️ DYM / OGIEŃ / ISKRY" }, type: "standard", next: { type: "tree", id: "electrical_emergency" } },
                    { text: { en: "Anchor Windlass", pl: "Winda Kotwiczna (Windlass)" }, type: "standard", next: { type: "node", id: "windlass_check" } },
                    { text: { en: "Electric Winches", pl: "Kabestany Elektryczne" }, type: "standard", next: { type: "node", id: "winch_check" } },
                    { text: { en: "Navigation Lights", pl: "Światła Nawigacyjne" }, type: "standard", next: { type: "node", id: "nav_lights_check" } },
                    { text: { en: "Main Panel / Fuses", pl: "Panel Główny / Bezpieczniki" }, type: "standard", next: { type: "node", id: "one_system_dead_check" } },
                    { text: { en: "Batteries / Charging", pl: "Akumulatory / Ładowanie" }, type: "standard", next: { type: "node", id: "charging_check" } },
                    { text: { en: "Bilge Pump", pl: "Pompa Zęzowa (Bilge)" }, type: "standard", next: { type: "node", id: "bilge_pump_check" } },
                    { text: { en: "Other / General Issues", pl: "Inne / Ogólne Problemy" }, type: "standard", next: { type: "node", id: "safety_check" } }
                ]
            },
            "safety_check": {
                question: { en: "Smell smoke/burning, see sparks, or feel heat on wires?", pl: "Czy czujesz zapach spalenizny, widzisz dym, iskry lub gorące przewody?" },
                answers: [
                    { text: { en: "YES - Smoke/Sparks/Heat", pl: "TAK - Dym/Iskry/Gorąco" }, type: "standard", next: { type: "tree", id: "electrical_emergency" } },
                    { text: { en: "NO - Safe", pl: "NIE - Bezpiecznie" }, type: "standard", next: { type: "node", id: "main_symptom" } }
                ]
            },
            "main_symptom": {
                question: { en: "What is affected?", pl: "Co najlepiej opisuje problem?" },
                answers: [
                    { text: { en: "Everything is dead", pl: "Wszystko nie działa (Ciemność)" }, type: "standard", next: { type: "node", id: "everything_dead_check" } },
                    { text: { en: "One system is dead", pl: "Jeden system nie działa" }, type: "standard", next: { type: "node", id: "one_system_dead_check" } },
                    { text: { en: "Intermittent / flickering", pl: "Przerywa / mruga / wariuje" }, type: "standard", next: { type: "node", id: "intermittent_check" } },
                    { text: { en: "Batteries won't charge", pl: "Akumulatory nie ładują się" }, type: "standard", next: { type: "node", id: "charging_check" } },
                    { text: { en: "Battery drains fast", pl: "Szybkie rozładowanie (Drain)" }, type: "standard", next: { type: "node", id: "battery_drain_check" } },
                    { text: { en: "Instruments act crazy", pl: "Wariujące wskaźniki" }, type: "standard", next: { type: "solution", id: "instrument_ground_issue" } },
                    { text: { en: "Bilge pump failure", pl: "Pompa zęzowa nie działa" }, type: "standard", next: { type: "node", id: "bilge_pump_check" } },
                    { text: { en: "Nav lights failure", pl: "Światła nawigacyjne nie działają" }, type: "standard", next: { type: "node", id: "nav_lights_check" } },
                    { text: { en: "Lightning / Saltwater", pl: "Uderzenie pioruna / Zalanie wodą" }, type: "standard", next: { type: "node", id: "catastrophe_check" } },
                    { text: { en: "Instruments Dead", pl: "Elektronika / Plotter nie działa" }, type: "standard", next: { type: "node", id: "electronics_dead_check" } }
                ]
            },
            "everything_dead_check": {
                question: { en: "Check battery selector position.", pl: "Sprawdź pozycję przełącznika akumulatorów (Battery Selector)." },
                answers: [
                    { text: { en: "OFF", pl: "Wyłączony (OFF)" }, type: "standard", next: { type: "solution", id: "operator_error_battery" } },
                    { text: { en: "ON - but dead", pl: "Włączony (ON) - ale nic nie działa" }, type: "standard", next: { type: "node", id: "physical_damage_check" } }
                ]
            },
            "physical_damage_check": {
                question: { en: "Check for physical damage at switch/battery.", pl: "Sprawdź uszkodzenia fizyczne przy przełączniku/akumulatorze." },
                answers: [
                    { text: { en: "Broken wire / Burnt fuse", pl: "Urwany kabel / Spalony bezpiecznik" }, type: "standard", next: { type: "solution", id: "main_fuse_switch" } },
                    { text: { en: "Looks OK", pl: "Wygląda OK" }, type: "standard", next: { type: "node", id: "battery_connections_check" } }
                ]
            },
            "battery_connections_check": {
                question: { en: "Wiggle battery terminals. Loose/corroded?", pl: "Poruszaj klemami akumulatora. Są luźne lub skorodowane?" },
                answers: [
                    { text: { en: "YES - Loose/Dirty", pl: "TAK - Luźne/Brudne" }, type: "standard", next: { type: "solution", id: "loose_connection" } },
                    { text: { en: "NO - Tight/Clean", pl: "NIE - Sztywne i czyste" }, type: "standard", next: { type: "node", id: "emergency_bypass_check" } }
                ]
            },
            "emergency_bypass_check": {
                question: { en: "Do you have jumper cables?", pl: "Czy masz kable rozruchowe (Jumper Cables)?" },
                answers: [
                    { text: { en: "YES - Try bypass", pl: "TAK - Spróbuj obejścia (Bypass)" }, type: "standard", next: { type: "solution", id: "emergency_bypass_wire" } },
                    { text: { en: "NO", pl: "NIE - Tylko miernik/nic" }, type: "standard", next: { type: "node", id: "voltage_at_battery" } }
                ]
            },
            "voltage_at_battery": {
                question: { en: "Is there voltage at battery terminals?", pl: "Czy jest napięcie bezpośrednio na klemach akumulatora?" },
                answers: [
                    { text: { en: "NO (<10V)", pl: "NIE (<10V) - Trup" }, type: "standard", next: { type: "solution", id: "battery_dead" } },
                    { text: { en: "Weak (10-12V)", pl: "Słabe (10-12V)" }, type: "standard", next: { type: "solution", id: "battery_low_critical" } },
                    { text: { en: "YES (>12V)", pl: "TAK (>12V) - Jest napięcie" }, type: "standard", next: { type: "node", id: "voltage_at_main_bus" } },
                    { text: { en: "No multimeter / Don't know", pl: "Brak miernika / Nie wiem" }, type: "cant_check", next: { type: "solution", id: "voltage_at_battery_guide" } }
                ]
            },
            "voltage_at_main_bus": {
                question: { en: "Is there voltage at main bus?", pl: "Czy jest napięcie na głównej szynie / tablicy (Main Bus)?" },
                answers: [
                    { text: { en: "NO - Lost on the way", pl: "NIE - Znika po drodze" }, type: "standard", next: { type: "solution", id: "main_fuse_switch" } },
                    { text: { en: "YES", pl: "TAK - Jest na szynie" }, type: "standard", next: { type: "node", id: "negative_bus_check" } }
                ]
            },
            "negative_bus_check": {
                question: { en: "Is negative bus intact?", pl: "Czy szyna minusowa (Negative Bus) i jej połączenie są całe?" },
                answers: [
                    { text: { en: "NO", pl: "NIE - Luźna / skorodowana" }, type: "standard", next: { type: "solution", id: "main_ground_failure" } },
                    { text: { en: "YES", pl: "TAK - Wygląda OK" }, type: "standard", next: { type: "solution", id: "unknown_major_failure" } }
                ]
            },
            "one_system_dead_check": {
                question: { en: "One side of boat or specific device?", pl: "Czy problem dotyczy jednej strony jachtu czy konkretnego urządzenia?" },
                answers: [
                    { text: { en: "Whole side / section", pl: "Cała strona / sekcja" }, type: "standard", next: { type: "solution", id: "panel_feeder_fail" } },
                    { text: { en: "Specific device", pl: "Konkretne urządzenie" }, type: "standard", next: { type: "node", id: "fuse_swap_check" } }
                ]
            },
            "fuse_swap_check": {
                question: { en: "Swap fuse with working circuit. Works now?", pl: "Zamień bezpiecznik z działającym obwodem. Czy ruszyło?" },
                answers: [
                    { text: { en: "YES - Was the fuse", pl: "TAK - To był bezpiecznik" }, type: "standard", next: { type: "solution", id: "fuse_replaced_ok" } },
                    { text: { en: "NO - Still dead", pl: "NIE - Dalej martwe" }, type: "standard", next: { type: "node", id: "visual_wiring_check" } }
                ]
            },
            "visual_wiring_check": {
                question: { en: "Check wires at panel/device. Damage visible?", pl: "Spójrz na kable przy panelu i urządzeniu. Widzisz uszkodzenia?" },
                answers: [
                    { text: { en: "YES", pl: "TAK - Luźne/Korozja" }, type: "standard", next: { type: "solution", id: "wire_repair_basic" } },
                    { text: { en: "NO", pl: "NIE - Wygląda OK" }, type: "standard", next: { type: "node", id: "voltage_at_device" } }
                ]
            },
            "voltage_at_device": {
                question: { en: "Voltage at device?", pl: "Czy napięcie dochodzi do samego urządzenia?" },
                answers: [
                    { text: { en: "NO - Broken wire", pl: "NIE - Przerwa w kablu" }, type: "standard", next: { type: "solution", id: "broken_feed" } },
                    { text: { en: "YES", pl: "TAK - Jest napięcie" }, type: "standard", next: { type: "solution", id: "device_failure" } },
                    { text: { en: "No multimeter (Skip)", pl: "Brak miernika (Pomiń)" }, type: "cant_check", next: { type: "solution", id: "unknown_voltage_device" } }
                ]
            },
            "intermittent_check": {
                question: { en: "When does it fail?", pl: "Kiedy problem występuje?" },
                answers: [
                    { text: { en: "Vibration / Waves", pl: "Wibracje / Fale" }, type: "standard", next: { type: "solution", id: "loose_connection" } },
                    { text: { en: "Rain / Damp", pl: "Po deszczu / Wilgoć" }, type: "standard", next: { type: "solution", id: "moisture_corrosion" } },
                    { text: { en: "When hot", pl: "Gdy jest gorąco" }, type: "standard", next: { type: "solution", id: "thermal_expansion_fail" } }
                ]
            },
            "charging_check": {
                question: { en: "Charging source?", pl: "Jakie jest źródło ładowania?" },
                answers: [
                    { text: { en: "Alternator", pl: "Alternator silnika" }, type: "standard", next: { type: "node", id: "alternator_visual_check" } },
                    { text: { en: "Shore Power", pl: "Zasilanie lądowe (Shore Power)" }, type: "standard", next: { type: "node", id: "shore_ac_present" } },
                    { text: { en: "Solar / Wind", pl: "Solar / Wiatr" }, type: "standard", next: { type: "node", id: "solar_status_lights" } }
                ]
            },
            "alternator_visual_check": {
                question: { en: "Check alternator belt and wires.", pl: "Sprawdź pasek i kable przy alternatorze." },
                answers: [
                    { text: { en: "Belt loose/broken", pl: "Pasek luźny/zerwany" }, type: "standard", next: { type: "solution", id: "mechanical_failure_belt" } },
                    { text: { en: "Wires broken", pl: "Kable urwane" }, type: "standard", next: { type: "solution", id: "alternator_wire_fix" } },
                    { text: { en: "Looks OK", pl: "Wygląda OK" }, type: "standard", next: { type: "node", id: "alternator_voltage_rpm" } }
                ]
            },
            "alternator_voltage_rpm": {
                question: { en: "Rev to 1500 RPM. Do lights get brighter?", pl: "Zwiększ obroty do 1500 RPM. Czy światła jaśnieją?" },
                answers: [
                    { text: { en: "YES - Brighter (Charging)", pl: "TAK - Jaśnieją (Ładuje)" }, type: "standard", next: { type: "solution", id: "charging_ok" } },
                    { text: { en: "NO - No change", pl: "NIE - Bez zmian" }, type: "standard", next: { type: "node", id: "alternator_field_test" } }
                ]
            },
            "alternator_field_test": {
                question: { en: "EMERGENCY: Excite field (touch + to 'F' terminal momentarily).", pl: "AWARYJNIE: Wzbudź alternator kablem (złącz + i styk 'F' na sekundę)." },
                answers: [
                    { text: { en: "Started! (Load heard)", pl: "Ruszył! (Słychać obciążenie)" }, type: "standard", next: { type: "solution", id: "regulator_failure_bypass" } },
                    { text: { en: "Still nothing", pl: "Dalej nic" }, type: "standard", next: { type: "solution", id: "alternator_internal_fail" } }
                ]
            },
            "battery_drain_check": {
                question: { en: "How fast do they drain?", pl: "Jak szybko spadają baterie?" },
                answers: [
                    { text: { en: "Instantly with load", pl: "Natychmiast po włączeniu świateł" }, type: "standard", next: { type: "solution", id: "battery_end_of_life" } },
                    { text: { en: "Overnight (everything OFF)", pl: "Po nocy (gdy wszystko wyłączone)" }, type: "standard", next: { type: "node", id: "parasitic_draw_test" } }
                ]
            },
            "parasitic_draw_test": {
                question: { en: "Turn ALL OFF. Hear relays or feel warm wires?", pl: "Wyłącz WSZYSTKO. Czy słyszysz przekaźniki lub czujesz ciepłe kable?" },
                answers: [
                    { text: { en: "YES - Clicking/Heat", pl: "TAK - Coś 'cyka'/grzeje" }, type: "standard", next: { type: "solution", id: "parasitic_draw_found" } },
                    { text: { en: "NO - Silence/Cold", pl: "NIE - Cisza i chłód" }, type: "standard", next: { type: "solution", id: "battery_self_discharge" } }
                ]
            },
            "bilge_pump_check": {
                question: { en: "Use manual switch. Does pump hum/vibrate?", pl: "Użyj włącznika manualnego na panelu. Czy pompa buczy/wibruje?" },
                answers: [
                    { text: { en: "YES - Hums no pump", pl: "TAK - Buczy ale nie pompuje" }, type: "standard", next: { type: "solution", id: "bilge_impeller_clog" } },
                    { text: { en: "NO - Silence", pl: "NIE - Cisza" }, type: "standard", next: { type: "node", id: "bilge_direct_power" } }
                ]
            },
            "bilge_direct_power": {
                question: { en: "Connect pump directly to battery (bypass switch/float).", pl: "Podłącz pompę bezpośrednio do akumulatora (omiń włącznik/pływak)." },
                answers: [
                    { text: { en: "Runs!", pl: "Ruszyła!" }, type: "standard", next: { type: "solution", id: "bilge_switch_fail" } },
                    { text: { en: "Still dead", pl: "Dalej martwa" }, type: "standard", next: { type: "solution", id: "bilge_motor_burnout" } }
                ]
            },
            "nav_lights_check": {
                question: { en: "Which lights are out?", pl: "Które światła nie działają?" },
                answers: [
                    { text: { en: "All (Bow + Stern)", pl: "Wszystkie (Dziób + Rufa)" }, type: "standard", next: { type: "solution", id: "nav_light_fuse_switch" } },
                    { text: { en: "Only one", pl: "Tylko jedno" }, type: "standard", next: { type: "node", id: "nav_bulb_swap" } }
                ]
            },
            "nav_bulb_swap": {
                question: { en: "Swap with good bulb. Works?", pl: "Zamień żarówkę na dobrą (np. z kabiny). Działa?" },
                answers: [
                    { text: { en: "YES - Burnt bulb", pl: "TAK - Spalona żarówka" }, type: "standard", next: { type: "solution", id: "bulb_replacement" } },
                    { text: { en: "NO - Socket/Wire", pl: "NIE - Gniazdo/Kabel" }, type: "standard", next: { type: "solution", id: "corroded_socket_nav" } }
                ]
            },
            "windlass_check": {
                question: { en: "What is the windlass symptom?", pl: "Jaki jest objaw windy kotwicznej?" },
                answers: [
                    { text: { en: "Silence - No reaction", pl: "Cisza - Brak reakcji" }, type: "standard", next: { type: "node", id: "windlass_silent_check" } },
                    { text: { en: "Motor runs but won't pull", pl: "Silnik kręci, ale nie ciągnie" }, type: "standard", next: { type: "node", id: "windlass_clutch_check" } },
                    { text: { en: "Runs very slow", pl: "Działa bardzo wolno" }, type: "standard", next: { type: "solution", id: "windlass_low_voltage" } }
                ]
            },
            "windlass_silent_check": {
                question: { en: "Is the main yacht engine running?", pl: "Czy silnik główny jachtu jest włączony?" },
                answers: [
                    { text: { en: "NO - Engine OFF", pl: "NIE - Zgaszony" }, type: "standard", next: { type: "solution", id: "windlass_needs_engine" } },
                    { text: { en: "YES - Running", pl: "TAK - Pracuje" }, type: "standard", next: { type: "node", id: "windlass_breaker_check" } }
                ]
            },
            "windlass_breaker_check": {
                question: { en: "Check windlass breaker (big lever). Tripped?", pl: "Sprawdź bezpiecznik windy (często osobny, duży 'hebel'). Wybił?" },
                answers: [
                    { text: { en: "YES - Tripped", pl: "TAK - Wyskoczył" }, type: "standard", next: { type: "solution", id: "windlass_breaker_reset" } },
                    { text: { en: "NO - ON", pl: "NIE - Jest włączony" }, type: "standard", next: { type: "solution", id: "windlass_remote_battery" } }
                ]
            },
            "windlass_clutch_check": {
                question: { en: "Tighten clutch (star socket on top). Helps?", pl: "Spróbuj dokręcić sprzęgło (gwiazda na górze windy). Pomogło?" },
                answers: [
                    { text: { en: "YES - Pulls now", pl: "TAK - Teraz ciągnie" }, type: "standard", next: { type: "solution", id: "windlass_clutch_tightened" } },
                    { text: { en: "NO - Still slips", pl: "NIE - Dalej się ślizga" }, type: "standard", next: { type: "solution", id: "windlass_stripped_gypsy" } }
                ]
            },
            "winch_check": {
                question: { en: "What is happening with the winch?", pl: "Co się dzieje z kabestanem?" },
                answers: [
                    { text: { en: "Silence - No reaction", pl: "Cisza - Brak reakcji" }, type: "standard", next: { type: "node", id: "winch_no_sound" } },
                    { text: { en: "Motor runs, drum stops", pl: "Silnik buczy/kręci, bęben stoi" }, type: "standard", next: { type: "node", id: "winch_motor_runs_no_turn" } },
                    { text: { en: "One direction only", pl: "Działa tylko w jedną stronę" }, type: "standard", next: { type: "node", id: "winch_one_direction" } },
                    { text: { en: "Weak / Slow", pl: "Słaby / Wolny" }, type: "standard", next: { type: "node", id: "winch_low_power" } },
                    { text: { en: "Rapid clicking", pl: "Szybkie cykanie (Rapid clicking)" }, type: "standard", next: { type: "node", id: "winch_rapid_clicking" } },
                    { text: { en: "Remote/Switch fail", pl: "Pilot/Przycisk nie działa" }, type: "standard", next: { type: "node", id: "winch_remote_fail" } }
                ]
            }
        },
        solutions: {
            "voltage_at_battery_guide": {
                title: { en: "Voltage Check Guide", pl: "Poradnik Sprawdzania Napięcia" },
                description: { en: "How to check voltage without a multimeter.", pl: "Jak sprawdzić napięcie bez miernika." },
                steps: [
                    { en: "Turn on cabin lights.", pl: "Włącz oświetlenie kabiny." },
                    { en: "Try running another heavy load (water pump).", pl: "Spróbuj włączyć inny duży odbiornik (np. pompę wody)." },
                    { en: "If lights dim heavily = Weak battery or loose terminals.", pl: "Jeśli światło przygaśnie mocno = Słaba bateria lub luźne klemy." },
                    { en: "If lights stay bright = Equipment failure.", pl: "Jeśli światło nie przygaśnie, a sprzęt nie działa = Awaria sprzętu (lub bezpiecznika)." }
                ]
            }
        }
    },
    "electrical_emergency": {
        tree_id: "electrical_emergency",
        start_node: "safety_check_immediate",
        metadata: {
            title: { en: "EMERGENCY: Smoke/Sparks (Electrical)", pl: "AWARIA: Dym/Iskry (Elektryka)" },
            version: "1.0",
            engine_type: "electrical"
        },
        nodes: {
            "safety_check_immediate": {
                question: { 
                    en: "CRITICAL: Is there an open flame, heavy smoke, or intense heat?", 
                    pl: "KRYTYCZNE: Czy widzisz otwarty ogień, gęsty dym lub czujesz silne gorąco?" 
                },
                answers: [
                    { text: { en: "YES - FIRE VISIBLE!", pl: "TAK - WIDZĘ OGIEŃ!" }, type: "standard", next: { type: "solution", id: "fire_fighting_protocol" } },
                    { text: { en: "Smell of burning / Sparks only", pl: "Tylko zapach spalenizny / Iskry" }, type: "standard", next: { type: "node", id: "power_isolation_check" } },
                    { text: { en: "Smoke stopped / False alarm", pl: "Dymienie ustało / Fałszywy alarm" }, type: "standard", next: { type: "node", id: "damage_assessment" } }
                ]
            },
            "power_isolation_check": {
                question: { 
                    en: "HAVE YOU TURNED OFF THE MAIN BATTERY SWITCH (ISOLATOR)?", 
                    pl: "CZY WYŁĄCZYŁEŚ GŁÓWNY WYŁĄCZNIK PRĄDU (HEBEL)?" 
                },
                answers: [
                    { text: { en: "YES, Power is OFF", pl: "TAK, Prąd wyłączony" }, type: "standard", next: { type: "node", id: "smoke_source_check" } },
                    { text: { en: "NO, doing it now!", pl: "NIE, robię to teraz!" }, type: "standard", next: { type: "node", id: "confirm_power_off" } },
                    { text: { en: "I can't reach it / Stuck", pl: "Nie mam dostępu / Zaciął się" }, type: "cant_check", next: { type: "solution", id: "alternative_isolation" } }
                ]
            },
            "confirm_power_off": {
                question: { 
                    en: "Did you successfully turn off the main switch?", 
                    pl: "Czy udało się wyłączyć główny wyłącznik?" 
                },
                answers: [
                    { text: { en: "Yes, it's OFF now", pl: "Tak, teraz jest WYŁĄCZONY" }, type: "standard", next: { type: "node", id: "smoke_source_check" } },
                    { text: { en: "No", pl: "Nie" }, type: "standard", next: { type: "solution", id: "alternative_isolation" } }
                ]
            },
            "smoke_source_check": {
                question: { 
                    en: "Where is the smoke or smell coming from?", 
                    pl: "Skąd dochodzi dym lub zapach?" 
                },
                answers: [
                    { text: { en: "Engine (Alternator/Starter)", pl: "Silnik (Alternator/Rozrusznik)" }, type: "standard", next: { type: "solution", id: "alternator_starter_short" } },
                    { text: { en: "Electrical Panel / Dashboard", pl: "Tablica rozdzielcza / Zegary" }, type: "standard", next: { type: "solution", id: "panel_short" } },
                    { text: { en: "Battery Compartment", pl: "Komora akumulatorów" }, type: "standard", next: { type: "solution", id: "battery_thermal_runaway" } },
                    { text: { en: "Unknown / General smell", pl: "Nieznane / Ogólny zapach" }, type: "cant_check", next: { type: "solution", id: "general_isolation_search" } }
                ]
            },
            "damage_assessment": {
                question: { 
                    en: "Inspect the suspected area. Is equipment hot, melted, or black?", 
                    pl: "Sprawdź podejrzany obszar. Czy urządzenia są gorące, stopione lub czarne?" 
                },
                answers: [
                    { text: { en: "Yes, visible damage", pl: "Tak, widać uszkodzenia" }, type: "standard", next: { type: "solution", id: "do_not_energize" } },
                    { text: { en: "No visible damage", pl: "Brak widocznych uszkodzeń" }, type: "standard", next: { type: "solution", id: "cautious_investigation" } }
                ]
            }
        },
        solutions: {
            "fire_fighting_protocol": {
                title: { en: "FIRE PROTOCOL", pl: "PROTOKÓŁ POŻAROWY" },
                description: { en: "IMMEDIATE ACTION REQUIRED. PRESERVE LIFE.", pl: "WYMAGANA NATYCHMIASTOWA REAKCJA. RATUJ ŻYCIE." },
                steps: [
                    { en: "SHUT OFF MAIN BATTERY SWITCHES if safe to do so.", pl: "WYŁĄCZ GŁÓWNE HEBLE AKUMULATORÓW jeśli to bezpieczne." },
                    { en: "Discharge fire extinguisher at the BASE of the flames.", pl: "Użyj gaśnicy celując w PODSTAWĘ płomieni." },
                    { en: "Shut off fuel supply valve if engine related.", pl: "Zamknij dopływ paliwa jeśli pożar jest przy silniku." },
                    { en: "Prepare life jackets and life raft.", pl: "Przygotuj kamizelki i tratwę ratunkową." }
                ]
            },
            "alternative_isolation": {
                title: { en: "Emergency Cable Disconnect", pl: "Awaryjne Rozłączenie Kabli" },
                description: { en: "If the switch fails, you must physically disconnect the power source.", pl: "Jeśli wyłącznik zawiódł, musisz fizycznie odłączyć źródło prądu." },
                steps: [
                    { en: "Use a wrench/tool to disconnect the NEGATIVE (Black) cable from the battery terminal.", pl: "Użyj klucza, by odłączyć kabel UJEMNY (Czarny) od klemy akumulatora." },
                    { en: "Ensure the cable cannot touch the terminal again.", pl: "Upewnij się, że kabel nie dotknie ponownie bieguna." },
                    { en: "Be careful of sparks - ventilate area if possible.", pl: "Uważaj na iskry - przewietrz pomieszczenie jeśli to możliwe." }
                ]
            },
            "alternator_starter_short": {
                title: { en: "High Current Short (Starter/Alternator)", pl: "Zwarcie Wysokoprądowe (Rozrusznik/Alternator)" },
                description: { en: "Thick red cables here are often unfused and can cause fire quickly.", pl: "Grube czerwone kable w tym miejscu często nie mają bezpieczników i mogą szybko wywołać pożar." },
                steps: [
                    { en: "Keep battery switch OFF.", pl: "Trzymaj główny wyłącznik w pozycji OFF." },
                    { en: "Disconnect the Positive cable at the battery to be 100% safe.", pl: "Odłącz kabel Plusowy przy akumulatorze dla 100% pewności." },
                    { en: "Inspect cables for chafing against the engine block.", pl: "Sprawdź czy kable nie przetarły się o blok silnika." }
                ]
            },
            "panel_short": {
                title: { en: "Panel/Dashboard Short", pl: "Zwarcie w Panelu/Zegarach" },
                description: { en: "Likely a fused circuit, but smoke indicates wire insulation melting.", pl: "Prawdopodobnie obwód zabezpieczony, ale dym oznacza topienie izolacji." },
                steps: [
                    { en: "Identify the hot/melted fuse or breaker.", pl: "Zidentyfikuj gorący/stopiony bezpiecznik." },
                    { en: "Leave that specific breaker OFF.", pl: "Pozostaw ten konkretny bezpiecznik WYŁĄCZONY." },
                    { en: "You may turn the Main Switch ON if crucial systems are needed (Radio/GPS), but monitor closely.", pl: "Możesz włączyć Główny Wyłącznik jeśli potrzebujesz kluczowych systemów (Radio/GPS), ale obserwuj uważnie." }
                ]
            },
            "battery_thermal_runaway": {
                title: { en: "Battery Thermal Runaway", pl: "Zagotowanie Akumulatora" },
                description: { en: "Batteries are overheating and emitting toxic/explosive gas.", pl: "Akumulatory się przegrzewają i wydzielają toksyczny/wybuchowy gaz." },
                steps: [
                    { en: "EVACUATE the area. Do not breathe fumes.", pl: "EWAKUUJ strefę. Nie wdychaj oparów." },
                    { en: "Disconnect Shore Power and Solar immediately.", pl: "Odłącz zasilanie lądowe i solary natychmiast." },
                    { en: "Allow to cool for at least 1 hour before touching.", pl: "Pozostaw do ostygnięcia na min. 1 godzinę przed dotykaniem." }
                ]
            },
            "do_not_energize": {
                title: { en: "DO NOT ENERGIZE", pl: "NIE WŁĄCZAJ ZASILANIA" },
                description: { en: "The circuit is physically damaged and unsafe.", pl: "Obwód jest fizycznie uszkodzony i niebezpieczny." },
                steps: [
                    { en: "Tape over the switch/breaker.", pl: "Zaklej wyłącznik taśmą." },
                    { en: "Label: 'DANGER - DO NOT USE'.", pl: "Oznacz: 'NIEBEZPIECZEŃSTWO - NIE UŻYWAĆ'." },
                    { en: "Requires professional repair.", pl: "Wymaga profesjonalnej naprawy." }
                ]
            },
            "general_isolation_search": {
                title: { en: "Isolation Search", pl: "Szukanie Metodą Eliminacji" },
                description: { en: "Source unknown. Re-energize cautiously.", pl: "Źródło nieznane. Włączaj ostrożnie." },
                steps: [
                    { en: "Turn all breakers on the panel OFF.", pl: "Wyłącz wszystkie bezpieczniki na panelu." },
                    { en: "Turn Main Battery Switch ON. Check for smoke.", pl: "Włącz Główny Wyłącznik. Spatrz czy dymi." },
                    { en: "Turn on one essential circuit at a time (VHF, GPS).", pl: "Włączaj po jednym niezbędnym obwodzie (VHF, GPS)." },
                    { en: "If smoke returns, kill power immediately.", pl: "Jeśli dym wróci, natychmiast odetnij prąd." }
                ]
            },
            "cautious_investigation": {
                title: { en: "Cautious Investigation", pl: "Ostrożna Weryfikacja" },
                description: { en: "No damage found, but something happened.", pl: "Nie znaleziono uszkodzeń, ale coś się stało." },
                steps: [
                    { en: "Feel wires for heat (carefully).", pl: "Sprawdź ręką temperaturę kabli (ostrożnie)." },
                    { en: "Look for loose connections causing sparks.", pl: "Szukaj luźnych połączeń powodujących iskrzenie." },
                    { en: "Monitor constantly for the next hour.", pl: "Monitoruj ciągle przez następną godzinę." }
                ]
            }
        }
    },
    "marine_diesel_core": {
        tree_id: "marine_diesel_core",
        start_node: "engine_start_check",
        metadata: {
            title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
            version: "1.0",
            engine_type: "diesel"
        },
        nodes: {
            "engine_start_check": {
                question: { en: "Does the engine start?", pl: "Czy silnik odpala?" },
                answers: [
                    { text: { en: "Yes", pl: "Tak" }, type: "standard", next: { type: "solution", id: "engine_ok" } },
                    { text: { en: "No", pl: "Nie" }, type: "standard", next: { type: "node", id: "battery_check" } },
                    { text: { en: "I can't check", pl: "Nie mogę sprawdzić" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "battery_check": {
                question: { en: "Is the battery voltage above 12V?", pl: "Czy napięcie akumulatora jest powyżej 12V?" },
                answers: [
                    { text: { en: "Yes", pl: "Tak" }, type: "standard", next: { type: "solution", id: "starter_fail" } },
                    { text: { en: "No", pl: "Nie" }, type: "standard", next: { type: "solution", id: "battery_dead" } },
                    { text: { en: "No multimeter", pl: "Brak miernika" }, type: "cant_check", next: { type: "solution", id: "battery_dead" } }
                ]
            }
        },
        solutions: {
            "engine_ok": {
                title: { en: "Engine OK", pl: "Silnik Sprawny" },
                description: { en: "No issues detected.", pl: "Brak wykrytych problemów." },
                steps: [{ en: "Safe to sail.", pl: "Można płynąć." }]
            },
            "battery_dead": {
                title: { en: "Battery Dead", pl: "Akumulator Rozładowany" },
                description: { en: "Voltage is too low.", pl: "Zbyt niskie napięcie." },
                steps: [{ en: "Charge battery.", pl: "Naładuj akumulator." }]
            },
            "starter_fail": {
                title: { en: "Starter Failure", pl: "Awaria Rozrusznika" },
                description: { en: "Starter motor not engaging.", pl: "Rozrusznik nie reaguje." },
                steps: [{ en: "Check starter wiring.", pl: "Sprawdź kable rozrusznika." }]
            },
            "expert_required": {
                title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
            }
        }
    },
    "white_smoke_diagnostic": {
        tree_id: "white_smoke_diagnostic",
        start_node: "smoke_persistence",
        metadata: {
            title: { en: "White Smoke Diagnostic", pl: "Diagnostyka Białego Dymu" },
            version: "1.1",
            engine_type: "diesel"
        },
        nodes: {
            "smoke_persistence": {
                question: { 
                    en: "Does the white smoke persist after the engine has reached operating temperature (warmed up)?", 
                    pl: "Czy biały dym utrzymuje się po rozgrzaniu silnika do temperatury roboczej?" 
                },
                answers: [
                    { text: { en: "Yes, it continues to smoke", pl: "Tak, dymi nadal" }, type: "standard", next: { type: "node", id: "smell_check" } },
                    { text: { en: "No, it disappears when warm", pl: "Nie, znika po rozgrzaniu" }, type: "standard", next: { type: "solution", id: "cold_combustion" } },
                    { text: { en: "I can't check", pl: "Nie mogę sprawdzić" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "smell_check": {
                question: { 
                    en: "What does the smoke smell like?", 
                    pl: "Jaki zapach ma ten dym?" 
                },
                answers: [
                    { text: { en: "Strong smell of raw diesel", pl: "Silny zapach surowej ropy" }, type: "standard", next: { type: "node", id: "engine_behavior" } },
                    { text: { en: "Sweet smell or odorless (steam)", pl: "Słodkawy zapach lub bezwonny (para)" }, type: "standard", next: { type: "node", id: "coolant_level_check" } },
                    { text: { en: "I don't know", pl: "Nie wiem" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "coolant_level_check": {
                question: { 
                    en: "Is the coolant level dropping, or are there bubbles in the header tank?", 
                    pl: "Czy ubywa płynu chłodniczego lub w zbiorniku wyrównawczym widać bąbelki powietrza?" 
                },
                answers: [
                    { text: { en: "Yes, level is low / bubbles visible", pl: "Tak, ubywa płynu / są bąbelki" }, type: "standard", next: { type: "solution", id: "coolant_ingress" } },
                    { text: { en: "No, level is stable", pl: "Nie, poziom jest stabilny" }, type: "standard", next: { type: "node", id: "engine_behavior" } },
                    { text: { en: "I can't check", pl: "Nie mogę sprawdzić" }, type: "cant_check", next: { type: "solution", id: "coolant_ingress_suspected" } }
                ]
            },
            "engine_behavior": {
                question: { 
                    en: "How is the engine running at idle?", 
                    pl: "Jak silnik pracuje na wolnych obrotach?" 
                },
                answers: [
                    { text: { en: "Roughly, shaking, or missing", pl: "Nierówno, trzęsie się, przerywa" }, type: "standard", next: { type: "node", id: "compression_check_intro" } },
                    { text: { en: "Smoothly, but still smoking", pl: "Równo, ale nadal dymi" }, type: "standard", next: { type: "solution", id: "unburned_fuel_timing" } },
                    { text: { en: "I don't know", pl: "Nie wiem" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "compression_check_intro": {
                question: { 
                    en: "Is there a rhythmic 'hissing' or 'puffing' sound from the air intake or crankcase?", 
                    pl: "Czy słychać rytmiczne syczenie lub 'pufanie' z dolotu powietrza lub odmy?" 
                },
                answers: [
                    { text: { en: "Yes, rhythmic puffing", pl: "Tak, rytmiczne pufanie" }, type: "standard", next: { type: "solution", id: "low_compression" } },
                    { text: { en: "No such sound", pl: "Brak takich dźwięków" }, type: "standard", next: { type: "solution", id: "injector_failure" } },
                    { text: { en: "I can't tell", pl: "Nie potrafię stwierdzić" }, type: "cant_check", next: { type: "solution", id: "compression_test_required" } }
                ]
            }
        },
        solutions: {
            "cold_combustion": {
                title: { en: "Cold Combustion / Glow Plug Issue", pl: "Zimne Spalanie / Problemy ze Świecami" },
                description: { 
                    en: "White smoke during a cold start that clears up is often just unburned fuel due to low cylinder temperature.", 
                    pl: "Biały dym przy zimnym starcie, który znika, to często po prostu niespalone paliwo wynikające z niskiej temperatury w cylindrach." 
                },
                steps: [
                    { en: "Check glow plug operation.", pl: "Sprawdź działanie świec żarowych." },
                    { en: "Allow more time for pre-heating.", pl: "Daj więcej czasu na grzanie świec." },
                    { en: "If it takes a long time to clear, check compression.", pl: "Jeśli dymienie trwa długo, sprawdź kompresję." }
                ]
            },
            "coolant_ingress": {
                title: { en: "Coolant Ingress (Internal Leak)", pl: "Przedostawanie się Płynu (Przeciek)" },
                description: { 
                    en: "White 'smoke' that is actually steam. Usually caused by coolant entering the combustion chamber.", 
                    pl: "Biały 'dym', który jest w rzeczywistości parą wodną. Zazwyczaj spowodowany dostawaniem się płynu do komory spalania." 
                },
                steps: [
                    { en: "STOP ENGINE IMMEDIATELY if overheating.", pl: "NATYCHMIAST ZATRZYMAJ SILNIK jeśli się przegrzewa." },
                    { en: "Check for head gasket failure.", pl: "Sprawdź uszczelkę pod głowicą." },
                    { en: "Inspect cylinder head for cracks.", pl: "Sprawdź głowicę pod kątem pęknięć." },
                    { en: "Check exhaust manifold/mixing elbow for internal leaks.", pl: "Sprawdź kolektor wydechowy/kolanko pod kątem przecieków." }
                ]
            },
            "coolant_ingress_suspected": {
                title: { en: "Suspected Coolant Ingress", pl: "Podejrzenie Przecieku Płynu" },
                description: { 
                    en: "Symptoms suggest steam from coolant, but cannot be confirmed without checking levels.", 
                    pl: "Objawy sugerują parę z płynu chłodniczego, ale nie można tego potwierdzić bez sprawdzenia poziomów." 
                },
                steps: [
                    { en: "Wait for engine to cool before opening header tank.", pl: "Poczekaj aż silnik ostygnie przed otwarciem zbiornika." },
                    { en: "Check coolant level and look for oil in coolant.", pl: "Sprawdź poziom płynu i czy nie ma w nim oleju." }
                ]
            },
            "low_compression": {
                title: { en: "Low Compression", pl: "Niska Kompresja" },
                description: { 
                    en: "Incomplete combustion because the air is not getting hot enough to ignite the fuel properly.", 
                    pl: "Niepełne spalanie, ponieważ powietrze nie nagrzewa się wystarczająco, by poprawnie zapalić paliwo." 
                },
                steps: [
                    { en: "Perform a compression test on all cylinders.", pl: "Przeprowadź test kompresji na wszystkich cylindrach." },
                    { en: "Check valve clearances.", pl: "Sprawdź luzy zaworowe." },
                    { en: "Inspect for worn piston rings or cylinder liners.", pl: "Sprawdź pierścienie tłokowe lub gładzie cylindrów." }
                ]
            },
            "unburned_fuel_timing": {
                title: { en: "Injection Timing / Fuel Quality", pl: "Kąt Wtrysku / Jakość Paliwa" },
                description: { 
                    en: "Fuel is being injected but not at the right time or is of poor quality, leading to partial combustion.", 
                    pl: "Paliwo jest wtryskiwane, ale w złym momencie lub jest słabej jakości, co prowadzi do częściowego spalania." 
                },
                steps: [
                    { en: "Check fuel injection timing.", pl: "Sprawdź kąt wyprzedzenia wtrysku." },
                    { en: "Verify fuel quality (check for water in fuel).", pl: "Sprawdź jakość paliwa (czy nie ma w nim wody)." },
                    { en: "Inspect injection pump settings.", pl: "Sprawdź ustawienia pompy wtryskowej." }
                ]
            },
            "injector_failure": {
                title: { en: "Faulty Injector (Fuel Pissing)", pl: "Awaria Wtryskiwacza (Lejący Wtrysk)" },
                description: { 
                    en: "An injector may be 'streaming' or 'dripping' instead of atomizing the fuel.", 
                    pl: "Wtryskiwacz może 'lać' lub kapać zamiast poprawnie rozpylać paliwo." 
                },
                steps: [
                    { en: "Perform a 'crack test' (loosen fuel lines) to identify the faulty cylinder.", pl: "Przeprowadź test poluzowania przewodów wtryskowych, by znaleźć wadliwy cylinder." },
                    { en: "Remove and test injectors at a specialized shop.", pl: "Zdemontuj i oddaj wtryskiwacze do sprawdzenia w serwisie." }
                ]
            },
            "compression_test_required": {
                title: { en: "Compression Test Required", pl: "Wymagany Test Kompresji" },
                description: { 
                    en: "Cannot distinguish between injector and compression issues by sound alone.", 
                    pl: "Nie można odróżnić problemów z wtryskami od kompresji tylko po dźwięku." 
                },
                steps: [
                    { en: "Contact a mechanic for a professional compression test.", pl: "Skontaktuj się z mechanikiem w celu profesjonalnego pomiaru kompresji." }
                ]
            },
            "expert_required": {
                 title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                 description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                 steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
             }
         }
     },
     "raw_water_diagnostic": {
         tree_id: "raw_water_diagnostic",
         start_node: "seacock_check",
         metadata: {
             title: { en: "Raw Water Discharge Diagnostic", pl: "Diagnostyka Chłodzenia Zaburtowego" },
             version: "1.0",
             engine_type: "diesel"
         },
         nodes: {
             "seacock_check": {
                 question: { 
                     en: "Is the raw water intake seacock (valve) fully open?", 
                     pl: "Czy zawór denny (seacock) poboru wody zaburtowej jest w pełni otwarty?" 
                 },
                 answers: [
                     { text: { en: "Yes, it is open", pl: "Tak, jest otwarty" }, type: "standard", next: { type: "node", id: "strainer_visual_check" } },
                     { text: { en: "No, it was closed", pl: "Nie, był zamknięty" }, type: "standard", next: { type: "solution", id: "open_seacock" } },
                     { text: { en: "I can't find it", pl: "Nie mogę go znaleźć" }, type: "cant_check", next: { type: "solution", id: "locate_seacock" } }
                 ]
             },
             "strainer_visual_check": {
                 question: { 
                     en: "Look at the raw water strainer. Is it clogged with debris (seaweed, plastic) or is the water level unusually low?", 
                     pl: "Spójrz na filtr wody zaburtowej. Czy jest zapchany (trawa, plastik) lub czy poziom wody jest nienaturalnie niski?" 
                 },
                 answers: [
                     { text: { en: "Yes, it's clogged / low water", pl: "Tak, jest zapchany / mało wody" }, type: "standard", next: { type: "solution", id: "clean_strainer" } },
                     { text: { en: "No, it looks clear and full", pl: "Nie, wygląda na czysty i pełny" }, type: "standard", next: { type: "node", id: "pump_operation_check" } },
                     { text: { en: "I can't see inside", pl: "Nie widzę środka" }, type: "cant_check", next: { type: "node", id: "pump_operation_check" } }
                 ]
             },
             "pump_operation_check": {
                 question: { 
                     en: "Is the raw water pump turning? Check if the belt is intact and the pump pulley is spinning.", 
                     pl: "Czy pompa wody zaburtowej się kręci? Sprawdź czy pasek jest cały i czy koło pasowe pompy wiruje." 
                 },
                 answers: [
                     { text: { en: "Yes, it's spinning", pl: "Tak, kręci się" }, type: "standard", next: { type: "node", id: "impeller_inspection" } },
                     { text: { en: "No, the belt is broken/loose", pl: "Nie, pasek jest zerwany/luźny" }, type: "standard", next: { type: "solution", id: "fix_belt" } },
                     { text: { en: "I can't check the belt", pl: "Nie mogę sprawdzić paska" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                 ]
             },
             "impeller_inspection": {
                 question: { 
                     en: "If you remove the pump cover, is the rubber impeller intact with all its blades?", 
                     pl: "Jeśli zdejmiesz pokrywę pompy, czy gumowy wirnik (impeller) jest cały i ma wszystkie łopatki?" 
                 },
                 answers: [
                     { text: { en: "Yes, impeller is perfect", pl: "Tak, wirnik jest idealny" }, type: "standard", next: { type: "node", id: "exhaust_elbow_check" } },
                     { text: { en: "No, blades are missing/damaged", pl: "Nie, brakuje łopatek / jest zniszczony" }, type: "standard", next: { type: "solution", id: "replace_impeller" } },
                     { text: { en: "I can't open the pump", pl: "Nie mogę otworzyć pompy" }, type: "cant_check", next: { type: "solution", id: "impeller_fail_suspected" } }
                 ]
             },
             "exhaust_elbow_check": {
                 question: { 
                     en: "Is the mixing elbow or exhaust hose blocked? Check if the hose feels unusually hot or pressurized.", 
                     pl: "Czy kolanko wydechowe lub wąż są zatkane? Sprawdź czy wąż jest nienaturalnie gorący lub twardy od ciśnienia." 
                 },
                 answers: [
                     { text: { en: "Yes, it's very hot/blocked", pl: "Tak, jest bardzo gorący/zatkany" }, type: "standard", next: { type: "solution", id: "exhaust_blockage" } },
                     { text: { en: "No, feels normal", pl: "Nie, wydaje się w normie" }, type: "standard", next: { type: "solution", id: "expert_required" } },
                     { text: { en: "I don't know", pl: "Nie wiem" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                 ]
             }
         },
         solutions: {
             "open_seacock": {
                 title: { en: "Open Seacock", pl: "Otwórz Zawór Denny" },
                 description: { en: "The water supply was cut off at the source.", pl: "Dopływ wody był odcięty u źródła." },
                 steps: [
                     { en: "Locate the raw water intake seacock.", pl: "Znajdź zawór poboru wody zaburtowej." },
                     { en: "Turn the handle so it is parallel to the hose.", pl: "Ustaw rączkę równolegle do węża." },
                     { en: "Check for water flow at exhaust.", pl: "Sprawdź czy woda leci z wydechu." }
                 ]
             },
             "locate_seacock": {
                 title: { en: "Locate Intake Seacock", pl: "Znajdź Zawór Poboru" },
                 description: { en: "Every marine engine has an intake valve below the waterline.", pl: "Każdy silnik morski ma zawór poboru poniżej linii wodnej." },
                 steps: [
                     { en: "Follow the hose from the strainer backwards to the hull.", pl: "Idź po wężu od filtra w stronę kadłuba." },
                     { en: "The valve is usually located in the engine compartment or under floorboards nearby.", pl: "Zawór jest zazwyczaj w komorze silnika lub pod podłogą w pobliżu." }
                 ]
             },
             "clean_strainer": {
                 title: { en: "Clean Strainer & Check Seal", pl: "Wyczyść Filtr i Sprawdź Uszczelkę" },
                 description: { en: "Debris is blocking flow or air is leaking in, breaking the prime.", pl: "Zanieczyszczenia blokują przepływ lub lewe powietrze zrywa cyrkulację." },
                 steps: [
                     { en: "Close the seacock first!", pl: "Najpierw zamknij zawór denny!" },
                     { en: "Open strainer lid and remove debris.", pl: "Otwórz pokrywę filtra i usuń śmieci." },
                     { en: "Check the lid O-ring/gasket for cracks.", pl: "Sprawdź uszczelkę pokrywy pod kątem pęknięć." },
                     { en: "Grease the gasket with silicone grease if available.", pl: "Posmaruj uszczelkę smarem silikonowym jeśli go masz." },
                     { en: "Tighten lid firmly and OPEN SEACOCK.", pl: "Dokręć mocno pokrywę i OTWÓRZ ZAWÓR DENNY." }
                 ]
             },
             "fix_belt": {
                 title: { en: "Repair/Tighten Pump Belt", pl: "Napraw/Naciągnij Pasek Pompy" },
                 description: { en: "The pump is not being driven by the engine.", pl: "Pompa nie jest napędzana przez silnik." },
                 steps: [
                     { en: "Inspect belt for damage or glazing.", pl: "Sprawdź pasek pod kątem uszkodzeń lub ślizgania." },
                     { en: "Adjust tension or replace with a spare belt.", pl: "Wyreguluj naciąg lub wymień na zapasowy pasek." }
                 ]
             },
             "replace_impeller": {
                 title: { en: "Replace Impeller & Find Blades", pl: "Wymień Wirnik i Znajdź Łopatki" },
                 description: { en: "The rubber impeller has failed and cannot pump water.", pl: "Gumowy wirnik uległ awarii i nie może pompować wody." },
                 steps: [
                     { en: "Close seacock.", pl: "Zamknij zawór denny." },
                     { en: "Remove pump cover and extract old impeller.", pl: "Zdejmij pokrywę pompy i wyjmij stary wirnik." },
                     { en: "CRITICAL: If blades are missing, you MUST find them in the heat exchanger intake.", pl: "WAŻNE: Jeśli brakuje łopatek, MUSISZ je znaleźć w dolocie wymiennika ciepła." },
                     { en: "Install new impeller with a bit of dish soap or glycerin.", pl: "Zainstaluj nowy wirnik używając odrobiny mydła lub gliceryny." },
                     { en: "Open seacock and test.", pl: "Otwórz zawór denny i przetestuj." }
                 ]
             },
             "impeller_fail_suspected": {
                 title: { en: "Suspected Impeller Failure", pl: "Podejrzenie Awarii Wirnika" },
                 description: { en: "Symptoms point to the impeller, but it hasn't been visually confirmed.", pl: "Objawy wskazują na wirnik, ale nie zostało to potwierdzone wzrokowo." },
                 steps: [
                     { en: "Try to prime the system by pouring water into the strainer.", pl: "Spróbuj 'zalać' układ wlewając wodę do filtra." },
                     { en: "If it still doesn't pump, you must open the pump.", pl: "Jeśli nadal nie pompuje, musisz otworzyć pompę." }
                 ]
             },
             "exhaust_blockage": {
                 title: { en: "Exhaust / Mixing Elbow Blockage", pl: "Zatkana Rura / Kolanko Wydechowe" },
                 description: { en: "Water is reaching the engine but cannot exit through the exhaust.", pl: "Woda dociera do silnika, ale nie może wydostać się przez wydech." },
                 steps: [
                     { en: "Check the mixing elbow for carbon or salt buildup.", pl: "Sprawdź kolanko wydechowe pod kątem nagaru lub soli." },
                     { en: "Inspect the exhaust hose for internal collapse.", pl: "Sprawdź wąż wydechowy pod kątem wewnętrznego rozwarstwienia." },
                     { en: "Verify the water injection nipple is not clogged.", pl: "Sprawdź czy króciec wtrysku wody nie jest zatkany." }
                 ]
             },
             "expert_required": {
                  title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                  description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                  steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
              }
          }
      },
      "low_oil_pressure_diagnostic": {
          tree_id: "low_oil_pressure_diagnostic",
          start_node: "oil_level_check",
          metadata: {
              title: { en: "Low Oil Pressure Diagnostic", pl: "Diagnostyka Niskiego Ciśnienia Oleju" },
              version: "1.0",
              engine_type: "diesel"
          },
          nodes: {
              "oil_level_check": {
                  question: { 
                      en: "Check the dipstick. Is the oil level between the MIN and MAX marks?", 
                      pl: "Sprawdź bagnet. Czy poziom oleju jest między kreskami MIN i MAX?" 
                  },
                  answers: [
                      { text: { en: "Yes, level is OK", pl: "Tak, poziom jest OK" }, type: "standard", next: { type: "node", id: "oil_viscosity_check" } },
                      { text: { en: "No, it's below MIN", pl: "Nie, jest poniżej MIN" }, type: "standard", next: { type: "solution", id: "low_oil_level" } },
                      { text: { en: "It's way ABOVE MAX", pl: "Jest znacznie POWYŻEJ MAX" }, type: "standard", next: { type: "solution", id: "fuel_dilution" } },
                      { text: { en: "I can't check it", pl: "Nie mogę sprawdzić" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                  ]
              },
              "oil_viscosity_check": {
                  question: { 
                      en: "Rub a drop of oil between your fingers. Does it feel unusually thin, watery, or smell strongly of diesel?", 
                      pl: "Rozetrzyj kroplę oleju w palcach. Czy wydaje się nienaturalnie rzadki, wodnisty lub silnie śmierdzi ropą?" 
                  },
                  answers: [
                      { text: { en: "Yes, thin and smells of fuel", pl: "Tak, rzadki i śmierdzi paliwem" }, type: "standard", next: { type: "solution", id: "fuel_contamination" } },
                      { text: { en: "No, feels like normal oil", pl: "Nie, wydaje się normalny" }, type: "standard", next: { type: "node", id: "sensor_electrical_check" } },
                      { text: { en: "I don't know", pl: "Nie wiem" }, type: "cant_check", next: { type: "node", id: "sensor_electrical_check" } }
                  ]
              },
              "sensor_electrical_check": {
                  question: { 
                      en: "Locate the oil pressure sender on the engine. Is the wire connected firmly and free of corrosion?", 
                      pl: "Znajdź czujnik ciśnienia oleju na silniku. Czy przewód jest mocno podłączony i wolny od korozji?" 
                  },
                  answers: [
                      { text: { en: "Yes, connection is good", pl: "Tak, połączenie jest dobre" }, type: "standard", next: { type: "node", id: "alarm_behavior_check" } },
                      { text: { en: "No, wire is loose/corroded", pl: "Nie, kabel jest luźny/skorodowany" }, type: "standard", next: { type: "solution", id: "fix_sensor_wiring" } },
                      { text: { en: "I can't find the sensor", pl: "Nie mogę znaleźć czujnika" }, type: "cant_check", next: { type: "node", id: "alarm_behavior_check" } }
                  ]
              },
              "alarm_behavior_check": {
                  question: { 
                      en: "Does the alarm stay on even when the engine is cold and at higher RPMs, or only when hot and at idle?", 
                      pl: "Czy alarm świeci się nawet gdy silnik jest zimny i na wyższych obrotach, czy tylko gdy jest gorący i na wolnych obrotach?" 
                  },
                  answers: [
                      { text: { en: "Always on (Cold & Hot)", pl: "Zawsze (Zimny i Ciepły)" }, type: "standard", next: { type: "solution", id: "faulty_sensor_switch" } },
                      { text: { en: "Only when Hot & Idle", pl: "Tylko gdy Gorący i Wolne obroty" }, type: "standard", next: { type: "node", id: "mechanical_gauge_test" } },
                      { text: { en: "I'm not sure", pl: "Nie jestem pewien" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                  ]
              },
              "mechanical_gauge_test": {
                  question: { 
                      en: "Can you connect a mechanical pressure gauge to verify the actual pressure?", 
                      pl: "Czy możesz podłączyć mechaniczny manometr, aby zweryfikować faktyczne ciśnienie?" 
                  },
                  answers: [
                      { text: { en: "Gauge shows GOOD pressure", pl: "Manometr pokazuje DOBRE ciśnienie" }, type: "standard", next: { type: "solution", id: "faulty_instrumentation" } },
                      { text: { en: "Gauge shows LOW pressure", pl: "Manometr pokazuje NISKIE ciśnienie" }, type: "standard", next: { type: "solution", id: "internal_engine_wear" } },
                      { text: { en: "No mechanical gauge available", pl: "Brak manometru" }, type: "cant_check", next: { type: "solution", id: "internal_wear_suspected" } }
                  ]
              }
          },
          solutions: {
              "low_oil_level": {
                  title: { en: "Low Oil Level", pl: "Niski Poziom Oleju" },
                  description: { en: "The oil pump is sucking air because there isn't enough oil in the sump.", pl: "Pompa oleju zasysa powietrze, ponieważ w misce jest za mało oleju." },
                  steps: [
                      { en: "Top up with the correct grade of marine diesel oil immediately.", pl: "Natychmiast uzupełnij olej o odpowiedniej specyfikacji." },
                      { en: "Check for external leaks around the filter and gaskets.", pl: "Sprawdź pod kątem wycieków wokół filtra i uszczelek." },
                      { en: "Monitor oil level frequently during the next few hours of operation.", pl: "Monitoruj poziom oleju często przez najbliższe kilka godzin pracy." }
                  ]
              },
              "fuel_dilution": {
                  title: { en: "Oil Level Rising (Fuel Dilution)", pl: "Przybywanie Oleju (Rozrzedzenie Paliwem)" },
                  description: { en: "Diesel fuel is leaking into the oil, making it too thin to maintain pressure.", pl: "Paliwo przedostaje się do oleju, czyniąc go zbyt rzadkim, by utrzymać ciśnienie." },
                  steps: [
                      { en: "DO NOT RUN THE ENGINE. This can lead to a runaway or severe damage.", pl: "NIE URUCHAMIAJ SILNIKA. Może to prowadzić do rozbiegania silnika lub poważnych uszkodzeń." },
                      { en: "Check the mechanical lift pump diaphragm for leaks.", pl: "Sprawdź membranę mechanicznej pompki paliwa." },
                      { en: "Inspect injectors for 'pissing' or sticking open.", pl: "Sprawdź czy wtryskiwacze nie 'leją' lub nie są zablokowane w pozycji otwartej." },
                      { en: "Change oil and filter after repairing the fuel leak.", pl: "Wymień olej i filtr po naprawieniu wycieku paliwa." }
                  ]
              },
              "fuel_contamination": {
                  title: { en: "Contaminated Oil", pl: "Zanieczyszczony Olej" },
                  description: { en: "The oil has lost its viscosity due to fuel or water contamination.", pl: "Olej stracił lepkość z powodu zanieczyszczenia paliwem lub wodą." },
                  steps: [
                      { en: "Identify the source of contamination (Fuel leak or Coolant leak).", pl: "Zidentyfikuj źródło zanieczyszczenia (Wyciek paliwa lub płynu chłodniczego)." },
                      { en: "Change oil and filter immediately.", pl: "Natychmiast wymień olej i filtr." }
                  ]
              },
              "fix_sensor_wiring": {
                  title: { en: "Fix Sensor Wiring", pl: "Napraw Okablowanie Czujnika" },
                  description: { en: "A bad electrical connection is causing a false alarm.", pl: "Złe połączenie elektryczne powoduje fałszywy alarm." },
                  steps: [
                      { en: "Clean the sensor terminal with a wire brush or sandpaper.", pl: "Oczyść styk czujnika szczotką drucianą lub papierem ściernym." },
                      { en: "Crimp a new connector if the old one is loose.", pl: "Zaciśnij nowe złącze, jeśli stare jest luźne." },
                      { en: "Apply dielectric grease to prevent future corrosion.", pl: "Nałóż smar dielektryczny, aby zapobiec korozji w przyszłości." }
                  ]
              },
              "faulty_sensor_switch": {
                  title: { en: "Faulty Pressure Switch/Sensor", pl: "Uszkodzony Czujnik/Włącznik Ciśnienia" },
                  description: { en: "The sensor itself has failed internally.", pl: "Sam czujnik uległ wewnętrznej awarii." },
                  steps: [
                      { en: "Replace the oil pressure switch or sender unit.", pl: "Wymień włącznik lub nadajnik ciśnienia oleju." },
                      { en: "Ensure the new sensor matches the engine's thread and pressure range.", pl: "Upewnij się, że nowy czujnik pasuje do gwintu i zakresu ciśnienia silnika." }
                  ]
              },
              "faulty_instrumentation": {
                  title: { en: "Faulty Gauge or Wiring", pl: "Uszkodzony Wskaźnik lub Okablowanie" },
                  description: { en: "The mechanical pressure is good; the electrical gauge is lying.", pl: "Ciśnienie mechaniczne jest dobre; wskaźnik elektryczny kłamie." },
                  steps: [
                      { en: "Check the wiring between the sender and the dashboard gauge.", pl: "Sprawdź okablowanie między czujnikiem a wskaźnikiem na desce rozdzielczej." },
                      { en: "Test the gauge by grounding the sender wire (it should max out).", pl: "Przetestuj wskaźnik zwierając przewód czujnika do masy (powinien wychylić się na max)." }
                  ]
              },
              "internal_engine_wear": {
                  title: { en: "Internal Engine Wear (Serious)", pl: "Zużycie Wewnętrzne Silnika (Poważne)" },
                  description: { en: "Worn main bearings, big end bearings, or a failing oil pump.", pl: "Zużyte panewki główne, korbowodowe lub kończąca się pompa oleju." },
                  steps: [
                      { en: "CRITICAL: Minimize engine use. Low pressure at idle when hot is a classic sign of worn bearings.", pl: "WAŻNE: Ogranicz używanie silnika. Niskie ciśnienie na wolnych obrotach przy gorącym silniku to klasyczny objaw zużytych panewek." },
                      { en: "Try using a slightly thicker oil (e.g., 20W-50) as a temporary field fix to get home.", pl: "Spróbuj użyć nieco gęstszego oleju (np. 20W-50) jako tymczasowe rozwiązanie polowe, by dotrzeć do portu." },
                      { en: "Plan for a professional engine overhaul.", pl: "Zaplanuj profesjonalny remont silnika." }
                  ]
              },
              "internal_wear_suspected": {
                  title: { en: "Suspected Mechanical Issue", pl: "Podejrzenie Problemu Mechanicznego" },
                  description: { en: "The behavior (low pressure only when hot) strongly suggests mechanical wear.", pl: "Zachowanie (niskie ciśnienie tylko na gorąco) silnie sugeruje zużycie mechaniczne." },
                  steps: [
                      { en: "Treat as internal wear until proven otherwise with a mechanical gauge.", pl: "Traktuj to jako zużycie wewnętrzne, dopóki nie udowodnisz inaczej manometrem mechanicznym." },
                      { en: "Check oil filter for metallic particles.", pl: "Sprawdź filtr oleju pod kątem opiłków metalu." }
                  ]
              },
              "expert_required": {
                   title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                   description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                   steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
               }
           }
       },
       "fuel_air_ingress_diagnostic": {
           tree_id: "fuel_air_ingress_diagnostic",
           start_node: "symptom_pattern",
           metadata: {
               title: { en: "Fuel System Air Ingress Diagnostic", pl: "Diagnostyka Zapowietrzenia Układu Paliwowego" },
               version: "1.0",
               engine_type: "diesel"
           },
           nodes: {
               "symptom_pattern": {
                   question: { 
                       en: "When does the engine fail or run poorly?", 
                       pl: "Kiedy silnik gaśnie lub pracuje nierówno?" 
                   },
                   answers: [
                       { text: { en: "Starts, runs for 1-5 mins, then dies", pl: "Odpala, chodzi 1-5 min, potem gaśnie" }, type: "standard", next: { type: "node", id: "filter_change_history" } },
                       { text: { en: "Won't start after sitting for 24h+", pl: "Nie odpala po postoju powyżej 24h" }, type: "standard", next: { type: "node", id: "suction_leak_check" } },
                       { text: { en: "Rough idle and white smoke", pl: "Nierówne obroty i biały dym" }, type: "standard", next: { type: "node", id: "bleed_screw_test" } },
                       { text: { en: "I don't know", pl: "Nie wiem" }, type: "cant_check", next: { type: "node", id: "bleed_screw_test" } }
                   ]
               },
               "filter_change_history": {
                   question: { 
                       en: "Have the fuel filters been changed recently (in the last few engine hours)?", 
                       pl: "Czy filtry paliwa były ostatnio wymieniane (w ciągu ostatnich kilku godzin pracy)?" 
                   },
                   answers: [
                       { text: { en: "Yes, recently changed", pl: "Tak, niedawno wymieniane" }, type: "standard", next: { type: "solution", id: "check_filter_seals" } },
                       { text: { en: "No, changed long ago", pl: "Nie, dawno temu" }, type: "standard", next: { type: "node", id: "bleed_screw_test" } },
                       { text: { en: "I'm not sure", pl: "Nie jestem pewien" }, type: "cant_check", next: { type: "node", id: "bleed_screw_test" } }
                   ]
               },
               "suction_leak_check": {
                   question: { 
                       en: "Is there any sign of fuel dampness on hoses between the tank and the lift pump?", 
                       pl: "Czy widać wilgotne od paliwa miejsca na wężach między zbiornikiem a pompką paliwa?" 
                   },
                   answers: [
                       { text: { en: "Yes, found a damp spot", pl: "Tak, znalazłem wilgotne miejsce" }, type: "standard", next: { type: "solution", id: "tighten_suction_fittings" } },
                       { text: { en: "No, everything looks bone dry", pl: "Nie, wszystko jest suchutkie" }, type: "standard", next: { type: "node", id: "bleed_screw_test" } },
                       { text: { en: "Hard to see / Dark", pl: "Słabo widać / Jest ciemno" }, type: "cant_check", next: { type: "node", id: "bleed_screw_test" } }
                   ]
               },
               "bleed_screw_test": {
                   question: { 
                       en: "If you open the secondary filter bleed screw and pump the manual primer, do bubbles come out?", 
                       pl: "Jeśli odkręcisz śrubę odpowietrzającą na drugim filtrze i użyjesz ręcznej pompki, czy lecą bąbelki powietrza?" 
                   },
                   answers: [
                       { text: { en: "Yes, constant bubbles", pl: "Tak, ciągle lecą bąbelki" }, type: "standard", next: { type: "node", id: "primary_vs_secondary" } },
                       { text: { en: "Just clear fuel (no air)", pl: "Tylko czyste paliwo (brak powietrza)" }, type: "standard", next: { type: "solution", id: "not_air_ingress" } },
                       { text: { en: "I can't open the screw", pl: "Nie mogę odkręcić śruby" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                   ]
               },
               "primary_vs_secondary": {
                   question: { 
                       en: "Is the primary (large) filter bowl full of air, or is it full of fuel?", 
                       pl: "Czy odstojnik (duży filtr) jest pełen powietrza, czy pełen paliwa?" 
                   },
                   answers: [
                       { text: { en: "Bowl contains air", pl: "W odstojniku jest powietrze" }, type: "standard", next: { type: "solution", id: "primary_filter_leak" } },
                       { text: { en: "Bowl is full of fuel", pl: "Odstojnik jest pełen paliwa" }, type: "standard", next: { type: "solution", id: "secondary_system_leak" } },
                       { text: { en: "I can't see into the bowl", pl: "Nie widzę wnętrza odstojnika" }, type: "cant_check", next: { type: "solution", id: "system_wide_check" } }
                   ]
               }
           },
           solutions: {
               "check_filter_seals": {
                   title: { en: "Filter Seal Failure", pl: "Awaria Uszczelki Filtra" },
                   description: { en: "Air is most likely entering through a poorly seated filter gasket or O-ring.", pl: "Powietrze prawdopodobnie dostaje się przez źle osadzoną uszczelkę filtra lub O-ring." },
                   steps: [
                       { en: "Check if the old gasket was removed (double-gasketing causes leaks).", pl: "Sprawdź, czy stara uszczelka została zdjęta (podwójna uszczelka powoduje wycieki)." },
                       { en: "Ensure the filter is hand-tightened only (over-tightening deforms seals).", pl: "Upewnij się, że filtr jest dokręcony tylko ręką (zbyt mocne dokręcenie niszczy uszczelkę)." },
                       { en: "Lubricate the new seal with a bit of clean fuel before installing.", pl: "Posmaruj nową uszczelkę czystym paliwem przed montażem." }
                   ]
               },
               "tighten_suction_fittings": {
                   title: { en: "Suction Side Leak", pl: "Nieszczelność po Stronie Ssącej" },
                   description: { en: "A loose fitting on the vacuum side of the pump won't leak fuel out, but WILL suck air in.", pl: "Luźne złącze po stronie podciśnienia nie będzie wyciekać, ale BĘDZIE zasysać powietrze." },
                   steps: [
                       { en: "Check all hose clamps between the tank and the lift pump.", pl: "Sprawdź wszystkie opaski na wężach między zbiornikiem a pompką." },
                       { en: "Inspect copper crush washers on banjo bolts for scoring.", pl: "Sprawdź miedziane podkładki pod śrubami przelewowymi." },
                       { en: "Tighten any suspicious fittings half a turn.", pl: "Dokręć podejrzane złącza o pół obrotu." }
                   ]
               },
               "primary_filter_leak": {
                   title: { en: "Primary Filter / Water Separator Leak", pl: "Nieszczelność Filtra Wstępnego" },
                   description: { en: "Air is entering at the first point of filtration.", pl: "Powietrze dostaje się w pierwszym punkcie filtracji." },
                   steps: [
                       { en: "Check the drain plug at the bottom of the bowl for tightness.", pl: "Sprawdź dokręcenie korka spustowego na dole odstojnika." },
                       { en: "Inspect the top lid gasket of the primary filter.", pl: "Sprawdź uszczelkę górnej pokrywy filtra wstępnego." },
                       { en: "Verify the hose connections to and from the separator.", pl: "Zweryfikuj połączenia węży do i z separatora." }
                   ]
               },
               "secondary_system_leak": {
                   title: { en: "Secondary System Leak", pl: "Nieszczelność Układu Wtórnego" },
                   description: { en: "The leak is between the primary filter and the injection pump.", pl: "Nieszczelność jest między filtrem wstępnym a pompą wtryskową." },
                   steps: [
                       { en: "Inspect the engine-mounted fuel filter seals.", pl: "Sprawdź uszczelki filtra paliwa zamontowanego na silniku." },
                       { en: "Check the manual lift pump diaphragm for small cracks.", pl: "Sprawdź membranę ręcznej pompki paliwa pod kątem pęknięć." },
                       { en: "Bleed the entire system from the filter to the injectors.", pl: "Odpowietrz cały układ od filtra aż do wtryskiwaczy." }
                   ]
               },
               "system_wide_check": {
                   title: { en: "System-Wide Air Search", pl: "Ogólne Poszukiwanie Powietrza" },
                   description: { en: "Air is present but the exact source is hidden.", pl: "Powietrze jest w układzie, ale źródło jest ukryte." },
                   steps: [
                       { en: "Clean all fuel lines with a rag to make new leaks visible.", pl: "Wyczyść wszystkie przewody szmatką, by nowe wycieki były widoczne." },
                       { en: "Pump the primer until the system is hard and look for 'sweating' fittings.", pl: "Pompuj pompką, aż układ będzie twardy i szukaj 'pocących się' złączy." },
                       { en: "Consider bypassing the tank with a temporary fuel jug to isolate the tank/pickup.", pl: "Rozważ obejście zbiornika tymczasowym kanistrem, by wykluczyć zbiornik/smok." }
                   ]
               },
               "not_air_ingress": {
                   title: { en: "Not an Air Ingress Issue", pl: "To Nie Zapowietrzenie" },
                   description: { en: "Bleeding confirms no air is present in the low-pressure system.", pl: "Odpowietrzanie potwierdza brak powietrza w układzie niskiego ciśnienia." },
                   steps: [
                       { en: "Check for fuel starvation (clogged filters, not air).", pl: "Sprawdź drożność paliwa (zapchane filtry, nie powietrze)." },
                       { en: "Inspect the stop solenoid or mechanical stop lever position.", pl: "Sprawdź elektrozawór stopu lub pozycję dźwigni gaszenia." },
                       { en: "If white smoke is present, consider injection timing or compression.", pl: "Jeśli dymi na biało, rozważ kąt wtrysku lub kompresję." }
                   ]
               },
               "expert_required": {
                    title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                    description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                    steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
                }
            }
        },
        "fuel_contamination_diagnostic": {
            tree_id: "fuel_contamination_diagnostic",
            start_node: "separator_bowl_check",
            metadata: {
                title: { en: "Fuel Contamination Diagnostic (Water/Algae)", pl: "Diagnostyka Zanieczyszczenia Paliwa (Woda/Algi)" },
                version: "1.0",
                engine_type: "diesel"
            },
            nodes: {
                "separator_bowl_check": {
                    question: { 
                        en: "Look at the primary fuel separator bowl (the glass/plastic bowl). What do you see at the bottom?", 
                        pl: "Spójrz na odstojnik filtra wstępnego (szklana/plastikowa miska). Co widzisz na dnie?" 
                    },
                    answers: [
                        { text: { en: "Clear liquid (water) at the bottom", pl: "Przezroczysty płyn (woda) na dnie" }, type: "standard", next: { type: "node", id: "recent_refuel_check" } },
                        { text: { en: "Black/brown slime or 'strings'", pl: "Czarny/brązowy szlam lub 'nitki'" }, type: "standard", next: { type: "node", id: "filter_element_visual" } },
                        { text: { en: "Just clean, amber diesel", pl: "Tylko czysta, żółta ropa" }, type: "standard", next: { type: "node", id: "heavy_weather_context" } },
                        { text: { en: "I can't see into the bowl", pl: "Nie widzę wnętrza miski" }, type: "cant_check", next: { type: "node", id: "filter_element_visual" } }
                    ]
                },
                "recent_refuel_check": {
                    question: { 
                        en: "Did you refuel in the last 24 hours, or was there heavy rain/deck washing near the fuel fill?", 
                        pl: "Czy tankowałeś w ciągu ostatnich 24h, lub czy był silny deszcz/mycie pokładu w pobliżu wlewu?" 
                    },
                    answers: [
                        { text: { en: "Yes, recently refueled/washed", pl: "Tak, niedawno tankowałem/myłem" }, type: "standard", next: { type: "solution", id: "external_water_source" } },
                        { text: { en: "No, fuel is old", pl: "Nie, paliwo jest stare" }, type: "standard", next: { type: "solution", id: "condensation_buildup" } }
                    ]
                },
                "filter_element_visual": {
                    question: { 
                        en: "Remove the fuel filter element. Is it covered in black slime or looks like it's 'plugged' with mud?", 
                        pl: "Wyjmij wkład filtra. Czy jest pokryty czarnym szlamem lub wygląda na zapchany błotem?" 
                    },
                    answers: [
                        { text: { en: "Yes, it's slimy and black", pl: "Tak, jest obślizgły i czarny" }, type: "standard", next: { type: "solution", id: "algae_diesel_bug" } },
                        { text: { en: "No, just looks old/grey", pl: "Nie, wygląda po prostu na stary/szary" }, type: "standard", next: { type: "node", id: "heavy_weather_context" } },
                        { text: { en: "I can't remove it", pl: "Nie mogę go wyjąć" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                    ]
                },
                "heavy_weather_context": {
                    question: { 
                        en: "Has the boat been in heavy weather (rough seas) recently, stirring up the tank?", 
                        pl: "Czy łódź była ostatnio na silnym zafalowaniu, co mogło wzburzyć osady w zbiorniku?" 
                    },
                    answers: [
                        { text: { en: "Yes, it was very rough", pl: "Tak, mocno bujało" }, type: "standard", next: { type: "solution", id: "stirred_sediment" } },
                        { text: { en: "No, it's been calm", pl: "Nie, było spokojnie" }, type: "standard", next: { type: "node", id: "tank_bottom_test" } }
                    ]
                },
                "tank_bottom_test": {
                    question: { 
                        en: "Can you take a fuel sample directly from the bottom of the tank (via a drain plug or suction pump)?", 
                        pl: "Czy możesz pobrać próbkę paliwa bezpośrednio z dna zbiornika (przez korek lub pompkę)?" 
                    },
                    answers: [
                        { text: { en: "Sample shows water/dirt", pl: "Próbka pokazuje wodę/brud" }, type: "standard", next: { type: "solution", id: "tank_cleaning_required" } },
                        { text: { en: "Sample is perfectly clean", pl: "Próbka jest idealnie czysta" }, type: "standard", next: { type: "solution", id: "not_contamination" } },
                        { text: { en: "I can't take a sample", pl: "Nie mogę pobrać próbki" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                    ]
                }
            },
            solutions: {
                "external_water_source": {
                    title: { en: "External Water Contamination", pl: "Zewnętrzne Skażenie Wodą" },
                    description: { en: "Water entered via the fuel fill or a contaminated bunker station.", pl: "Woda dostała się przez wlew lub z zanieczyszczonej stacji paliw." },
                    steps: [
                        { en: "Drain the water separator bowl immediately.", pl: "Natychmiast opróżnij odstojnik wody." },
                        { en: "Check the fuel fill O-ring/gasket for leaks.", pl: "Sprawdź uszczelkę wlewu paliwa pod kątem nieszczelności." },
                        { en: "Add a water emulsifier treatment if the amount is small.", pl: "Dodaj uszlachetniacz wiążący wodę, jeśli jest jej mało." },
                        { en: "If the amount is large, the tank must be pumped out.", pl: "Jeśli wody jest dużo, zbiornik musi zostać wypompowany." }
                    ]
                },
                "condensation_buildup": {
                    title: { en: "Long-term Condensation", pl: "Długotrwała Kondensacja" },
                    description: { en: "Water has built up over time from air in a partially empty tank.", pl: "Woda nagromadziła się z czasem z powietrza w częściowo pustym zbiorniku." },
                    steps: [
                        { en: "Drain the primary separator.", pl: "Opróżnij separator wstępny." },
                        { en: "Keep fuel tanks full during winter storage or long periods of non-use.", pl: "Trzymaj zbiorniki pełne podczas postoju zimowego lub długich przerw." },
                        { en: "Use a fuel stabilizer/biocide to prevent algae growth in the water layer.", pl: "Używaj stabilizatora/biocydu, by zapobiec wzrostowi alg na styku wody." }
                    ]
                },
                "algae_diesel_bug": {
                    title: { en: "Diesel Bug (Algae/Bacteria)", pl: "Diesel Bug (Algi/Bakterie)" },
                    description: { en: "Microbial growth is thriving at the fuel-water interface in your tank.", pl: "W Twoim zbiorniku rozwijają się mikroorganizmy na styku paliwa i wody." },
                    steps: [
                        { en: "CRITICAL: Change all fuel filters immediately.", pl: "WAŻNE: Natychmiast wymień wszystkie filtry paliwa." },
                        { en: "Add a high-dose shock treatment of biocide (e.g., Grotamar or Biobor).", pl: "Dodaj dawkę uderzeniową biocydu (np. Grotamar lub Biobor)." },
                        { en: "Expect to change filters again soon as the biocide kills the bug and it clogs the filters.", pl: "Przygotuj się na ponowną wymianę filtrów, gdy biocyd zabije algi i zapcha nimi układ." },
                        { en: "Professional fuel polishing is recommended for heavy infestations.", pl: "Przy silnym skażeniu zalecane jest profesjonalne czyszczenie paliwa (polishing)." }
                    ]
                },
                "stirred_sediment": {
                    title: { en: "Stirred Up Sediment", pl: "Wzburzone Osady" },
                    description: { en: "The fuel is likely okay, but old dirt at the bottom of the tank was stirred up by the waves.", pl: "Paliwo jest prawdopodobnie OK, ale stare osady z dna zostały wzburzone przez fale." },
                    steps: [
                        { en: "Change the primary filter element.", pl: "Wymień wkład filtra wstępnego." },
                        { en: "Clean the separator bowl.", pl: "Wyczyść miskę separatora." },
                        { en: "Monitor the bowl for more sediment over the next few hours.", pl: "Monitoruj miskę pod kątem nowych osadów przez najbliższe godziny." }
                    ]
                },
                "tank_cleaning_required": {
                    title: { en: "Tank Cleaning Required", pl: "Wymagane Czyszczenie Zbiornika" },
                    description: { en: "The tank bottom is heavily contaminated and will continue to clog filters.", pl: "Dno zbiornika jest mocno zanieczyszczone i będzie nadal zapychać filtry." },
                    steps: [
                        { en: "Pump out the bottom few inches of the tank to remove water and sludge.", pl: "Wypompuj kilka dolnych centymetrów zbiornika, by usunąć wodę i szlam." },
                        { en: "If access is available, wipe out the tank internals.", pl: "Jeśli jest dostęp, wytrzyj wnętrze zbiornika szmatą." },
                        { en: "Inspect the fuel pickup tube screen for blockages.", pl: "Sprawdź sitko smoka paliwowego pod kątem zatorów." }
                    ]
                },
                "not_contamination": {
                    title: { en: "Not a Contamination Issue", pl: "To Nie Zanieczyszczenie" },
                    description: { en: "Fuel looks good; look elsewhere for the problem.", pl: "Paliwo wygląda dobrze; szukaj przyczyny gdzie indziej." },
                    steps: [
                        { en: "Check for air ingress (leaks in suction side).", pl: "Sprawdź zapowietrzenie (nieszczelności po stronie ssącej)." },
                        { en: "Verify fuel lift pump operation.", pl: "Zweryfikuj działanie pompki paliwa." },
                        { en: "Check for mechanical blockages (closed valves, kinked hoses).", pl: "Sprawdź zatory mechaniczne (zamknięte zawory, zagięte węże)." }
                    ]
                },
                "expert_required": {
                    title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                    description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                    steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
                }
            }
        },
        "drivetrain_overload_diagnostic": {
            tree_id: "drivetrain_overload_diagnostic",
            start_node: "stall_on_engagement",
            metadata: {
                title: { en: "Drivetrain Overload & Prop Fouling", pl: "Przeciążenie Napędu i Zanieczyszczenie Śruby" },
                version: "1.0",
                engine_type: "diesel"
            },
            nodes: {
                "stall_on_engagement": {
                    question: { 
                        en: "Does the engine stall or drop RPM significantly the moment you shift into gear (Forward or Reverse)?", 
                        pl: "Czy silnik gaśnie lub drastycznie traci obroty w momencie wrzucenia biegu (Naprzód lub Wstecz)?" 
                    },
                    answers: [
                        { text: { en: "Yes, it stalls immediately", pl: "Tak, natychmiast gaśnie" }, type: "standard", next: { type: "node", id: "neutral_rev_check" } },
                        { text: { en: "No, but it vibrates/lacks power", pl: "Nie, ale wibruje / brak mu mocy" }, type: "standard", next: { type: "node", id: "vibration_pattern" } },
                        { text: { en: "I can't shift at all", pl: "Nie mogę wrzucić biegu" }, type: "cant_check", next: { type: "solution", id: "linkage_failure" } }
                    ]
                },
                "neutral_rev_check": {
                    question: { 
                        en: "In NEUTRAL, does the engine rev freely to its maximum rated RPM?", 
                        pl: "Czy na biegu JAŁOWYM (Neutral) silnik wkręca się swobodnie na maksymalne obroty?" 
                    },
                    answers: [
                        { text: { en: "Yes, revs perfectly", pl: "Tak, wkręca się idealnie" }, type: "standard", next: { type: "node", id: "shaft_rotation_test" } },
                        { text: { en: "No, it struggles even in neutral", pl: "Nie, dusi się nawet na luzie" }, type: "standard", next: { type: "solution", id: "not_drivetrain_issue" } }
                    ]
                },
                "shaft_rotation_test": {
                    question: { 
                        en: "With the engine OFF and in NEUTRAL, can you turn the propeller shaft by hand (use a pipe wrench if needed)?", 
                        pl: "Przy WYŁĄCZONYM silniku i na LUZIE, czy możesz obrócić wał napędowy ręką (użyj klucza jeśli trzeba)?" 
                    },
                    answers: [
                        { text: { en: "It's seized / won't budge", pl: "Jest zablokowany / ani drgnie" }, type: "standard", next: { type: "node", id: "external_visual_check" } },
                        { text: { en: "Turns, but very heavy/stiff", pl: "Obraca się, ale bardzo ciężko" }, type: "standard", next: { type: "node", id: "gearbox_heat_check" } },
                        { text: { en: "Turns freely by hand", pl: "Obraca się swobodnie" }, type: "standard", next: { type: "node", id: "prop_growth_check" } }
                    ]
                },
                "vibration_pattern": {
                    question: { 
                        en: "Is the vibration constant, or does it get worse as RPM increases?", 
                        pl: "Czy wibracje są stałe, czy nasilają się wraz ze wzrostem obrotów?" 
                    },
                    answers: [
                        { text: { en: "Violent shaking at any RPM", pl: "Silne trzęsienie na każdych obrotach" }, type: "standard", next: { type: "solution", id: "prop_damage_entanglement" } },
                        { text: { en: "Smooth at low, vibrates at high", pl: "Gładko na niskich, wibruje na wysokich" }, type: "standard", next: { type: "node", id: "prop_growth_check" } }
                    ]
                },
                "external_visual_check": {
                    question: { 
                        en: "Can you see a rope, net, or fishing line wrapped around the propeller or shaft?", 
                        pl: "Czy widzisz linę, sieć lub żyłkę owiniętą wokół śruby lub wału?" 
                    },
                    answers: [
                        { text: { en: "Yes, clearly entangled", pl: "Tak, wyraźnie zaplątane" }, type: "standard", next: { type: "solution", id: "prop_entanglement" } },
                        { text: { en: "No, looks clear (diving/camera)", pl: "Nie, wygląda na czyste (nurek/kamera)" }, type: "standard", next: { type: "solution", id: "shaft_internal_seizure" } },
                        { text: { en: "I can't see/check", pl: "Nie mogę sprawdzić" }, type: "cant_check", next: { type: "solution", id: "dive_required" } }
                    ]
                },
                "gearbox_heat_check": {
                    question: { 
                        en: "After a short run (if possible), is the gearbox housing unusually hot or smelling of burnt oil?", 
                        pl: "Po krótkiej pracy (jeśli możliwa), czy obudowa przekładni jest nienaturalnie gorąca lub czuć spaleniznę?" 
                    },
                    answers: [
                        { text: { en: "Yes, very hot / burnt smell", pl: "Tak, gorąca / czuć spaleniznę" }, type: "standard", next: { type: "solution", id: "gearbox_stress_failure" } },
                        { text: { en: "Feels normal temperature", pl: "Wydaje się w normie" }, type: "standard", next: { type: "solution", id: "shaft_drag_issues" } }
                    ]
                },
                "prop_growth_check": {
                    question: { 
                        en: "Is the propeller covered in heavy barnacles, mussels, or hard growth?", 
                        pl: "Czy śruba jest pokryta gęstymi pąklami, małżami lub twardym osadem?" 
                    },
                    answers: [
                        { text: { en: "Yes, heavy growth", pl: "Tak, gęsty porost" }, type: "standard", next: { type: "solution", id: "barnacle_overload" } },
                        { text: { en: "No, it is clean", pl: "Nie, jest czysta" }, type: "standard", next: { type: "solution", id: "expert_required" } }
                    ]
                }
            },
            solutions: {
                "prop_entanglement": {
                    title: { en: "Propeller Entanglement", pl: "Zaplątana Śruba" },
                    description: { en: "A foreign object (rope/net) is physically preventing the propeller from turning.", pl: "Obcy przedmiot (lina/sieć) fizycznie blokuje obrót śruby." },
                    steps: [
                        { en: "DO NOT RE-ENGAGE GEAR. This can destroy the gearbox or engine mounts.", pl: "NIE WRZUCAJ BIEGU. Możesz zniszczyć przekładnię lub poduszki silnika." },
                        { en: "If safe, dive or use a GoPro to confirm the entanglement.", pl: "Jeśli bezpieczne, zanurkuj lub użyj kamery, by potwierdzić zaplątanie." },
                        { en: "Cut away the obstruction using a sharp serrated knife.", pl: "Odetnij blokadę używając ostrego noża z ząbkami." },
                        { en: "Check the shaft seal (stuffing box) for leaks after clearing, as ropes can melt seals.", pl: "Sprawdź dławicę wału pod kątem wycieków, liny mogą stopić uszczelnienia." }
                    ]
                },
                "prop_damage_entanglement": {
                    title: { en: "Prop Damage or Partial Entanglement", pl: "Uszkodzenie Śruby lub Częściowe Zaplątanie" },
                    description: { en: "The prop is out of balance due to a bent blade or a trailing piece of rope.", pl: "Śruba straciła wyważenie przez wygiętą łopatkę lub ciągnący się kawałek liny." },
                    steps: [
                        { en: "Inspect blades for symmetry and chips.", pl: "Sprawdź łopatki pod kątem symetrii i wyszczerbień." },
                        { en: "Check if a piece of fishing line is stuck behind the prop (can cut seals).", pl: "Sprawdź czy żyłka nie wkręciła się za śrubę (może przeciąć uszczelniacze)." }
                    ]
                },
                "shaft_internal_seizure": {
                    title: { en: "Internal Shaft Seizure", pl: "Zatarte Łożyskowanie Wału" },
                    description: { en: "The resistance is coming from the bearings or the packing gland, not the water.", pl: "Opór stawia łożyskowanie lub dławica, a nie woda." },
                    steps: [
                        { en: "Check the Cutless Bearing (external) for wear or collapse.", pl: "Sprawdź łożysko Cutless (zewnętrzne) pod kątem zużycia lub zapadnięcia." },
                        { en: "Inspect the packing gland (internal). If too tight, it will overheat and seize the shaft.", pl: "Sprawdź dławicę (wewnętrzną). Jeśli za mocno skręcona, przegrzeje się i zablokuje wał." },
                        { en: "Loosen the packing gland nuts slightly and check for rotation.", pl: "Poluzuj nieco nakrętki dławicy i sprawdź czy wał puszcza." }
                    ]
                },
                "gearbox_stress_failure": {
                    title: { en: "Gearbox Internal Failure", pl: "Awaria Wewnętrzna Przekładni" },
                    description: { en: "The high resistance has caused internal damage to clutches or gears.", pl: "Duży opór spowodował uszkodzenie sprzęgieł lub kół zębatych." },
                    steps: [
                        { en: "Check gearbox oil for a burnt smell or metallic 'glitter'.", pl: "Sprawdź olej w przekładni pod kątem zapachu spalenizny lub opiłków." },
                        { en: "Check if the oil level is correct; low oil causes massive heat under load.", pl: "Sprawdź poziom oleju; brak oleju powoduje ogromne tarcie pod obciążeniem." }
                    ]
                },
                "shaft_drag_issues": {
                    title: { en: "Excessive Shaft Drag", pl: "Nadmierny Opór Wału" },
                    description: { en: "The drivetrain is functional but fighting internal friction.", pl: "Napęd działa, ale walczy z wewnętrznym tarciem." },
                    steps: [
                        { en: "Verify engine alignment. A misaligned engine puts immense side-load on the shaft.", pl: "Zweryfikuj osiowość silnika. Krzywo ustawiony silnik stawia ogromny opór na wale." },
                        { en: "Check if the shaft is bent (look for 'wobble' while turning).", pl: "Sprawdź czy wał nie jest krzywy (szukaj bicia podczas obracania)." }
                    ]
                },
                "barnacle_overload": {
                    title: { en: "Propeller Fouling (Biological)", pl: "Zarośnięta Śruba (Biologia)" },
                    description: { en: "Hard growth has changed the propeller's pitch and efficiency, overloading the engine.", pl: "Porosty zmieniły skok i sprawność śruby, przeciążając silnik." },
                    steps: [
                        { en: "The engine is essentially 'over-propped' now because of the drag.", pl: "Silnik jest teraz 'przeładowany' z powodu oporu porostów." },
                        { en: "Scrape the propeller blades clean using a plastic scraper or dull knife.", pl: "Oczyść łopatki śruby plastikowym skrobakiem lub tępym nożem." },
                        { en: "Even a few large barnacles can drop max RPM by 500+.", pl: "Nawet kilka dużych pąkli może obniżyć max obroty o ponad 500." }
                    ]
                },
                "not_drivetrain_issue": {
                    title: { en: "Not a Drivetrain Issue", pl: "To Nie Problem z Napędem" },
                    description: { en: "The engine cannot rev even without load; look at fuel or air systems.", pl: "Silnik nie wkręca się nawet bez obciążenia; szukaj w paliwie lub dolocie." },
                    steps: [
                        { en: "Check fuel filters and air intake.", pl: "Sprawdź filtry paliwa i dolot powietrza." }
                    ]
                },
                "linkage_failure": {
                    title: { en: "Shift Linkage Failure", pl: "Awaria Mechanizmu Zmiany Biegów" },
                    description: { en: "The command from the lever is not reaching the gearbox.", pl: "Polecenie z manetki nie dociera do przekładni." },
                    steps: [
                        { en: "Check the Morse cables and connections at the gearbox lever.", pl: "Sprawdź linki Morse'a i połączenia przy dźwigni na przekładni." }
                    ]
                },
                "dive_required": {
                    title: { en: "Underwater Inspection Required", pl: "Wymagana Inspekcja Podwodna" },
                    description: { en: "Cannot confirm external issues without seeing the propeller.", pl: "Nie można potwierdzić problemów zewnętrznych bez obejrzenia śruby." },
                    steps: [
                        { en: "Hire a diver or use an underwater camera/drone.", pl: "Wynajmij nurka lub użyj kamery podwodnej/drona." }
                    ]
                },
                "expert_required": {
                    title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                    description: { en: "Cannot determine issue safely.", pl: "Nie można bezpiecznie ustalić przyczyny." },
                    steps: [{ en: "Call a mechanic.", pl: "Wezwij mechanika." }]
                }
            }
        }
    };

// Rozwiązania (Solutions) dla drzew
const treeSolutions = {
    "expert_required": {
        title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
        description: {
            en: "Cannot determine safely with available information.",
            pl: "Nie można bezpiecznie ustalić przyczyny na podstawie dostępnych informacji."
        },
        steps: [
            { en: "Stop attempts and call mechanic.", pl: "Przerwij próby i wezwij mechanika." }
        ],
        is_temporary: false
    },
    "dead_battery": {
        title_pl: "Rozładowany akumulator",
        description_pl: "Napięcie spadło poniżej poziomu rozruchu.",
        steps: ["Sprawdź klemy", "Przełącz na akumulator zapasowy (BOTH)", "Naładuj akumulator"]
    },
    "air_in_fuel": {
        title_pl: "Zapowietrzone paliwo",
        description_pl: "Pęcherzyki powietrza w układzie wtryskowym.",
        steps: ["Odpowietrz układ śrubą na filtrze", "Sprawdź szczelność przewodów"]
    }
};

// Funkcja do łączenia baz danych (Ogólna + Specyficzna)
function mergeSpecificKnowledge(generalDB, context) {
    // Context: 'inboard', 'outboard', or specific 'honda', etc.
    // Jeśli nie podano kontekstu, zwracamy ogólną
    if (!context) return generalDB;

    console.log(`Loading specifics for context: ${context}`);
    
    // Kopiuj ogólną bazę
    const mergedIssues = { ...generalDB.issues };
    
    // Helper do łączenia
    const merge = (specifics) => {
        Object.values(specifics.common_issues).forEach(issue => {
            issue.isSpecific = true;
            // Boost probability slightly as it's a known specific issue
            issue.probability = (issue.base_probability || 0.1) + 0.1; 
            
            if (!issue.required_symptoms) issue.required_symptoms = issue.symptoms;
            if (!issue.conflicting_symptoms) issue.conflicting_symptoms = [];
            
            mergedIssues[issue.id] = issue;
        });
    };

    // Logika łączenia grup
    if (context === 'inboard') {
        if (marineSpecifics.yanmar) merge(marineSpecifics.yanmar);
        if (marineSpecifics.volvo) merge(marineSpecifics.volvo);
    } else if (context === 'outboard') {
        if (marineSpecifics.yamaha) merge(marineSpecifics.yamaha);
        if (marineSpecifics.mercury) merge(marineSpecifics.mercury);
        if (marineSpecifics.honda) merge(marineSpecifics.honda);
    } else if (marineSpecifics[context]) {
        // Fallback dla konkretnej marki jeśli kiedyś będzie potrzebna
        merge(marineSpecifics[context]);
    }

    return {
        ...generalDB,
        issues: mergedIssues
    };
}

/**
 * Static validator for diagnostic trees.
 * Checks for structural integrity, localization, and logical flow.
 * @param {Object} tree - The diagnostic tree object to validate.
 * @returns {string[]} - Array of descriptive error messages (empty if valid).
 */
function validateDiagnosticTree(tree) {
    const errors = [];
    const MAX_DEPTH = 6;

    if (!tree || typeof tree !== 'object') {
        return [{ type: "CRITICAL", message: "Tree must be a non-null object." }];
    }

    const treeId = tree.tree_id || "unknown_tree";

    // 1. Metadata Validation
    if (!tree.tree_id) errors.push({ id: treeId, type: "METADATA", message: "Missing 'tree_id'." });
    
    if (!tree.metadata) {
        errors.push({ id: treeId, type: "METADATA", message: "Missing 'metadata' object." });
    } else {
        const meta = tree.metadata;
        if (!meta.title?.en || !meta.title?.pl) {
            errors.push({ id: treeId, type: "METADATA", message: "Title must have both 'en' and 'pl' translations." });
        }
        if (!meta.version) errors.push({ id: treeId, type: "METADATA", message: "Missing 'version'." });
        if (!meta.engine_type) errors.push({ id: treeId, type: "METADATA", message: "Missing 'engine_type' (diesel|gasoline|electrical)." });
    }

    const nodes = tree.nodes || {};
    const solutions = tree.solutions || {};

    if (Object.keys(nodes).length === 0) {
        errors.push({ id: treeId, type: "STRUCTURE", message: "Tree has no nodes." });
    }

    // 2. Node Validation
    for (const [nodeId, node] of Object.entries(nodes)) {
        // Question Localization
        if (!node.question?.en || !node.question?.pl) {
            errors.push({ id: nodeId, type: "LOCALIZATION", message: "Missing 'en' or 'pl' question text." });
        }

        // OPTIONAL: Image and Note Warnings
        if (!node.image) {
            errors.push({ id: nodeId, type: "CONTENT_WARNING", severity: "warning", message: "Optional 'image' field is missing." });
        }
        if (!node.note?.en || !node.note?.pl) {
            errors.push({ id: nodeId, type: "CONTENT_WARNING", severity: "warning", message: "Optional 'note' field is missing or not localized." });
        }

        // Context Localization (Optional)
        if (node.context && (!node.context.en || !node.context.pl)) {
            errors.push({ id: nodeId, type: "LOCALIZATION", message: "Context provided but missing 'en' or 'pl' translation." });
        }

        // Answers Validation
        const answers = node.answers || [];
        if (answers.length === 0) {
            errors.push({ id: nodeId, type: "STRUCTURE", message: "Must have at least one answer." });
        }

        let hasCantCheck = false;
        answers.forEach((ans, idx) => {
            const ansRef = `ANSWER [${idx}]`;

            if (ans.type === 'cant_check') hasCantCheck = true;

            // Answer Text Localization
            if (!ans.text?.en || !ans.text?.pl) {
                errors.push({ id: nodeId, path: ansRef, type: "LOCALIZATION", message: "Missing 'en' or 'pl' text." });
            }

            // OPTIONAL: Answer Images
            if (!ans.image) {
                errors.push({ id: nodeId, path: ansRef, type: "CONTENT_WARNING", severity: "warning", message: "Optional 'image' for answer is missing." });
            }

            // Probability Validation (Optional but must be 0-1 if present)
            if (ans.probability !== undefined) {
                if (typeof ans.probability !== 'number' || ans.probability < 0 || ans.probability > 1) {
                    errors.push({ id: nodeId, path: ansRef, type: "VALIDATION", message: "Probability must be a number between 0.0 and 1.0." });
                }
            }

            // Path Integrity
            if (ans.next) {
                const { type, id } = ans.next;
                if (type === 'node') {
                    if (!nodes[id]) {
                        errors.push({ id: nodeId, path: ansRef, type: "REFERENCE", message: `References non-existent node ID '${id}'.` });
                    }
                } else if (type === 'solution') {
                    if (!solutions[id]) {
                        errors.push({ id: nodeId, path: ansRef, type: "REFERENCE", message: `References non-existent solution ID '${id}'.` });
                    }
                } else {
                    errors.push({ id: nodeId, path: ansRef, type: "VALIDATION", message: `Invalid target type '${type}' (must be 'node' or 'solution').` });
                }
            } else {
                errors.push({ id: nodeId, path: ansRef, type: "STRUCTURE", message: "Missing 'next' target object." });
            }
        });

        if (!hasCantCheck) {
            errors.push({ id: nodeId, type: "STRUCTURE", message: "Missing a 'cant_check' answer type." });
        }
    }

    // 3. Solution Validation
    for (const [solId, sol] of Object.entries(solutions)) {
        if (!sol.title?.en || !sol.title?.pl) {
            errors.push({ id: solId, type: "LOCALIZATION", message: "Missing 'en' or 'pl' title." });
        }
        if (!sol.description?.en || !sol.description?.pl) {
            errors.push({ id: solId, type: "LOCALIZATION", message: "Missing 'en' or 'pl' description." });
        }

        // OPTIONAL: Solution Images and Warnings
        if (!sol.image) {
            errors.push({ id: solId, type: "CONTENT_WARNING", severity: "warning", message: "Optional 'image' for solution is missing." });
        }
        if (!sol.expert_note?.en || !sol.expert_note?.pl) {
            errors.push({ id: solId, type: "CONTENT_WARNING", severity: "warning", message: "Optional 'expert_note' for solution is missing." });
        }
        
        // Steps Localization
        if (!Array.isArray(sol.steps) || sol.steps.length === 0) {
            errors.push({ id: solId, type: "STRUCTURE", message: "Missing or empty 'steps' array." });
        } else {
            sol.steps.forEach((step, idx) => {
                if (!step.en || !step.pl) {
                    errors.push({ id: solId, path: `STEP [${idx}]`, type: "LOCALIZATION", message: "Missing 'en' or 'pl' instruction text." });
                }
            });
        }
    }

    // 4. Logical Flow Analysis (Infinite Loops, Depth & Reachability)
    const startNodeId = tree.start_node || (Object.keys(nodes).length > 0 ? Object.keys(nodes)[0] : null);
    const reachableNodes = new Set();
    const reachableSolutions = new Set();
    
    if (startNodeId && nodes[startNodeId]) {
        const memo = new Map(); // nodeId -> maxSubtreeDepth
        const visiting = new Set(); // For loop detection in current path
        const flowErrors = [];

        function checkFlow(nodeId, currentPath) {
            reachableNodes.add(nodeId);

            // 1. Loop Detection
            if (visiting.has(nodeId)) {
                flowErrors.push({ 
                    id: nodeId, 
                    type: "FLOW", 
                    path: [...currentPath, nodeId].join(' -> '), 
                    message: "Infinite loop detected." 
                });
                return Infinity;
            }

            // 2. Cache Hit (Optimization for large trees)
            if (memo.has(nodeId)) {
                const maxSubtree = memo.get(nodeId);
                const totalDepth = currentPath.length + 1 + maxSubtree;
                if (totalDepth > MAX_DEPTH) {
                    flowErrors.push({
                        id: nodeId,
                        type: "FLOW",
                        path: [...currentPath, nodeId].join(' -> '),
                        message: `Max depth (${MAX_DEPTH}) exceeded in downstream branch (estimated total depth: ${totalDepth}).`
                    });
                }
                return maxSubtree;
            }

            const node = nodes[nodeId];
            if (!node) return 0;

            visiting.add(nodeId);
            let maxSubtreeDepth = 0;

            const answers = node.answers || [];
            for (const ans of answers) {
                if (ans.next) {
                    if (ans.next.type === 'node') {
                        const nextId = ans.next.id;
                        const subDepth = checkFlow(nextId, [...currentPath, nodeId]);
                        maxSubtreeDepth = Math.max(maxSubtreeDepth, 1 + subDepth);
                    } else if (ans.next.type === 'solution') {
                        reachableSolutions.add(ans.next.id);
                        maxSubtreeDepth = Math.max(maxSubtreeDepth, 1);
                    }
                }
            }

            visiting.delete(nodeId);
            
            // Only cache if no loop was detected in this branch
            if (maxSubtreeDepth !== Infinity) {
                memo.set(nodeId, maxSubtreeDepth);
            }

            // Check current node depth
            if (currentPath.length + 1 > MAX_DEPTH) {
                flowErrors.push({
                    id: nodeId,
                    type: "FLOW",
                    path: [...currentPath, nodeId].join(' -> '),
                    message: `Max depth (${MAX_DEPTH}) exceeded.`
                });
            }

            return maxSubtreeDepth;
        }

        checkFlow(startNodeId, []);
        
        // Check for orphaned nodes/solutions
        Object.keys(nodes).forEach(id => {
            if (!reachableNodes.has(id)) {
                errors.push({ id, type: "STRUCTURE", message: "Node is unreachable from start node." });
            }
        });
        Object.keys(solutions).forEach(id => {
            if (!reachableSolutions.has(id)) {
                errors.push({ id, type: "STRUCTURE", message: "Solution is unreachable from start node." });
            }
        });

        // De-duplicate flow errors
        const seenFlowErrors = new Set();
        flowErrors.forEach(err => {
            const key = `${err.type}:${err.id}:${err.message}`;
            if (!seenFlowErrors.has(key)) {
                seenFlowErrors.add(key);
                errors.push(err);
            }
        });
    } else if (Object.keys(nodes).length > 0) {
        errors.push({ id: treeId, type: "STRUCTURE", message: "Could not determine start node." });
    }

    return errors;
}


// Function exports for testing (if running in Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        mergeSpecificKnowledge, 
        validateDiagnosticTree,
        diagnosticTrees,
        productionTrees
    };
}

