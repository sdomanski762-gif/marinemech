/**
 * DIESEL ENGINE CORE: BLACK SMOKE UNDER LOAD
 * Focus: Air restriction, turbo performance, injector faults, over-fueling/overload.
 */

const blackSmokeUnderLoadPath = {
    tree_id: "black_smoke_under_load",
    metadata: {
        title: { en: "Black Smoke Under Load Diagnostic", pl: "Diagnostyka Czarnego Dymu Pod Obciążeniem" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "black_smoke_entry",
    nodes: {
        "black_smoke_entry": {
            "question": {
                "en": "Is the engine producing thick black smoke specifically when under load (in gear, moving)?",
                "pl": "Czy silnik dymi gęstym, czarnym dymem konkretnie pod obciążeniem (na biegu, podczas płynięcia)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, black smoke under load", "pl": "Tak, czarny dym pod obciążeniem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "air_restriction_check" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No, it smokes even at idle", "pl": "Nie, dymi nawet na biegu jałowym" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "injector_fault_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "air_restriction_check" },
                    "probability": 0.1
                }
            ]
        },
        "air_restriction_check": {
            "question": {
                "en": "Black smoke usually means too much fuel or too little air. Check the air filter and intake. Is it restricted?",
                "pl": "Czarny dym zazwyczaj oznacza za dużo paliwa lub za mało powietrza. Sprawdź filtr powietrza i dolot. Czy jest ograniczony?"
            },
            "answers": [
                {
                    "text": { "en": "Filter is dirty / Intake blocked", "pl": "Filtr jest brudny / Dolot zablokowany" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_air_filter_replace" },
                    "probability": 0.6
                },
                {
                    "text": { "en": "Intake is clear", "pl": "Dolot jest drożny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "turbo_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot check filter now", "pl": "Nie mogę teraz sprawdzić filtra" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "turbo_check" }
                }
            ]
        },
        "turbo_check": {
            "question": {
                "en": "If equipped with a turbo: Do you hear hissing (boost leak) or see oil in the hoses? Does the turbo spin freely?",
                "pl": "Jeśli silnik ma turbo: Czy słyszysz syczenie (wyciek doładowania) lub widzisz olej w wężach? Czy turbina kręci się swobodnie?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, found boost leak or seized turbo", "pl": "Tak, znaleziono wyciek lub zablokowane turbo" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_turbo_service" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "No turbo or it seems fine", "pl": "Brak turbo lub wydaje się sprawne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "overload_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot access turbo", "pl": "Nie mam dostępu do turbo" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "overload_check" }
                }
            ]
        },
        "overload_check": {
            "question": {
                "en": "Is the engine overloaded? Check for a fouled propeller/hull or if the propeller pitch is too aggressive.",
                "pl": "Czy silnik jest przeciążony? Sprawdź, czy śruba/kadłub nie są porośnięte lub czy skok śruby nie jest zbyt duży."
            },
            "answers": [
                {
                    "text": { "en": "Propeller/Hull is fouled", "pl": "Śruba/Kadłub są porośnięte" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clean_bottom" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Everything is clean", "pl": "Wszystko jest czyste" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "injector_fault_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot check underwater", "pl": "Nie mogę sprawdzić pod wodą" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "injector_fault_check" }
                }
            ]
        },
        "injector_fault_check": {
            "question": {
                "en": "Could it be an injector fault? Look for 'dribbling' (unburnt fuel), knocking sounds, or uneven running.",
                "pl": "Czy to może być awaria wtryskiwacza? Szukaj oznak 'lejących' wtrysków, stukania lub nierównej pracy."
            },
            "answers": [
                {
                    "text": { "en": "Suspect injector/timing issue", "pl": "Podejrzewam problem z wtryskiem/kątem wtrysku" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_injector_service" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Injectors seem fine", "pl": "Wtryskiwacze wydają się sprawne" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot diagnose injectors here", "pl": "Nie mogę zdiagnozować wtrysków na miejscu" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_air_filter_replace": {
            "title": { "en": "Replace Air Filter / Clear Intake", "pl": "Wymień Filtr Powietrza / Udrożnij Dolot" },
            "description": { "en": "Engine is starving for air, leading to incomplete combustion of fuel.", "pl": "Silnik ma za mało powietrza, co prowadzi do niepełnego spalania paliwa." },
            "steps": [
                { "en": "Remove and inspect the air filter element.", "pl": "Zdejmij i sprawdź wkład filtra powietrza." },
                { "en": "Clean the filter housing and check for intake obstructions.", "pl": "Wyczyść obudowę filtra i sprawdź, czy wlot nie jest zablokowany." },
                { "en": "Replace the filter if it's dirty or oily.", "pl": "Wymień filtr, jeśli jest brudny lub zaolejony." }
            ]
        },
        "sol_turbo_service": {
            "title": { "en": "Turbocharger Repair", "pl": "Naprawa Turbosprężarki" },
            "description": { "en": "Turbocharger is not providing enough boost pressure for the amount of fuel being injected.", "pl": "Turbosprężarka nie zapewnia wystarczającego ciśnienia doładowania dla ilości wtryskiwanego paliwa." },
            "steps": [
                { "en": "Inspect all turbo hoses and intercooler for leaks (hissing).", "pl": "Sprawdź wszystkie węże turbo i intercooler pod kątem nieszczelności (syczenia)." },
                { "en": "Ensure the wastegate (if present) is moving freely and not stuck open.", "pl": "Upewnij się, że zawór wastegate (jeśli jest) porusza się swobodnie i nie utknął w pozycji otwartej." },
                { "en": "Check the turbo impeller for damage or excessive play.", "pl": "Sprawdź wirnik turbo pod kątem uszkodzeń lub nadmiernego luzu." }
            ]
        },
        "sol_clean_bottom": {
            "title": { "en": "Clean Propeller and Hull", "pl": "Oczyść Śrubę i Kadłub" },
            "description": { "en": "Heavy growth increases drag significantly, overloading the engine and causing it to smoke.", "pl": "Silne porosty znacznie zwiększają opór, przeciążając silnik i powodując dymienie." },
            "steps": [
                { "en": "Scrape barnacles and growth from the propeller blades.", "pl": "Zeskrob pąkle i porosty z łopat śruby napędowej." },
                { "en": "Ensure the hull is clean of heavy marine growth.", "pl": "Upewnij się, że kadłub jest czysty od silnych porostów morskich." },
                { "en": "Check for ropes or nets tangled around the shaft.", "pl": "Sprawdź, czy na wale nie ma zaplątanych lin lub sieci." }
            ]
        },
        "sol_injector_service": {
            "title": { "en": "Service Fuel Injectors", "pl": "Serwis Wtryskiwaczy Paliwa" },
            "description": { "en": "Faulty injectors may be 'dribbling' fuel or opening at the wrong pressure/time.", "pl": "Wadliwe wtryskiwacze mogą 'lać' paliwo lub otwierać się przy niewłaściwym ciśnieniu/czasie." },
            "steps": [
                { "en": "Remove injectors and have them professionally tested (pop test).", "pl": "Zdemontuj wtryskiwacze i oddaj je do profesjonalnego sprawdzenia." },
                { "en": "Check fuel injection pump timing.", "pl": "Sprawdź kąt wtrysku pompy paliwowej." },
                { "en": "Use a fuel additive to clean the system (temporary measure).", "pl": "Użyj dodatku do paliwa, aby przeczyścić układ (środek tymczasowy)." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Assistance Required", "pl": "Wymagana Pomoc Eksperta" },
            "description": { "en": "The issue appears to be complex and requires professional tools or deep engine knowledge.", "pl": "Problem wydaje się złożony i wymaga profesjonalnych narzędzi lub głębokiej wiedzy o silniku." },
            "steps": [
                { "en": "Contact a qualified marine mechanic.", "pl": "Skontaktuj się z wykwalifikowanym mechanikiem morskim." },
                { "en": "Provide the diagnostic steps already taken to the mechanic.", "pl": "Przekaż mechanikowi informacje o wykonanych już krokach diagnostycznych." },
                { "en": "Avoid running the engine further to prevent potential damage.", "pl": "Unikaj dalszej pracy silnika, aby zapobiec potencjalnym uszkodzeniom." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = blackSmokeUnderLoadPath;
}


