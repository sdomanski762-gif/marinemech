/**
 * DIESEL ENGINE CORE: HARD COLD START
 * Focus: Glow system, cranking speed, fuel quality, compression.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const hardColdStartPath = {
    tree_id: "hard_cold_start",
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
                    "text": { "en": "Hard to start when cold (but starts fine when warm)", "pl": "Trudno zapala gdy jest zimny (ale zapala dobrze gdy jest ciepły)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "preheat_procedure_check" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Shutdown paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Wyłączenie)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "preheat_procedure_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "preheat_procedure_check": {
            "question": {
                "en": "Are you using the correct pre-heating (glow plug) procedure for this engine?",
                "pl": "Czy stosujesz poprawną procedurę wstępnego podgrzewania (świece żarowe) dla tego silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, I hold pre-heat for the recommended time", "pl": "Tak, trzymam podgrzewanie przez zalecany czas" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "glow_plug_current_test" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, or I'm not sure how to pre-heat", "pl": "Nie, lub nie jestem pewien jak podgrzewać" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_correct_preheat_procedure" },
                    "probability": 0.7,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "glow_plug_current_test" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "glow_plug_current_test": {
            "question": {
                "en": "Check for current draw when pre-heating. Does the cabin light dim slightly or does the ammeter show a drop?",
                "pl": "Sprawdź pobór prądu podczas podgrzewania. Czy światło w kabinie lekko przygasa lub amperomierz pokazuje spadek?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, current draw is visible", "pl": "Tak, pobór prądu jest widoczny" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "cold_cranking_speed_check" },
                    "probability": 0.2,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No visible current draw", "pl": "Brak widocznego poboru prądu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "glow_plug_relay_check" },
                    "probability": 0.8,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "glow_plug_relay_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "glow_plug_relay_check": {
            "question": {
                "en": "Check the glow plug relay. Do you hear a 'click' when activating pre-heat?",
                "pl": "Sprawdź przekaźnik świec żarowych. Czy słyszysz 'kliknięcie' przy aktywacji podgrzewania?"
            },
            "answers": [
                {
                    "text": { "en": "No click heard", "pl": "Nie słychać kliknięcia" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_glow_relay_fault" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Click heard but no heat", "pl": "Słychać kliknięcie, ale brak grzania" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_glow_plug_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "cold_cranking_speed_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "cold_cranking_speed_check": {
            "question": {
                "en": "Does the engine crank at normal speed, or does it sound slow/labored in the cold?",
                "pl": "Czy silnik kręci się z normalną prędkością, czy brzmi na wolny/ociężały w zimnie?"
            },
            "answers": [
                {
                    "text": { "en": "Crank speed is normal", "pl": "Prędkość kręcenia jest normalna" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "fuel_quality_cold_check" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Crank is slow/labored", "pl": "Kręcenie jest wolne/ociężałe" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "battery_cold_capacity_check" },
                    "probability": 0.7,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "fuel_quality_cold_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "battery_cold_capacity_check": {
            "question": {
                "en": "Check battery age and connections. Are they old or corroded?",
                "pl": "Sprawdź wiek akumulatora i połączenia. Czy są stare lub skorodowane?"
            },
            "answers": [
                {
                    "text": { "en": "Old battery / Corroded terminals", "pl": "Stary akumulator / Skorodowane zaciski" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_battery_service_cold" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Battery and terminals look good", "pl": "Akumulator i zaciski wyglądają dobrze" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_viscosity_check" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "fuel_quality_cold_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "oil_viscosity_check": {
            "question": {
                "en": "Is the engine oil suitable for the current temperature? (e.g. 15W40 in extreme cold)",
                "pl": "Czy olej silnikowy jest odpowiedni do obecnej temperatury? (np. 15W40 w silnym mrozie)"
            },
            "answers": [
                {
                    "text": { "en": "Oil might be too thick", "pl": "Olej może być zbyt gęsty" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "sol_oil_viscosity_change" },
                    "probability": 0.6,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Oil viscosity is correct", "pl": "Lepkość oleju jest poprawna" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "fuel_quality_cold_check" },
                    "probability": 0.4,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "fuel_quality_cold_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "fuel_quality_cold_check": {
            "question": {
                "en": "Check fuel quality. Is it 'summer fuel' in winter conditions or is there visible waxing?",
                "pl": "Sprawdź jakość paliwa. Czy to 'paliwo letnie' w zimowych warunkach lub widać parafinę (woskowanie)?"
            },
            "answers": [
                {
                    "text": { "en": "Visible waxing / Wrong season fuel", "pl": "Widoczna parafina / Paliwo z niewłaściwego sezonu" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fuel_waxing_fix" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Fuel looks clear and correct", "pl": "Paliwo wygląda na czyste i poprawne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "compression_cold_verify" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check", "pl": "Nie mogę sprawdzić" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "compression_cold_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "compression_cold_verify": {
            "question": {
                "en": "If pre-heat and crank speed are okay, low compression may be the cause. Does the engine start with a 'sniff' of starting fluid (use with caution!)?",
                "pl": "Jeśli podgrzewanie i prędkość kręcenia są OK, przyczyną może być niska kompresja. Czy silnik zapala po 'podaniu' samostartu (używaj ostrożnie!)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, starts with fluid", "pl": "Tak, zapala po samostarcie" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "sol_low_compression_cold" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, fluid doesn't help", "pl": "Nie, samostart nie pomaga" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't want to use starting fluid", "pl": "Nie chcę używać samostartu" },
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
        "sol_correct_preheat_procedure": {
            "title": { "en": "Correct Pre-heating Procedure", "pl": "Poprawna Procedura Podgrzewania" },
            "description": { "en": "Diesel engines need heat for combustion, especially when cold. Many users do not pre-heat long enough.", "pl": "Silniki Diesla potrzebują ciepła do zapłonu, szczególnie gdy są zimne. Wielu użytkowników nie podgrzewa wystarczająco długo." },
            "steps": [
                { "en": "Turn key to 'Heat' or 'Glow' position and hold for 10-20 seconds (check your manual).", "pl": "Przekręć kluczyk w pozycję 'Heat' lub 'Glow' i przytrzymaj przez 10-20 sekund (sprawdź instrukcję)." },
                { "en": "Watch for the glow indicator light to go out or the ammeter to return to zero.", "pl": "Obserwuj, aż lampka kontrolna świec zgaśnie lub amperomierz wróci do zera." },
                { "en": "Immediately crank the engine after the heating cycle ends.", "pl": "Natychmiast zakręć silnikiem po zakończeniu cyklu grzania." }
            ],
            "is_temporary": false
        },
        "sol_glow_relay_fault": {
            "title": { "en": "Glow Plug Relay Fault", "pl": "Usterka Przekaźnika Świec Żarowych" },
            "description": { "en": "The relay is not sending power to the glow plugs.", "pl": "Przekaźnik nie wysyła prądu do świec żarowych." },
            "steps": [
                { "en": "Locate the glow plug relay (usually in the engine junction box).", "pl": "Zlokalizuj przekaźnik świec (zwykle w skrzynce połączeniowej silnika)." },
                { "en": "Check the high-current fuse for the glow plug circuit.", "pl": "Sprawdź bezpiecznik wysokoprądowy obwodu świec żarowych." },
                { "en": "Tap the relay gently or replace it with a known good one.", "pl": "Zapukaj lekko w przekaźnik lub wymień go na sprawny." }
            ],
            "is_temporary": true
        },
        "sol_glow_plug_failure": {
            "title": { "en": "Glow Plug Failure", "pl": "Awaria Świec Żarowych" },
            "description": { "en": "One or more glow plugs are burnt out or not reaching temperature.", "pl": "Jedna lub więcej świec żarowych jest spalona lub nie osiąga temperatury." },
            "steps": [
                { "en": "Use a multimeter to check continuity of each glow plug.", "pl": "Użyj multimetru, aby sprawdzić ciągłość każdej świecy żarowej." },
                { "en": "If a plug shows infinite resistance, it is burnt out and must be replaced.", "pl": "Jeśli świeca pokazuje nieskończony opór, jest spalona i musi zostać wymieniona." },
                { "en": "Replace all glow plugs as a set for consistent starting.", "pl": "Wymień wszystkie świece jako komplet dla spójnego rozruchu." }
            ],
            "is_temporary": false
        },
        "sol_battery_service_cold": {
            "title": { "en": "Battery Service / Replacement", "pl": "Serwis / Wymiana Akumulatora" },
            "description": { "en": "Batteries lose capacity in cold weather, failing to provide enough cranking amps.", "pl": "Akumulatory tracą pojemność w niskich temperaturach, nie zapewniając wystarczającego prądu rozruchowego." },
            "steps": [
                { "en": "Clean and tighten all battery terminals and engine ground connections.", "pl": "Wyczyść i dokręć wszystkie zaciski akumulatora oraz połączenia masowe silnika." },
                { "en": "Charge the battery fully using an external shore-power charger.", "pl": "Naładuj akumulator do pełna za pomocą zewnętrznej ładowarki portowej." },
                { "en": "Test battery health; if it's over 3-4 years old, replace it.", "pl": "Przetestuj stan akumulatora; jeśli ma ponad 3-4 lata, wymień go." }
            ],
            "is_temporary": true
        },
        "sol_oil_viscosity_change": {
            "title": { "en": "Oil Viscosity Too High", "pl": "Zbyt Duża Lepkość Oleju" },
            "description": { "en": "Thick oil creates too much drag for the starter motor in cold temperatures.", "pl": "Gęsty olej stwarza zbyt duże opory dla rozrusznika w niskich temperaturach." },
            "steps": [
                { "en": "Verify the current oil viscosity matches the engine manufacturer's cold-weather spec.", "pl": "Upewnij się, że obecna lepkość oleju zgadza się ze specyfikacją producenta na zimne warunki." },
                { "en": "Consider changing to a multi-grade oil like 10W40 if operating in freezing conditions.", "pl": "Rozważ zmianę na olej wielosezonowy, np. 10W40, jeśli pracujesz w warunkach mroźnych." }
            ],
            "is_temporary": false
        },
        "sol_fuel_waxing_fix": {
            "title": { "en": "Fuel Waxing / Gelation", "pl": "Parafinowanie / Żelowanie Paliwa" },
            "description": { "en": "Paraffin in diesel fuel crystallizes in cold weather, blocking filters.", "pl": "Parafina w oleju napędowym krystalizuje się w zimnie, blokując filtry." },
            "steps": [
                { "en": "Warm the fuel filters gently (e.g. with a warm cloth) to melt wax.", "pl": "Ogrzej delikatnie filtry paliwa (np. ciepłą szmatką), aby rozpuścić parafinię." },
                { "en": "Add a fuel anti-gel additive to the tank.", "pl": "Dolej do zbiornika dodatek zapobiegający żelowaniu paliwa (antyżel)." },
                { "en": "Replace fuel filters if they are completely clogged with wax.", "pl": "Wymień filtry paliwa, jeśli są całkowicie zatkane parafiną." }
            ],
            "is_temporary": true
        },
        "sol_low_compression_cold": {
            "title": { "en": "Low Compression - Mechanical Wear", "pl": "Niska Kompresja - Zużycie Mechaniczne" },
            "description": { "en": "Worn rings or valves prevent enough heat from being generated by compression to ignite fuel.", "pl": "Zużyte pierścienie lub zawory uniemożliwiają wytworzenie wystarczającej ilości ciepła przez kompresję do zapłonu paliwa." },
            "steps": [
                { "en": "Check and adjust valve clearances to manufacturer specifications.", "pl": "Sprawdź i wyreguluj luz zaworowy zgodnie ze specyfikacją producenta." },
                { "en": "Perform a professional compression test or leak-down test.", "pl": "Przeprowadź profesjonalny test kompresji lub test szczelności cylindrów." },
                { "en": "Top-end or full engine overhaul may be required if wear is excessive.", "pl": "Może być wymagany remont góry lub całego silnika, jeśli zużycie jest nadmierne." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The cold start issue is likely due to deep mechanical or complex electrical faults.", "pl": "Problem z zimnym rozruchem wynika prawdopodobnie z głębokich usterek mechanicznych lub złożonych wad elektrycznych." },
            "steps": [
                { "en": "Do not drain the battery further with repeated cranking.", "pl": "Nie rozładowuj dalej akumulatora powtarzającymi się próbami rozruchu." },
                { "en": "Contact service to investigate compression or injection pump issues.", "pl": "Skontaktuj się z serwisem, aby zbadać kwestie kompresji lub pompy wtryskowej." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_hard_start_cold"],
        "entry_conditions_conflicting": ["engine_no_start", "engine_shutdown_underway"],
        "convergence": {
            "confidence_margin_threshold": 0.3,
            "max_steps": 10,
            "active_cause_limit": 1
        },
        "priority_order": ["safety", "knockout", "elimination", "probability"]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = hardColdStartPath;
}


