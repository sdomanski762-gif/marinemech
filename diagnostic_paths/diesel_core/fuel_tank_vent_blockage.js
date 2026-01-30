/**
 * DIESEL ENGINE CORE: FUEL TANK VENT BLOCKAGE
 * Focus: Vacuum symptoms, tank deformation, and temporary vent tests.
 */

const fuelTankVentBlockagePath = {
    tree_id: "fuel_tank_vent_blockage",
    metadata: {
        title: { en: "Fuel Tank Vent Blockage Diagnostic", pl: "Diagnostyka Zablokowanego Odpowietrznika Zbiornika" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "vent_blockage_entry",
    nodes: {
        "vent_blockage_entry": {
            "question": {
                "en": "Does the engine start fine but gradually lose power and stall after 15-40 minutes of running?",
                "pl": "Czy silnik odpala bez problemu, ale stopniowo traci moc i gaśnie po 15-40 minutach pracy?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, stalls after a period of running", "pl": "Tak, gaśnie po pewnym czasie pracy" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "vacuum_hiss_check" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No, it stalls immediately or at random", "pl": "Nie, gaśnie natychmiast lub losowo" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_refer_general_fuel_starve" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "vacuum_hiss_check" }
                }
            ]
        },
        "vacuum_hiss_check": {
            "question": {
                "en": "Carefully open the fuel filler cap immediately after the engine stalls. Do you hear a strong 'hiss' of air being sucked into the tank?",
                "pl": "Ostrożnie otwórz korek wlewu paliwa natychmiast po zgaśnięciu silnika. Czy słyszysz wyraźne syczenie powietrza zasysanego do zbiornika?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, heard a strong hiss", "pl": "Tak, słychać było silne syczenie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "tank_deformation_check" },
                    "probability": 0.9,
                    "knockout": "others"
                },
                {
                    "text": { "en": "No hiss heard", "pl": "Nie słychać syczenia" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "temporary_cap_test" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot check (Cap is stuck)", "pl": "Nie mogę sprawdzić (Korek utknął)" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "tank_deformation_check" }
                }
            ]
        },
        "tank_deformation_check": {
            "question": {
                "en": "Look at the fuel tank walls (if visible). Do the walls appear 'sucked in' or deformed inward?",
                "pl": "Spójrz na ścianki zbiornika paliwa (jeśli są widoczne). Czy ścianki wyglądają na 'zassane' lub odkształcone do wewnątrz?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, tank is deformed", "pl": "Tak, zbiornik jest odkształcony" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clear_vent_blockage" },
                    "probability": 0.95,
                    "knockout": "others"
                },
                {
                    "text": { "en": "Tank looks normal", "pl": "Zbiornik wygląda normalnie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "temporary_cap_test" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot see the tank", "pl": "Nie widzę zbiornika" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "temporary_cap_test" }
                }
            ]
        },
        "temporary_cap_test": {
            "question": {
                "en": "Verification Test: Loosen the fuel filler cap (or leave it slightly open) and run the engine. Does the problem disappear?",
                "pl": "Test weryfikacyjny: Poluzuj korek wlewu paliwa (lub zostaw go lekko otwartym) i uruchom silnik. Czy problem znika?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, it runs fine with loose cap", "pl": "Tak, działa dobrze z luźnym korkiem" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clear_vent_blockage" },
                    "probability": 1.0,
                    "knockout": "others"
                },
                {
                    "text": { "en": "No, it still stalls with loose cap", "pl": "Nie, nadal gaśnie z luźnym korkiem" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_refer_internal_fuel_clog" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot run test safely", "pl": "Nie mogę bezpiecznie przeprowadzić testu" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_clear_vent_blockage": {
            "title": { "en": "Clear Fuel Tank Vent and Line", "pl": "Udrożnij Odpowietrznik i Linię Zbiornika" },
            "description": { "en": "The tank vent is blocked, creating a vacuum that prevents the pump from drawing fuel.", "pl": "Odpowietrznik zbiornika jest zablokowany, co tworzy podciśnienie uniemożliwiające pompie pobieranie paliwa." },
            "steps": [
                { "en": "Locate the vent fitting on the outside of the hull.", "pl": "Zlokalizuj króciec odpowietrznika na zewnątrz kadłuba." },
                { "en": "Check for insect nests (wasps), salt buildup, or wax blocking the screen.", "pl": "Sprawdź pod kątem gniazd owadów (os), osadów soli lub wosku blokujących siatkę." },
                { "en": "Inspect the vent hose for kinks, water traps (sags), or internal collapses.", "pl": "Sprawdź wąż odpowietrzający pod kątem zagięć, syfonów wodnych lub rozwarstwień." },
                { "en": "Disconnect the hose at the tank and blow low-pressure air through it to ensure it is clear.", "pl": "Odłącz wąż przy zbiorniku i przedmuchaj go powietrzem o niskim ciśnieniu, aby upewnić się, że jest drożny." }
            ]
        },
        "sol_refer_general_fuel_starve": {
            "title": { "en": "Refer to General Fuel Starvation", "pl": "Przejdź do Ogólnego Głodu Paliwowego" },
            "description": { "en": "Immediate stalling points to air in the lines or a total blockage, not a vacuum issue.", "pl": "Natychmiastowe gaśnięcie wskazuje na zapowietrzenie lub całkowitą blokadę, a nie problem z podciśnieniem." },
            "steps": [
                { "en": "Check fuel filters and lift pump operation.", "pl": "Sprawdź filtry paliwa i działanie pompki." }
            ]
        },
        "sol_refer_internal_fuel_clog": {
            "title": { "en": "Internal Fuel Clog Suspected", "pl": "Podejrzenie Wewnętrznej Blokady Paliwa" },
            "description": { "en": "Since the loose cap didn't help, the blockage is likely in the pickup tube or filters.", "pl": "Skoro luźny korek nie pomógł, blokada prawdopodobnie znajduje się w rurce ssącej lub filtrach." },
            "steps": [
                { "en": "Check the fuel tank pickup screen for 'diesel bug' slime.", "pl": "Sprawdź sitko ssaka w zbiorniku pod kątem szlamu 'diesel bug'." },
                { "en": "Replace all fuel filters.", "pl": "Wymień wszystkie filtry paliwa." }
            ]
        },
        "expert_required": {
            "title": { "en": "Complex Tank Issue - Expert Required", "pl": "Złożony Problem ze Zbiornikiem - Wymagany Ekspert" },
            "description": { "en": "Cannot confirm vent issue safely. Requires mechanical inspection of the tank system.", "pl": "Nie można bezpiecznie potwierdzić problemu z odpowietrznikiem. Wymagana inspekcja mechaniczna układu." },
            "steps": [
                { "en": "Call a marine mechanic to inspect the fuel system integrity.", "pl": "Wezwij mechanika w celu sprawdzenia szczelności i drożności układu paliwowego." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = fuelTankVentBlockagePath;
}


