/**
 * DIESEL ENGINE CORE: MILKY OIL (WATER IN OIL)
 * Focus: Condensation, heat exchanger/oil cooler leaks, and internal engine failures (head gasket).
 */

const milkyOilDiagnosticPath = {
    tree_id: "milky_oil_diagnostic",
    metadata: {
        title: { en: "Milky Oil Diagnostic (Water in Oil)", pl: "Diagnostyka Mlecznego Oleju (Woda w Oleju)" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "milky_oil_entry",
    nodes: {
        "milky_oil_entry": {
            "question": {
                "en": "Is the engine oil 'milky', 'creamy', or like 'mayonnaise' on the dipstick or oil cap?",
                "pl": "Czy olej silnikowy jest 'mleczny', 'kremowy' lub przypomina 'majonez' na bagnie lub korku wlewu?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, oil is milky/creamy", "pl": "Tak, olej jest mleczny/kremowy" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "condensation_check" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No, oil is dark but thin", "pl": "Nie, olej jest ciemny, ale rzadki" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_fuel_in_oil_check" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "condensation_check" }
                }
            ]
        },
        "condensation_check": {
            "question": {
                "en": "Has the engine been used only for very short periods (under 15 mins) recently, or has it been sitting for a long time in a cold/humid environment?",
                "pl": "Czy silnik był ostatnio używany tylko przez bardzo krótkie okresy (poniżej 15 min), lub stał długo w zimnym/wilgotnym otoczeniu?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, short runs or long storage", "pl": "Tak, krótkie biegi lub długi postój" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "coolant_level_oil_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "No, engine runs for long periods", "pl": "Nie, silnik pracuje przez długie okresy" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "coolant_level_oil_check" },
                    "probability": 0.6
                }
            ]
        },
        "coolant_level_oil_check": {
            "question": {
                "en": "Is the engine coolant level dropping without any visible external leaks?",
                "pl": "Czy poziom płynu chłodniczego spada bez żadnych widocznych wycieków zewnętrznych?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, coolant level is dropping", "pl": "Tak, poziom płynu spada" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_cooler_check" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No, coolant level is stable", "pl": "Nie, poziom płynu jest stabilny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "raw_water_oil_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot check coolant level", "pl": "Nie mogę sprawdzić poziomu płynu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "oil_cooler_check" }
                }
            ]
        },
        "oil_cooler_check": {
            "question": {
                "en": "Does your engine have a dedicated oil cooler? If so, could it be leaking internally?",
                "pl": "Czy Twój silnik ma dedykowaną chłodnicę oleju? Jeśli tak, czy może ona przeciekać wewnętrznie?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, suspect oil cooler", "pl": "Tak, podejrzewam chłodnicę oleju" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_service_oil_cooler" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "No cooler or it seems fine", "pl": "Brak chłodnicy lub wydaje się sprawna" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "head_gasket_oil_check" },
                    "probability": 0.3
                }
            ]
        },
        "raw_water_oil_check": {
            "question": {
                "en": "If coolant is stable, water could be raw water. Has the engine been 'hydrolocked' or has water entered through the exhaust recently (e.g., following a heavy storm or improper towing)?",
                "pl": "Jeśli płyn jest stabilny, woda może być zaburtowa. Czy silnik był 'zalany' (hydrolock) lub czy woda dostała się przez wydech ostatnio (np. po silnym sztormie lub złym holowaniu)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, possible water entry from exhaust", "pl": "Tak, możliwe dostanie się wody z wydechu" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_water_ingress_service" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No water entry suspected", "pl": "Brak podejrzeń o dostanie się wody" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "head_gasket_oil_check" },
                    "probability": 0.2
                }
            ]
        },
        "head_gasket_oil_check": {
            "question": {
                "en": "Are there signs of head gasket failure? (e.g., bubbles in coolant, loss of power, or overheating).",
                "pl": "Czy są oznaki awarii uszczelki pod głowicą? (np. bąbelki w płynie, utrata mocy lub przegrzewanie)."
            },
            "answers": [
                {
                    "text": { "en": "Yes, signs of head gasket failure", "pl": "Tak, oznaki awarii uszczelki" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_head_gasket_oil_service" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No other symptoms", "pl": "Brak innych objawów" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.1
                }
            ]
        }
    },
    "solutions": {
        "sol_fuel_in_oil_check": {
            "title": { "en": "Check for Fuel in Oil", "pl": "Sprawdź Paliwo w Oleju" },
            "description": { "en": "Thin, dark oil that smells of diesel indicates fuel contamination, not water.", "pl": "Rzadki, ciemny olej o zapachu diesla wskazuje na zanieczyszczenie paliwem, nie wodą." },
            "steps": [
                { "en": "Smell the oil dipstick for diesel odor.", "pl": "Powąchaj bagnet oleju pod kątem zapachu diesla." },
                { "en": "Check for rising oil level (without milkiness).", "pl": "Sprawdź, czy poziom oleju rośnie (bez zmętnienia)." },
                { "en": "Inspect the fuel lift pump diaphragm or high-pressure pump for leaks.", "pl": "Sprawdź membranę pompki paliwa lub pompę wysokiego ciśnienia pod kątem wycieków." }
            ]
        },
        "sol_service_oil_cooler": {
            "title": { "en": "Service/Replace Oil Cooler", "pl": "Serwis/Wymiana Chłodnicy Oleju" },
            "description": { "en": "Internal failure of the oil cooler is a common entry point for water into the oil system.", "pl": "Wewnętrzna awaria chłodnicy oleju jest częstym punktem wejścia wody do układu olejowego." },
            "steps": [
                { "en": "Remove the oil cooler and pressure test it.", "pl": "Zdemontuj chłodnicę oleju i przeprowadź test ciśnieniowy." },
                { "en": "Check for corrosion or pitting in the cooler tubes.", "pl": "Sprawdź pod kątem korozji lub wżerów w rurkach chłodnicy." },
                { "en": "Replace the cooler if any internal leak is found.", "pl": "Wymień chłodnicę, jeśli zostanie znaleziony jakikolwiek wyciek wewnętrzny." },
                { "en": "Flush the oil system multiple times after repair.", "pl": "Przepłucz układ olejowy wielokrotnie po naprawie." }
            ]
        },
        "sol_water_ingress_service": {
            "title": { "en": "Water Ingress from Exhaust/Siphon", "pl": "Woda z Wydechu/Syfonu" },
            "description": { "en": "Water can enter the engine via the exhaust if the siphon break fails or if the boat is improperly towed.", "pl": "Woda może dostać się do silnika przez wydech, jeśli zawór antysyfonowy zawiedzie lub łódź jest źle holowana." },
            "steps": [
                { "en": "Inspect the siphon break (vacuum breather) for proper operation.", "pl": "Sprawdź zawór antysyfonowy pod kątem prawidłowego działania." },
                { "en": "Check the water lock muffler for signs of back-filling.", "pl": "Sprawdź tłumik (water lock) pod kątem oznak cofania się wody." },
                { "en": "Immediately change oil and filters to prevent internal corrosion.", "pl": "Natychmiast wymień olej i filtry, aby zapobiec korozji wewnętrznej." }
            ]
        },
        "sol_head_gasket_oil_service": {
            "title": { "en": "Head Gasket Service (Oil Circuit)", "pl": "Serwis Uszczelki (Obieg Oleju)" },
            "description": { "en": "A failed head gasket can allow coolant to leak directly into the oil galleries.", "pl": "Uszkodzona uszczelka pod głowicą może pozwolić płynowi chłodniczemu wyciekać bezpośrednio do kanałów olejowych." },
            "steps": [
                { "en": "Perform a compression test or leak-down test.", "pl": "Przeprowadź test sprężania lub test szczelności cylindrów." },
                { "en": "Inspect the oil for signs of coolant (sweet smell/greenish tint).", "pl": "Sprawdź olej pod kątem oznak płynu (słodki zapach/zielonkawy odcień)." },
                { "en": "Head removal and replacement of the gasket is required.", "pl": "Wymagane jest zdjęcie głowicy i wymiana uszczelki." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "If obvious points fail, the issue could be a cracked block, head, or failing liner seals.", "pl": "Jeśli oczywiste punkty zawiodą, problemem może być pęknięty blok, głowica lub uszczelnienia tulei." },
            "steps": [
                { "en": "If oil is just slightly milky and level is stable, try a long run (1h+) to evaporate condensation.", "pl": "Jeśli olej jest tylko lekko mleczny a poziom stabilny, spróbuj dłuższego biegu (1h+), aby odparować kondensację." },
                { "en": "Check for cracked internal components using dye penetrant or pressure tests.", "pl": "Sprawdź pod kątem pękniętych elementów wewnętrznych używając penetrantów lub testów ciśnieniowych." },
                { "en": "Call a professional marine mechanic for a deep engine teardown.", "pl": "Wezwij profesjonalnego mechanika w celu głębokiego demontażu silnika." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = milkyOilDiagnosticPath;
}


