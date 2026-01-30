/**
 * DIESEL ENGINE CORE: FUEL STARVATION AT HIGH RPM
 * Focus: Filters, lift pump capacity, tank pickup, and return restrictions.
 */

const fuelStarvationHighRPMPath = {
    tree_id: "fuel_starvation_high_rpm",
    metadata: {
        title: { en: "Fuel Starvation at High RPM Diagnostic", pl: "Diagnostyka Głodu Paliwowego na Wysokich Obrotach" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "fuel_starvation_entry",
    nodes: {
        "fuel_starvation_entry": {
            "question": {
                "en": "Does the engine run smoothly at idle and low speeds, but stumble, lose power, or die when you try to reach high RPM/cruising speed?",
                "pl": "Czy silnik pracuje płynnie na jałowym i niskich prędkościach, ale krztusi się, traci moc lub gaśnie przy próbie osiągnięcia wysokich obrotów/prędkości przelotowej?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, only at high RPM", "pl": "Tak, tylko na wysokich obrotach" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "filter_clog_check" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No, it stumbles at all speeds", "pl": "Nie, krztusi się przy każdej prędkości" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_refer_general_fuel_issue" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "filter_clog_check" }
                }
            ]
        },
        "filter_clog_check": {
            "question": {
                "en": "When did you last change the fuel filters? Is there visible dirt or water in the primary filter (water separator) bowl?",
                "pl": "Kiedy ostatnio wymieniałeś filtry paliwa? Czy w odstojniku filtra głównego (separatora wody) widać brud lub wodę?"
            },
            "answers": [
                {
                    "text": { "en": "Visible dirt/water or old filters", "pl": "Widoczny brud/woda lub stare filtry" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_filter_service_high_rpm" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Filters are new and bowl is clean", "pl": "Filtry są nowe, a odstojnik czysty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "tank_pickup_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot check filters now", "pl": "Nie mogę teraz sprawdzić filtrów" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "tank_pickup_check" }
                }
            ]
        },
        "tank_pickup_check": {
            "question": {
                "en": "Is the fuel tank vent clear? Could there be debris (like a 'diesel bug' slime) blocking the pickup tube inside the tank?",
                "pl": "Czy odpowietrznik zbiornika jest drożny? Czy wewnątrz zbiornika mogą być zanieczyszczenia (np. szlam 'diesel bug') blokujące rurkę ssącą?"
            },
            "answers": [
                {
                    "text": { "en": "Suspect tank/vent blockage", "pl": "Podejrzewam blokadę zbiornika/odpowietrznika" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_tank_pickup_service" },
                    "probability": 0.6
                },
                {
                    "text": { "en": "Vent is clear and tank is clean", "pl": "Odpowietrznik drożny, zbiornik czysty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "lift_pump_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot access tank/vent", "pl": "Nie mam dostępu do zbiornika/odpowietrznika" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "lift_pump_check" }
                }
            ]
        },
        "lift_pump_check": {
            "question": {
                "en": "Check the fuel lift pump. Does it provide enough flow? Try pumping the manual primer while the engine is struggling—does it help?",
                "pl": "Sprawdź pompkę paliwa (lift pump). Czy zapewnia wystarczający przepływ? Spróbuj pompować ręcznie, gdy silnik przerywa — czy to pomaga?"
            },
            "answers": [
                {
                    "text": { "en": "Manual pumping helps", "pl": "Ręczne pompowanie pomaga" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_lift_pump_replace_starve" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Manual pumping doesn't help", "pl": "Ręczne pompowanie nie pomaga" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "return_line_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot pump while running", "pl": "Nie mogę pompować podczas pracy" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "return_line_check" }
                }
            ]
        },
        "return_line_check": {
            "question": {
                "en": "Is the fuel return line restricted? A blocked return can cause backpressure and overheating of the fuel system.",
                "pl": "Czy linia powrotna paliwa jest ograniczona? Zablokowany powrót może powodować ciśnienie wsteczne i przegrzewanie układu paliwowego."
            },
            "answers": [
                {
                    "text": { "en": "Return line is restricted/kinked", "pl": "Linia powrotna jest ograniczona/zagięta" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_return_line_clear" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Return line is clear", "pl": "Linia powrotna jest drożna" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Cannot check return line now", "pl": "Nie mogę teraz sprawdzić linii powrotnej" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_filter_service_high_rpm": {
            "title": { "en": "Full Fuel Filter Service", "pl": "Pełny Serwis Filtrów Paliwa" },
            "description": { "en": "Partially clogged filters may allow enough fuel for idle but restrict the high flow required for cruising speed.", "pl": "Częściowo zapchane filtry mogą przepuszczać dość paliwa na jałowym, ale ograniczać wysoki przepływ wymagany przy prędkości przelotowej." },
            "steps": [
                { "en": "Replace the primary (separator) filter element.", "pl": "Wymień wkład filtra głównego (separatora)." },
                { "en": "Replace the secondary filter on the engine block.", "pl": "Wymień filtr pomocniczy na bloku silnika." },
                { "en": "Inspect the fuel for 'diesel bug' (black slime) and treat the tank if found.", "pl": "Sprawdź paliwo pod kątem 'diesel bug' (czarny szlam) i zastosuj preparat do zbiornika, jeśli go znajdziesz." }
            ]
        },
        "sol_tank_pickup_service": {
            "title": { "en": "Tank Pickup and Vent Service", "pl": "Serwis Ssaka i Odpowietrznika Zbiornika" },
            "description": { "en": "A blocked vent creates a vacuum in the tank, while a blocked pickup tube physically stops fuel flow.", "pl": "Zablokowany odpowietrznik tworzy podciśnienie w zbiorniku, a zablokowana rurka ssąca fizycznie zatrzymuje przepływ paliwa." },
            "steps": [
                { "en": "Ensure the fuel tank vent is not blocked by insects or salt.", "pl": "Upewnij się, że odpowietrznik zbiornika nie jest zablokowany przez owady lub sól." },
                { "en": "Blow low-pressure air back through the fuel line into the tank to clear the pickup screen.", "pl": "Przedmuchaj linię paliwową powietrzem o niskim ciśnieniu z powrotem do zbiornika, aby oczyścić sitko ssaka." },
                { "en": "If the problem returns, the tank must be cleaned of debris/sludge.", "pl": "Jeśli problem powróci, zbiornik musi zostać oczyszczony z osadów/szlamu." }
            ]
        },
        "sol_lift_pump_replace_starve": {
            "title": { "en": "Replace Fuel Lift Pump", "pl": "Wymień Pompkę Paliwa" },
            "description": { "en": "The mechanical or electric lift pump is weak and cannot maintain pressure under high demand.", "pl": "Mechaniczna lub elektryczna pompka paliwa jest słaba i nie może utrzymać ciśnienia przy wysokim zapotrzebowaniu." },
            "steps": [
                { "en": "Test the pump output volume into a container (if safe).", "pl": "Przetestuj wydajność pompy do pojemnika (jeśli to bezpieczne)." },
                { "en": "Replace the pump if flow is intermittent or weak.", "pl": "Wymień pompę, jeśli przepływ jest przerywany lub słaby." },
                { "en": "Check for air leaks on the suction side of the pump.", "pl": "Sprawdź pod kątem nieszczelności powietrznych po stronie ssącej pompy." }
            ]
        },
        "sol_return_line_clear": {
            "title": { "en": "Clear Fuel Return Line", "pl": "Udrożnij Linię Powrotną Paliwa" },
            "description": { "en": "A restricted return line prevents the fuel system from maintaining the correct pressure differential.", "pl": "Ograniczona linia powrotna uniemożliwia układowi paliwowemu utrzymanie prawidłowej różnicy ciśnień." },
            "steps": [
                { "en": "Inspect the return hose for kinks or internal collapses.", "pl": "Sprawdź wąż powrotny pod kątem zagięć lub rozwarstwień wewnętrznych." },
                { "en": "Ensure the return fitting at the tank is not blocked.", "pl": "Upewnij się, że króciec powrotny przy zbiorniku nie jest zablokowany." }
            ]
        },
        "sol_refer_general_fuel_issue": {
            "title": { "en": "Refer to General Fuel Diagnostics", "pl": "Przejdź do Ogólnej Diagnostyki Paliwa" },
            "description": { "en": "Stumbling at all speeds is likely air in the fuel or a more severe delivery failure.", "pl": "Krztuszenie się przy każdej prędkości to prawdopodobnie zapowietrzenie lub poważniejsza awaria zasilania." },
            "steps": [
                { "en": "Check for air leaks in fuel lines.", "pl": "Sprawdź nieszczelności (powietrze) w liniach paliwowych." },
                { "en": "Bleed the entire fuel system.", "pl": "Odpowietrz cały układ paliwowy." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "If supply lines are clear, the issue may be internal to the high-pressure injection pump or injectors.", "pl": "Jeśli linie zasilające są drożne, problem może leżeć wewnątrz pompy wtryskowej lub wtryskiwaczy." },
            "steps": [
                { "en": "Perform a vacuum test on the fuel supply line.", "pl": "Przeprowadź test podciśnienia na linii zasilającej." },
                { "en": "Call a professional for high-pressure pump diagnostics.", "pl": "Wezwij profesjonalistę do diagnostyki pompy wysokiego ciśnienia." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = fuelStarvationHighRPMPath;
}


