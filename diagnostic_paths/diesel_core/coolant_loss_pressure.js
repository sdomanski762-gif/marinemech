/**
 * DIESEL ENGINE CORE: COOLANT LOSS OR PRESSURE SPIKES
 * Focus: Heat exchanger failure, head gasket issues, and internal/external leaks.
 */

const coolantLossPressurePath = {
    tree_id: "coolant_loss_pressure",
    metadata: {
        title: { en: "Coolant Loss and Pressure Diagnostic", pl: "Diagnostyka Utraty Płynu i Ciśnienia" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "coolant_symptom_entry",
    nodes: {
        "coolant_symptom_entry": {
            "question": {
                "en": "Are you experiencing coolant loss (level dropping) or excessive pressure (coolant blowing out of the overflow/cap)?",
                "pl": "Czy doświadczasz utraty płynu (spadek poziomu) czy nadmiernego ciśnienia (płyn wyrzucany przez przelew/korek)?"
            },
            "answers": [
                {
                    "text": { "en": "Level is dropping (Loss)", "pl": "Poziom spada (Utrata)" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "external_leak_check" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "Pressure is high / Blowing out", "pl": "Wysokie ciśnienie / Wyrzucanie płynu" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "pressure_symptom_check" },
                    "probability": 0.5
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "external_leak_check" }
                }
            ]
        },
        "external_leak_check": {
            "question": {
                "en": "Check the engine carefully for white crusty deposits or wet spots. Are there any visible leaks from hoses, the water pump, or gaskets?",
                "pl": "Sprawdź dokładnie silnik pod kątem białych osadów lub mokrych plam. Czy są widoczne wycieki z węży, pompy wody lub uszczelek?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, found a visible leak", "pl": "Tak, znaleziono widoczny wyciek" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_fix_external_leak" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "No visible leaks", "pl": "Brak widocznych wycieków" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "heat_exchanger_internal_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot see all of the engine", "pl": "Nie widzę całego silnika" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "heat_exchanger_internal_check" }
                }
            ]
        },
        "pressure_symptom_check": {
            "question": {
                "en": "Does the pressure spike immediately after start (even when cold), or only after the engine has reached operating temperature?",
                "pl": "Czy ciśnienie skacze natychmiast po starcie (nawet na zimno), czy dopiero po osiągnięciu temperatury roboczej?"
            },
            "answers": [
                {
                    "text": { "en": "Immediately / Cold start", "pl": "Natychmiast / Zimny start" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "head_gasket_check" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Only when hot", "pl": "Tylko gdy gorący" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "pressure_cap_check" },
                    "probability": 0.2
                }
            ]
        },
        "pressure_cap_check": {
            "question": {
                "en": "Check the pressure cap on the header tank. Is the seal damaged, or is the spring weak?",
                "pl": "Sprawdź korek ciśnieniowy na zbiorniku. Czy uszczelka jest uszkodzona lub sprężyna słaba?"
            },
            "answers": [
                {
                    "text": { "en": "Cap is damaged/weak", "pl": "Korek jest uszkodzony/słaby" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_replace_cap" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Cap seems fine", "pl": "Korek wydaje się sprawny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "head_gasket_check" },
                    "probability": 0.3
                }
            ]
        },
        "heat_exchanger_internal_check": {
            "question": {
                "en": "Internal leak check: Is the coolant level actually RISING, or does the coolant taste salty? (Indicates raw water leaking into fresh water circuit).",
                "pl": "Test wycieku wewnętrznego: Czy poziom płynu ROŚNIE, lub czy płyn jest słony? (Wskazuje na wyciek wody zaburtowej do obiegu słodkiej wody)."
            },
            "answers": [
                {
                    "text": { "en": "Level rising / Salty", "pl": "Poziom rośnie / Słony" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_repair_heat_exchanger_leak" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "Level only drops", "pl": "Poziom tylko spada" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "head_gasket_check" },
                    "probability": 0.1
                }
            ]
        },
        "head_gasket_check": {
            "question": {
                "en": "Check for combustion gases: Are there constant bubbles in the header tank while running? Is there oil in the coolant (mayonnaise)?",
                "pl": "Sprawdź gazy spalinowe: Czy w zbiorniku są ciągłe bąbelki podczas pracy? Czy w płynie jest olej (majonez)?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, bubbles or oil present", "pl": "Tak, bąbelki lub olej" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_head_gasket_failure" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No bubbles/oil", "pl": "Brak bąbelków/oleju" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.1
                }
            ]
        }
    },
    "solutions": {
        "sol_fix_external_leak": {
            "title": { "en": "Repair External Coolant Leak", "pl": "Napraw Wyciek Zewnętrzny" },
            "description": { "en": "A hose, gasket, or the water pump is physically leaking coolant.", "pl": "Wąż, uszczelka lub pompa wody fizycznie przepuszcza płyn." },
            "steps": [
                { "en": "Identify the leaking component (hoses are most common).", "pl": "Zidentyfikuj nieszczelny element (węże są najczęstszą przyczyną)." },
                { "en": "Tighten hose clamps or replace damaged hoses.", "pl": "Dokręć opaski lub wymień uszkodzone węże." },
                { "en": "If leaking from the pump 'weep hole', the pump seals are failing and it must be replaced.", "pl": "Jeśli cieknie z 'otworu drenażowego' pompy, uszczelnienia zawodzą i pompa musi być wymieniona." }
            ]
        },
        "sol_replace_cap": {
            "title": { "en": "Replace Pressure Cap", "pl": "Wymień Korek Ciśnieniowy" },
            "description": { "en": "A faulty cap allows coolant to boil at a lower temperature or escape to the overflow too early.", "pl": "Wadliwy korek pozwala płynowi wrzeć w niższej temperaturze lub uciekać do przelewu zbyt wcześnie." },
            "steps": [
                { "en": "Purchase a replacement cap with the correct pressure rating (usually marked in bar or psi).", "pl": "Kup zamienny korek o odpowiednim ciśnieniu (zazwyczaj podane w bar lub psi)." },
                { "en": "Ensure the neck of the header tank is clean and not pitted.", "pl": "Upewnij się, że szyjka zbiornika jest czysta i nie ma wżerów." }
            ]
        },
        "sol_repair_heat_exchanger_leak": {
            "title": { "en": "Repair Heat Exchanger Internal Leak", "pl": "Napraw Wyciek Wewnętrzny Wymiennika" },
            "description": { "en": "The internal seal or tube stack has failed, allowing raw water (higher pressure) to enter the fresh water circuit.", "pl": "Wewnętrzne uszczelnienie lub rurki zawiodły, pozwalając wodzie zaburtowej (wyższe ciśnienie) dostać się do obiegu słodkiej wody." },
            "steps": [
                { "en": "Disassemble the heat exchanger and pressure test the tube stack.", "pl": "Zdemontuj wymiennik i przeprowadź test szczelności rurek." },
                { "en": "Replace the O-rings/seals at both ends of the stack.", "pl": "Wymień O-ringi/uszczelnienia na obu końcach wymiennika." },
                { "en": "Flush the fresh water system to remove salt contamination.", "pl": "Przepłucz układ słodkiej wody, aby usunąć zanieczyszczenie solą." }
            ]
        },
        "sol_head_gasket_failure": {
            "title": { "en": "Head Gasket Replacement Required", "pl": "Wymagana Wymiana Uszczelki pod Głowicą" },
            "description": { "en": "Combustion gases are leaking into the cooling jacket, causing extreme pressure and overheating.", "pl": "Gazy spalinowe przedostają się do płaszcza wodnego, powodując ekstremalne ciśnienie i przegrzewanie." },
            "steps": [
                { "en": "Perform a 'block test' (CO2 detection in coolant) to confirm.", "pl": "Przeprowadź 'block test' (wykrywanie CO2 w płynie), aby potwierdzić diagnozę." },
                { "en": "This is a major repair requiring head removal and potentially machining.", "pl": "To poważna naprawa wymagająca zdjęcia głowicy i potencjalnie jej planowania." },
                { "en": "Stop using the engine to avoid catastrophic failure or hydrolock.", "pl": "Przestań używać silnika, aby uniknąć katastrofalnej awarii lub zablokowania hydraulicznego." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "The cause of coolant loss or pressure cannot be determined by visual checks.", "pl": "Przyczyna utraty płynu lub ciśnienia nie może być ustalona wizualnie." },
            "steps": [
                { "en": "Check the oil cooler for internal leaks (oil in coolant or vice versa).", "pl": "Sprawdź chłodnicę oleju pod kątem wycieków wewnętrznych (olej w płynie lub odwrotnie)." },
                { "en": "Inspect the exhaust manifold for internal cracks leaking coolant into the exhaust.", "pl": "Sprawdź kolektor wydechowy pod kątem pęknięć wewnętrznych przepuszczających płyn do wydechu." },
                { "en": "Call a mechanic for a professional pressure test of the entire system.", "pl": "Wezwij mechanika w celu przeprowadzenia profesjonalnego testu ciśnieniowego całego układu." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = coolantLossPressurePath;
}


