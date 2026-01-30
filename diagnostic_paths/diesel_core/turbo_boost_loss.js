/**
 * DIESEL ENGINE CORE: TURBO BOOST LOSS UNDER LOAD
 * Focus: Air leaks, Exhaust leaks, Wastegate/VNT faults, Turbo physical damage.
 * Attachment: Attached to existing start_node "engine_start_check".
 */

const turboBoostLossPath = {
    tree_id: "turbo_boost_loss",
    metadata: {
        title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "engine_start_check",
    nodes: {
        "engine_start_check": {
            "question": {
                "en": "What is the primary symptom regarding the engine performance?",
                "pl": "Jaki jest główny objaw dotyczący wydajności silnika?"
            },
            "answers": [
                {
                    "text": { "en": "Loss of turbo boost / Extreme sluggishness under load", "pl": "Utrata doładowania turbo / Ekstremalna ociężałość pod obciążeniem" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "turbo_engine_verify_gate" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Other symptoms (refer to No Start / Shutdown / Smoke paths)", "pl": "Inne objawy (patrz ścieżka Brak Rozruchu / Wyłączenie / Dym)" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know / Not sure", "pl": "Nie wiem / Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "turbo_engine_verify_gate" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "turbo_engine_verify_gate": {
            "question": {
                "en": "Is the engine equipped with a turbocharger?",
                "pl": "Czy silnik jest wyposażony w turbosprężarkę?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, it is a turbo engine", "pl": "Tak, to silnik z turbo" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "boost_symptom_verify" },
                    "probability": 0.9,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No, naturally aspirated", "pl": "Nie, silnik wolnossący" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "boost_symptom_verify" },
                    "probability": 0.5,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "boost_symptom_verify": {
            "question": {
                "en": "When attempting to accelerate, what do you observe? (Smoke, sound, RPM)",
                "pl": "Co obserwujesz podczas próby przyspieszenia? (Dym, dźwięk, obroty)"
            },
            "answers": [
                {
                    "text": { "en": "Black smoke and a hissing/whistling sound", "pl": "Czarny dym i syczenie/gwizd" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "boost_leak_hose_check" },
                    "probability": 0.7,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "No smoke, but very slow to build RPM", "pl": "Brak dymu, ale bardzo wolno wchodzi na obroty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_energy_leak_check" },
                    "probability": 0.3,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I don't know", "pl": "Nie wiem" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "boost_leak_hose_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "boost_leak_hose_check": {
            "question": {
                "en": "Check the rubber boost hoses and intercooler. Are there any cracks, loose clamps, or oil residue on the outside of hoses?",
                "pl": "Sprawdź gumowe węże doładowania i intercooler. Czy widać pęknięcia, luźne opaski lub ślady oleju na zewnątrz węży?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, loose or damaged hose found", "pl": "Tak, znaleziono luźny lub uszkodzony wąż" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_boost_hose_repair" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Hoses look secure and dry", "pl": "Węże wyglądają na szczelne i suche" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_energy_leak_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the hoses", "pl": "Nie mogę sprawdzić węży" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "exhaust_energy_leak_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "exhaust_energy_leak_check": {
            "question": {
                "en": "Check the exhaust manifold and turbo mounting flange. Is there any soot buildup or evidence of exhaust gas leaking out?",
                "pl": "Sprawdź kolektor wydechowy i flanszę montażową turbo. Czy widać ślady sadzy lub wycieku spalin?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, soot/exhaust leak found", "pl": "Tak, znaleziono sadzę/wyciek spalin" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_exhaust_manifold_repair" },
                    "probability": 0.8,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Exhaust side is dry and soot-free", "pl": "Strona wydechowa jest sucha i bez sadzy" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "wastegate_vnt_verify" },
                    "probability": 0.2,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't check the exhaust manifold", "pl": "Nie mogę sprawdzić kolektora" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "wastegate_vnt_verify" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "wastegate_vnt_verify": {
            "question": {
                "en": "Check the turbo actuator (wastegate or VNT linkage). Does the linkage move freely by hand or is it seized with salt/carbon?",
                "pl": "Sprawdź siłownik turbo (wastegate lub cięgno VNT). Czy cięgno porusza się swobodnie ręką, czy jest zapieczone przez sól/nagar?"
            },
            "answers": [
                {
                    "text": { "en": "Linkage is seized or restricted", "pl": "Cięgno jest zapieczone lub ograniczone" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_wastegate_actuator_service" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Linkage moves freely", "pl": "Cięgno porusza się swobodnie" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "turbo_impeller_physical_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I can't reach the linkage", "pl": "Nie mogę dosięgnąć cięgna" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "turbo_impeller_physical_check" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "turbo_impeller_physical_check": {
            "question": {
                "en": "Expert Mode: Remove the air intake hose and inspect the compressor wheel. Is there excessive shaft play or physical damage to the blades?",
                "pl": "Tryb Ekspert: Zdejmij wąż dolotowy i sprawdź koło kompresji. Czy występuje nadmierny luz wałka lub uszkodzenia łopatek?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, damage or excessive play found", "pl": "Tak, znaleziono uszkodzenia lub duży luz" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_turbo_physical_failure" },
                    "probability": 0.9,
                    "knockout": "others",
                    "safety_stop": false
                },
                {
                    "text": { "en": "Impeller looks perfect and spins freely", "pl": "Wirnik wygląda idealnie i obraca się swobodnie" },
                    "type": "exclude",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "self",
                    "safety_stop": false
                },
                {
                    "text": { "en": "I cannot perform this check", "pl": "Nie mogę wykonać tego sprawdzenia" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "expert_required" },
                    "probability": 0.1,
                    "knockout": "none",
                    "safety_stop": false
                }
            ]
        },
        "expert_required": {
            "question": { "en": "Unresolved turbo/power issue. Contact mechanic.", "pl": "Nierozwiązany problem turbo/mocy. Skontaktuj się z mechanikiem." },
            "answers": [
                { "text": { "en": "Exit", "pl": "Wyjście" }, "type": "terminate", "next": { "type": "solution", "id": "expert_required" } }
            ]
        }
    },
    "solutions": {
        "sol_boost_hose_repair": {
            "title": { "en": "Repair Boost Leak", "pl": "Napraw wyciek doładowania" },
            "description": { "en": "Pressurized air is escaping before it reaches the engine cylinders.", "pl": "Sprężone powietrze ucieka, zanim dotrze do cylindrów silnika." },
            "steps": [
                { "en": "Tighten all hose clamps on the turbo-to-intake path.", "pl": "Dokręć wszystkie opaski na drodze od turbo do dolotu." },
                { "en": "Replace any cracked or delaminated hoses.", "pl": "Wymień pęknięte lub rozwarstwione węże." },
                { "en": "If the intercooler is cracked, it must be removed and welded or replaced.", "pl": "Jeśli intercooler jest pęknięty, musi zostać wymontowany i pospawany lub wymieniony." }
            ],
            "is_temporary": false
        },
        "sol_exhaust_manifold_repair": {
            "title": { "en": "Repair Exhaust Leak", "pl": "Napraw wyciek spalin" },
            "description": { "en": "Exhaust energy is escaping before it can spin the turbocharger.", "pl": "Energia spalin ucieka, zanim zdoła rozpędzić turbosprężarkę." },
            "steps": [
                { "en": "Replace the exhaust manifold gaskets.", "pl": "Wymień uszczelki kolektora wydechowego." },
                { "en": "Check the turbo mounting studs and nuts for tightness.", "pl": "Sprawdź szpilki i nakrętki montażowe turbo pod kątem dokręcenia." },
                { "en": "Inspect the manifold for cracks; cracked manifolds must be replaced.", "pl": "Sprawdź kolektor pod kątem pęknięć; pęknięte kolektory należy wymienić." }
            ],
            "is_temporary": false
        },
        "sol_wastegate_actuator_service": {
            "title": { "en": "Service Turbo Actuator/VNT", "pl": "Serwisuj siłownik turbo/VNT" },
            "description": { "en": "The mechanism that regulates boost is stuck, preventing the turbo from functioning correctly.", "pl": "Mechanizm regulujący doładowanie jest zablokowany, co uniemożliwia poprawną pracę turbo." },
            "steps": [
                { "en": "Apply penetrating oil to the wastegate/VNT linkage pivot points.", "pl": "Zastosuj odrdzewiacz na punkty obrotu cięgna wastegate/VNT." },
                { "en": "Gently work the linkage by hand until it moves through its full range.", "pl": "Delikatnie rozruszaj cięgno ręką, aż zacznie pracować w pełnym zakresie." },
                { "en": "If the vacuum/electronic actuator is dead, it must be replaced.", "pl": "Jeśli siłownik podciśnieniowy/elektroniczny jest uszkodzony, musi zostać wymieniony." }
            ],
            "is_temporary": true
        },
        "sol_turbo_physical_failure": {
            "title": { "en": "Turbocharger Replacement Required", "pl": "Wymagana wymiana turbosprężarki" },
            "description": { "en": "The internal rotating assembly of the turbocharger is physically damaged.", "pl": "Wewnętrzny zespół wirujący turbosprężarki jest fizycznie uszkodzony." },
            "steps": [
                { "en": "DO NOT continue to operate the engine; metal fragments could enter the intake.", "pl": "NIE kontynuuj pracy silnika; metalowe odłamki mogą dostać się do dolotu." },
                { "en": "Remove the turbocharger and send it to a specialist for a rebuild.", "pl": "Zdemontuj turbosprężarkę i wyślij ją do specjalisty w celu regeneracji." },
                { "en": "Always replace the turbo oil supply line when installing a new turbo.", "pl": "Zawsze wymieniaj przewód zasilający turbo w olej przy montażu nowej jednostki." }
            ],
            "is_temporary": false
        },
        "expert_required": {
            "title": { "en": "Professional Mechanic Required", "pl": "Wymagany Profesjonalny Mechanik" },
            "description": { "en": "The turbo issue requires specialized diagnostic equipment (boost gauge, pressure tester).", "pl": "Problem z turbo wymaga specjalistycznego sprzętu diagnostycznego (wskaźnik doładowania, tester ciśnieniowy)." },
            "steps": [
                { "en": "Limit engine load to avoid excessive exhaust gas temperatures (EGT).", "pl": "Ogranicz obciążenie silnika, aby uniknąć nadmiernej temperatury spalin (EGT)." },
                { "en": "Request a boost pressure test and exhaust backpressure check.", "pl": "Poproś o test ciśnienia doładowania i sprawdzenie przeciwciśnienia wydechu." }
            ],
            "is_temporary": false
        }
    },
    "constraints": {
        "entry_conditions_required": ["engine_loss_of_boost"],
        "entry_conditions_conflicting": ["engine_no_start"],
        "convergence": {
            "confidence_margin_threshold": 0.3,
            "max_steps": 10,
            "active_cause_limit": 1
        },
        "priority_order": ["safety", "knockout", "elimination", "probability"]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = turboBoostLossPath;
}


