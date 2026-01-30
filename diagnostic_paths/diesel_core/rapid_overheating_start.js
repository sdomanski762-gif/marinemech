/**
 * DIESEL ENGINE CORE: RAPID OVERHEATING IMMEDIATELY AFTER START
 * Focus: Raw water flow, seacocks, pump failure, and airlocks.
 */

const rapidOverheatingStartPath = {
    tree_id: "rapid_overheating_start",
    metadata: {
        title: { en: "Rapid Overheating After Start Diagnostic", pl: "Diagnostyka Szybkiego Przegrzewania po Starcie" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "overheat_immediate_entry",
    nodes: {
        "overheat_immediate_entry": {
            "question": {
                "en": "Does the engine temperature rise rapidly within 1-3 minutes of starting, or is there an immediate high temp alarm?",
                "pl": "Czy temperatura silnika rośnie gwałtownie w ciągu 1-3 minut od startu, czy występuje natychmiastowy alarm wysokiej temperatury?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, temperature rises almost immediately", "pl": "Tak, temperatura rośnie niemal natychmiast" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "seacock_check" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No, it takes 10+ minutes or only under load", "pl": "Nie, zajmuje to ponad 10 minut lub tylko pod obciążeniem" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_refer_load_overheat" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "seacock_check" },
                    "probability": 0.1
                }
            ]
        },
        "seacock_check": {
            "question": {
                "en": "Is the engine's raw water intake seacock (valve) fully OPEN?",
                "pl": "Czy zawór denny (seacock) wlotu wody zaburtowej jest w pełni OTWARTY?"
            },
            "answers": [
                {
                    "text": { "en": "Valve was closed", "pl": "Zawór był zamknięty" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_open_seacock" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Valve is open", "pl": "Zawór jest otwarty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_water_check" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Cannot find the seacock", "pl": "Nie mogę znaleźć zaworu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "exhaust_water_check" }
                }
            ]
        },
        "exhaust_water_check": {
            "question": {
                "en": "Is there water coming out of the exhaust with the cooling water stream?",
                "pl": "Czy woda wypływa z wydechu razem ze strumieniem chłodzącym?"
            },
            "answers": [
                {
                    "text": { "en": "No water or very weak flow", "pl": "Brak wody lub bardzo słaby przepływ" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "strainer_check" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Water flow is strong", "pl": "Przepływ wody jest silny" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "internal_cooling_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot see exhaust", "pl": "Nie widzę wydechu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "strainer_check" }
                }
            ]
        },
        "strainer_check": {
            "question": {
                "en": "Check the sea strainer. Is it clogged with debris, plastic, or seaweed?",
                "pl": "Sprawdź filtr wody zaburtowej (strainer). Czy jest zapchany śmieciami, plastikiem lub wodorostami?"
            },
            "answers": [
                {
                    "text": { "en": "Strainer is clogged", "pl": "Filtr jest zapchany" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clean_strainer" },
                    "probability": 0.6
                },
                {
                    "text": { "en": "Strainer is clean", "pl": "Filtr jest czysty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "impeller_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot open strainer", "pl": "Nie mogę otworzyć filtra" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "impeller_check" }
                }
            ]
        },
        "impeller_check": {
            "question": {
                "en": "Inspect the raw water pump impeller. Are any vanes broken or is it spinning on the shaft?",
                "pl": "Sprawdź wirnik (impeller) pompy wody zaburtowej. Czy łopatki są połamane lub czy obraca się na wale?"
            },
            "answers": [
                {
                    "text": { "en": "Impeller is damaged", "pl": "Wirnik jest uszkodzony" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_replace_impeller" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Impeller is fine", "pl": "Wirnik jest sprawny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "airlock_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot access pump", "pl": "Nie mam dostępu do pompy" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "airlock_check" }
                }
            ]
        },
        "airlock_check": {
            "question": {
                "en": "Could there be an airlock? Has the boat been recently hauled out or has the strainer been opened?",
                "pl": "Czy może być poduszka powietrzna (airlock)? Czy łódź była ostatnio wyciągana z wody lub czy filtr był otwierany?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, recently hauled or maintained", "pl": "Tak, niedawno wyciągana lub serwisowana" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_bleed_cooling" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No maintenance recently", "pl": "Brak niedawnych prac" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        },
        "internal_cooling_check": {
            "question": {
                "en": "Water flow is OK, but engine still overheats. Check internal coolant level. Is the header tank full?",
                "pl": "Przepływ wody jest OK, ale silnik nadal się grzeje. Sprawdź poziom płynu chłodniczego. Czy zbiornik wyrównawczy jest pełny?"
            },
            "answers": [
                {
                    "text": { "en": "Coolant is low", "pl": "Poziom płynu jest niski" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fill_coolant" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Coolant is full", "pl": "Poziom płynu jest prawidłowy" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot check coolant (Hot!)", "pl": "Nie mogę sprawdzić płynu (Gorący!)" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_open_seacock": {
            "title": { "en": "Open Raw Water Seacock", "pl": "Otwórz Zawór Wlotowy" },
            "description": { "en": "The engine cannot draw cooling water because the intake valve is closed.", "pl": "Silnik nie może pobierać wody chłodzącej, ponieważ zawór wlotowy jest zamknięty." },
            "steps": [
                { "en": "Locate the raw water intake seacock.", "pl": "Zlokalizuj zawór denny wlotu wody zaburtowej." },
                { "en": "Turn the handle so it is parallel to the hose (Open position).", "pl": "Ustaw rączkę równolegle do węża (pozycja otwarta)." },
                { "en": "Check for water flow at the exhaust after starting.", "pl": "Sprawdź wypływ wody z wydechu po uruchomieniu." }
            ]
        },
        "sol_clean_strainer": {
            "title": { "en": "Clean Sea Strainer", "pl": "Wyczyść Filtr Wody Zaburtowej" },
            "description": { "en": "The flow of raw water is blocked by debris in the strainer basket.", "pl": "Przepływ wody zaburtowej jest zablokowany przez zanieczyszczenia w koszu filtra." },
            "steps": [
                { "en": "Close the seacock to prevent flooding.", "pl": "Zamknij zawór denny, aby uniknąć zalania." },
                { "en": "Open the strainer lid and remove the basket.", "pl": "Otwórz pokrywę filtra i wyjmij koszyk." },
                { "en": "Empty debris and rinse the basket.", "pl": "Opróżnij zanieczyszczenia i opłucz koszyk." },
                { "en": "Reinstall, check the seal, and OPEN the seacock.", "pl": "Zamontuj z powrotem, sprawdź uszczelkę i OTWÓRZ zawór denny." }
            ]
        },
        "sol_replace_impeller": {
            "title": { "en": "Replace Water Pump Impeller", "pl": "Wymień Wirnik Pompy Wody" },
            "description": { "en": "The rubber impeller is damaged and cannot pump water to the engine.", "pl": "Gumowy wirnik jest uszkodzony i nie może pompować wody do silnika." },
            "steps": [
                { "en": "Close the seacock.", "pl": "Zamknij zawór denny." },
                { "en": "Remove the water pump cover.", "pl": "Zdejmij pokrywę pompy wody." },
                { "en": "Pull out the old impeller and check for missing vanes.", "pl": "Wyciągnij stary wirnik i sprawdź, czy nie brakuje łopatek." },
                { "en": "If vanes are missing, they MUST be found in the heat exchanger.", "pl": "Jeśli brakuje łopatek, MUSZĄ zostać odnalezione w wymienniku ciepła." },
                { "en": "Install new impeller with a bit of lubricant.", "pl": "Zainstaluj nowy wirnik używając odrobiny smaru." }
            ]
        },
        "sol_bleed_cooling": {
            "title": { "en": "Bleed Cooling System (Airlock)", "pl": "Odpowietrz Układ Chłodzenia" },
            "description": { "en": "Air is trapped in the pump or hoses, preventing water from being sucked in.", "pl": "Powietrze utknęło w pompie lub wężach, uniemożliwiając zassanie wody." },
            "steps": [
                { "en": "Ensure seacock is open.", "pl": "Upewnij się, że zawór denny jest otwarty." },
                { "en": "Slightly loosen the strainer lid until water enters, then tighten.", "pl": "Lekko poluzuj pokrywę filtra, aż wpłynie woda, a następnie dokręć." },
                { "en": "Alternatively, loosen the intake hose at the pump to let air out.", "pl": "Ewentualnie poluzuj wąż wlotowy przy pompie, aby wypuścić powietrze." },
                { "en": "Start engine and check for water flow.", "pl": "Uruchom silnik i sprawdź przepływ wody." }
            ]
        },
        "sol_fill_coolant": {
            "title": { "en": "Fill Internal Coolant", "pl": "Uzupełnij Płyn Chłodniczy" },
            "description": { "en": "The internal (fresh water) cooling circuit is low on fluid.", "pl": "W wewnętrznym obiegu chłodzenia (słodka woda) jest za mało płynu." },
            "steps": [
                { "en": "WAIT for the engine to cool down.", "pl": "CZEKAJ, aż silnik ostygnie." },
                { "en": "Open the header tank cap slowly.", "pl": "Powoli otwórz korek zbiornika wyrównawczego." },
                { "en": "Top up with appropriate coolant mix (50/50 water/antifreeze).", "pl": "Uzupełnij odpowiednią mieszanką (50/50 woda/płyn chłodniczy)." },
                { "en": "Check for leaks in hoses or the heat exchanger.", "pl": "Sprawdź nieszczelności w wężach lub wymienniku ciepła." }
            ]
        },
        "sol_refer_load_overheat": {
            "title": { "en": "Refer to Load Overheating", "pl": "Przejdź do Przegrzewania pod Obciążeniem" },
            "description": { "en": "Gradual overheating is usually related to heat exchanger efficiency or load.", "pl": "Stopniowe przegrzewanie zazwyczaj wiąże się z wydajnością wymiennika lub obciążeniem." },
            "steps": [
                { "en": "Search for 'Overheating under load' diagnostic path.", "pl": "Szukaj ścieżki diagnostycznej 'Przegrzewanie pod obciążeniem'." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "Basic checks failed. Potential issues: Thermostat, Heat Exchanger blockage, or Head Gasket.", "pl": "Podstawowe sprawdzenia zawiodły. Możliwe problemy: Termostat, zapchany wymiennik lub uszczelka pod głowicą." },
            "steps": [
                { "en": "Check thermostat operation (requires removal).", "pl": "Sprawdź działanie termostatu (wymaga demontażu)." },
                { "en": "Inspect heat exchanger tubes for scale or impeller bits.", "pl": "Sprawdź rurki wymiennika pod kątem kamienia lub kawałków wirnika." },
                { "en": "Call a mechanic for a pressure test.", "pl": "Wezwij mechanika w celu przeprowadzenia testu ciśnieniowego." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = rapidOverheatingStartPath;
}


