/**
 * DIESEL ENGINE CORE: SUSPECTED HYDROLOCK
 * Focus: Water ingress paths, exhaust backflow, and immediate safety actions.
 * WARNING: Hydrolock is a critical emergency.
 */

const suspectedHydrolockPath = {
    tree_id: "suspected_hydrolock",
    metadata: {
        title: { en: "Suspected Hydrolock Diagnostic", pl: "Diagnostyka Podejrzenia Blokady Hydraulicznej (Hydrolock)" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "hydrolock_safety_entry",
    nodes: {
        "hydrolock_safety_entry": {
            "question": {
                "en": "CRITICAL: Does the engine refuse to turn over with a solid 'clunk' sound, or did it stop suddenly while running with a mechanical thud?",
                "pl": "KRYTYCZNE: Czy silnik odmawia obrotu z wyraźnym metalicznym stuknięciem, czy zatrzymał się nagle podczas pracy z mechanicznym uderzeniem?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, solid 'clunk' / sudden stop", "pl": "Tak, głuche stuknięcie / nagłe zatrzymanie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "starter_forcing_check" },
                    "probability": 1.0,
                    "safety_stop": true
                },
                {
                    "text": { "en": "No, it turns but won't start", "pl": "Nie, kręci ale nie zapala" },
                    "type": "exclude",
                    "next": { "type": "tree", "id": "engine_no_start" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "starter_forcing_check" }
                }
            ]
        },
        "starter_forcing_check": {
            "question": {
                "en": "STOP! Have you tried to force the starter multiple times or tow-start the boat?",
                "pl": "STOP! Czy próbowałeś wielokrotnie wymuszać rozruch lub odpalać łódź 'na zaciąg' (holowanie)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, I tried to force it", "pl": "Tak, próbowałem wymusić" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_milkiness_check" },
                    "probability": 0.8,
                    "note": { "en": "Forcing a hydrolocked engine can bend connecting rods.", "pl": "Wymuszanie pracy zablokowanego silnika może zgiąć korbowody." }
                },
                {
                    "text": { "en": "No, I stopped immediately", "pl": "Nie, natychmiast przestałem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "oil_milkiness_check" },
                    "probability": 0.2
                }
            ]
        },
        "oil_milkiness_check": {
            "question": {
                "en": "Check the oil dipstick. Is the oil milky, or is the level significantly higher than normal?",
                "pl": "Sprawdź bagnet oleju. Czy olej jest mleczny, lub czy poziom jest znacznie wyższy niż zwykle?"
            },
            "answers": [
                {
                    "text": { "en": "Oil is milky / Level high", "pl": "Olej jest mleczny / Wysoki poziom" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_backflow_check" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Oil looks normal", "pl": "Olej wygląda normalnie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_backflow_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot check oil now", "pl": "Nie mogę teraz sprawdzić oleju" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "exhaust_backflow_check" }
                }
            ]
        },
        "exhaust_backflow_check": {
            "question": {
                "en": "Could water have entered via the exhaust? Was the engine cranked for a long time without starting, or was the boat towed at high speed without closing the seacock?",
                "pl": "Czy woda mogła dostać się przez wydech? Czy silnik był długo kręcony bez odpalenia, lub czy łódź była holowana z dużą prędkością bez zamknięcia zaworu dennego?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, long cranking or towing", "pl": "Tak, długie kręcenie lub holowanie" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_exhaust_ingress_recovery" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No recent towing/cranking", "pl": "Brak niedawnego holowania/kręcenia" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "siphon_break_check" },
                    "probability": 0.2
                }
            ]
        },
        "siphon_break_check": {
            "question": {
                "en": "Check the siphon break (vacuum breather) valve. Is it stuck closed or salt-encrusted?",
                "pl": "Sprawdź zawór antysyfonowy (odpowietrznik próżniowy). Czy jest zablokowany w pozycji zamkniętej lub pokryty solą?"
            },
            "answers": [
                {
                    "text": { "en": "Siphon break is faulty", "pl": "Zawór antysyfonowy jest wadliwy" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_siphon_failure_recovery" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Siphon break seems OK", "pl": "Zawór antysyfonowy wydaje się OK" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "internal_leak_hydrolock_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot find siphon break", "pl": "Nie mogę znaleźć zaworu antysyfonowego" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "internal_leak_hydrolock_check" }
                }
            ]
        },
        "internal_leak_hydrolock_check": {
            "question": {
                "en": "Is the internal coolant level very low, or did the engine overheat severely just before stopping?",
                "pl": "Czy poziom płynu chłodniczego jest bardzo niski, lub czy silnik silnie się przegrzał tuż przed zatrzymaniem?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, suspect head gasket/internal leak", "pl": "Tak, podejrzewam uszczelkę/wyciek wewnętrzny" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_internal_hydrolock_recovery" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Coolant is fine", "pl": "Płyn jest w porządku" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "sol_expert_hydrolock_required" },
                    "probability": 0.2
                }
            ]
        }
    },
    "solutions": {
        "sol_refer_no_start": {
            "title": { "en": "Refer to General No-Start", "pl": "Przejdź do Ogólnego Braku Rozruchu" },
            "description": { "en": "The engine turns over, so it is likely not hydrolocked.", "pl": "Silnik się obraca, więc prawdopodobnie nie jest zablokowany hydraulicznie." },
            "steps": [
                { "en": "Check fuel delivery and battery voltage.", "pl": "Sprawdź podawanie paliwa i napięcie akumulatora." }
            ]
        },
        "sol_exhaust_ingress_recovery": {
            "title": { "en": "Exhaust Water Ingress Recovery", "pl": "Ratowanie Silnika po Zalaniu przez Wydech" },
            "description": { "en": "Water has entered the cylinders from the exhaust system (often due to over-cranking or towing).", "pl": "Woda dostała się do cylindrów z układu wydechowego (często przez nadmierne kręcenie lub holowanie)." },
            "steps": [
                { "en": "CLOSE the raw water seacock immediately.", "pl": "Natychmiast ZAMKNIJ zawór denny wody zaburtowej." },
                { "en": "Remove all injectors or glow plugs to open the cylinders.", "pl": "Zdemontuj wszystkie wtryskiwacze lub świece żarowe, aby otworzyć cylindry." },
                { "en": "Turn the engine over BY HAND (using a wrench on the crank) to expel water.", "pl": "Obróć silnik RĘCZNIE (kluczem na wale), aby usunąć wodę." },
                { "en": "Once water is out, spray fogging oil into cylinders and change engine oil/filter.", "pl": "Gdy woda zniknie, spryskaj cylindry olejem konserwującym i wymień olej/filtr silnika." },
                { "en": "Drain the water-lock muffler.", "pl": "Opróżnij tłumik (water-lock)." }
            ],
            "is_temporary": true
        },
        "sol_siphon_failure_recovery": {
            "title": { "en": "Siphon Break Failure Recovery", "pl": "Ratowanie Silnika po Awarii Antysyfonu" },
            "description": { "en": "Water siphoned into the engine while it was stopped because the vacuum breaker failed.", "pl": "Woda została zassana do silnika podczas postoju, ponieważ zawór antysyfonowy zawiódł." },
            "steps": [
                { "en": "Perform full water removal (injectors out, hand crank).", "pl": "Przeprowadź pełne usuwanie wody (wtryskiwacze na zewnątrz, kręcenie ręczne)." },
                { "en": "Clean or replace the siphon break valve immediately.", "pl": "Natychmiast wyczyść lub wymień zawór antysyfonowy." },
                { "en": "Change engine oil multiple times to remove all moisture.", "pl": "Wymień olej silnikowy wielokrotnie, aby usunąć całą wilgoć." }
            ]
        },
        "sol_internal_hydrolock_recovery": {
            "title": { "en": "Internal Leak Hydrolock Recovery", "pl": "Ratowanie Silnika po Wycieku Wewnętrznym" },
            "description": { "en": "Coolant has entered the cylinders, likely due to a failed head gasket or cracked casting.", "pl": "Płyn chłodniczy dostał się do cylindrów, prawdopodobnie przez uszczelkę pod głowicą lub pęknięty odlew." },
            "steps": [
                { "en": "Do not attempt to start the engine.", "pl": "Nie próbuj uruchamiać silnika." },
                { "en": "Remove water from cylinders as an emergency measure.", "pl": "Usuń wodę z cylindrów jako środek ratunkowy." },
                { "en": "Professional head removal and inspection is required.", "pl": "Wymagane jest profesjonalne zdjęcie głowicy i inspekcja." }
            ]
        },
        "sol_expert_hydrolock_required": {
            "title": { "en": "Critical Engine Jam - Expert Required", "pl": "Krytyczna Blokada Silnika - Wymagany Ekspert" },
            "description": { "en": "The engine is seized or jammed, and water ingress cannot be confirmed visually.", "pl": "Silnik jest zatarty lub zablokowany, a dostanie się wody nie może być potwierdzone wizualnie." },
            "steps": [
                { "en": "Check for a jammed starter motor or transmission failure first.", "pl": "Najpierw sprawdź, czy nie zablokował się rozrusznik lub przekładnia." },
                { "en": "Call a professional mechanic immediately.", "pl": "Natychmiast wezwij profesjonalnego mechanika." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = suspectedHydrolockPath;
}

