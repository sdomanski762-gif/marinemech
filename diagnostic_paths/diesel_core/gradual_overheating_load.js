/**
 * DIESEL ENGINE CORE: GRADUAL OVERHEATING UNDER LOAD
 * Focus: Heat exchanger fouling, restricted raw water flow, exhaust backpressure, and overloading.
 */

const gradualOverheatingLoadPath = {
    tree_id: "gradual_overheating_load",
    metadata: {
        title: { en: "Gradual Overheating Under Load Diagnostic", pl: "Diagnostyka Stopniowego Przegrzewania pod Obciążeniem" },
        version: "1.0.0",
        engine_type: "diesel"
    },
    start_node: "gradual_overheat_entry",
    nodes: {
        "gradual_overheat_entry": {
            "question": {
                "en": "Does the engine temperature stay normal at idle/low RPM, but slowly rise above normal when running at higher cruising speeds?",
                "pl": "Czy temperatura silnika pozostaje w normie na biegu jałowym/niskich obrotach, ale powoli rośnie powyżej normy przy wyższych prędkościach przelotowych?"
            },
            "answers": [
                {
                    "text": { "en": "Yes, only overheats under load/speed", "pl": "Tak, przegrzewa się tylko pod obciążeniem/prędkością" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "raw_water_flow_load_check" },
                    "probability": 0.9
                },
                {
                    "text": { "en": "No, it overheats immediately even at idle", "pl": "Nie, przegrzewa się natychmiast nawet na jałowym" },
                    "type": "exclude",
                    "next": { "type": "solution", "id": "sol_refer_rapid_overheat" },
                    "probability": 0.1
                },
                {
                    "text": { "en": "I'm not sure", "pl": "Nie jestem pewien" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "raw_water_flow_load_check" }
                }
            ]
        },
        "raw_water_flow_load_check": {
            "question": {
                "en": "Check the raw water flow at cruising RPM. Is the water stream at the exhaust strong and consistent, or does it seem to struggle to keep up?",
                "pl": "Sprawdź przepływ wody zaburtowej przy obrotach przelotowych. Czy strumień wody przy wydechu jest silny i stały, czy wydaje się niewystarczający?"
            },
            "answers": [
                {
                    "text": { "en": "Flow seems weak or 'steamy' at high RPM", "pl": "Przepływ wydaje się słaby lub 'parujący' przy wysokich obrotach" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "intake_restriction_check" },
                    "probability": 0.6
                },
                {
                    "text": { "en": "Flow is strong and consistent", "pl": "Przepływ jest silny i stały" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "heat_exchanger_fouling_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot check exhaust safely while moving", "pl": "Nie mogę bezpiecznie sprawdzić wydechu podczas płynięcia" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "heat_exchanger_fouling_check" }
                }
            ]
        },
        "intake_restriction_check": {
            "question": {
                "en": "Check for partial restrictions. Is the sea strainer partially blocked, or is there growth inside the intake through-hull (seacock)?",
                "pl": "Sprawdź pod kątem częściowych blokad. Czy filtr wody jest częściowo zapchany, lub czy wewnątrz wlotu dennego (zaworu) są porosty?"
            },
            "answers": [
                {
                    "text": { "en": "Found partial blockage/growth", "pl": "Znaleziono częściową blokadę/porosty" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clear_intake_restriction" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Intake system is clear", "pl": "Układ wlotowy jest drożny" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "heat_exchanger_fouling_check" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot check intake now", "pl": "Nie mogę teraz sprawdzić wlotu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "heat_exchanger_fouling_check" }
                }
            ]
        },
        "heat_exchanger_fouling_check": {
            "question": {
                "en": "Check the heat exchanger. Is there scaling inside the tubes, or are there bits of old impeller vanes blocking the tube stack?",
                "pl": "Sprawdź wymiennik ciepła. Czy wewnątrz rurek jest kamień, lub czy kawałki starego wirnika blokują przepływ?"
            },
            "answers": [
                {
                    "text": { "en": "Exchanger is fouled/blocked", "pl": "Wymiennik jest zapchany/zanieczyszczony" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_service_heat_exchanger" },
                    "probability": 0.7
                },
                {
                    "text": { "en": "Exchanger looks clear", "pl": "Wymiennik wygląda na czysty" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "exhaust_mixing_elbow_check" },
                    "probability": 0.3
                },
                {
                    "text": { "en": "Cannot open exchanger here", "pl": "Nie mogę otworzyć wymiennika na miejscu" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "exhaust_mixing_elbow_check" }
                }
            ]
        },
        "exhaust_mixing_elbow_check": {
            "question": {
                "en": "Check the exhaust mixing elbow for carbon buildup. Does it create excessive backpressure, limiting the cooling water discharge?",
                "pl": "Sprawdź kolanko mieszające wydechu pod kątem osadów węgla. Czy tworzy nadmierne ciśnienie wstrotne, ograniczając wypływ wody?"
            },
            "answers": [
                {
                    "text": { "en": "Elbow is restricted by carbon", "pl": "Kolanko jest ograniczone przez nagar" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_replace_mixing_elbow" },
                    "probability": 0.6
                },
                {
                    "text": { "en": "Elbow is clear", "pl": "Kolanko jest drożne" },
                    "type": "confirm",
                    "next": { "type": "node", "id": "overloading_hull_check" },
                    "probability": 0.4
                },
                {
                    "text": { "en": "Cannot remove elbow now", "pl": "Nie mogę teraz zdemontować kolanka" },
                    "type": "cant_check",
                    "next": { "type": "node", "id": "overloading_hull_check" }
                }
            ]
        },
        "overloading_hull_check": {
            "question": {
                "en": "Is the engine being overloaded? Check for a heavily fouled hull or propeller, or if the boat is significantly over-weighted.",
                "pl": "Czy silnik jest przeciążony? Sprawdź, czy kadłub lub śruba nie są mocno porośnięte, lub czy łódź nie jest nadmiernie obciążona."
            },
            "answers": [
                {
                    "text": { "en": "Hull/Prop is fouled (Overload)", "pl": "Kadłub/Śruba są porośnięte (Przeciążenie)" },
                    "type": "terminate",
                    "next": { "type": "solution", "id": "sol_clean_hull_prop" },
                    "probability": 0.8
                },
                {
                    "text": { "en": "Hull is clean", "pl": "Kadłub jest czysty" },
                    "type": "confirm",
                    "next": { "type": "solution", "id": "expert_required" },
                    "probability": 0.2
                },
                {
                    "text": { "en": "Cannot check hull underwater", "pl": "Nie mogę sprawdzić kadłuba pod wodą" },
                    "type": "cant_check",
                    "next": { "type": "solution", "id": "expert_required" }
                }
            ]
        }
    },
    "solutions": {
        "sol_clear_intake_restriction": {
            "title": { "en": "Clear Raw Water Intake Restriction", "pl": "Udrożnij Wlot Wody Zaburtowej" },
            "description": { "en": "Partial blockages in the intake reduce flow significantly at high RPM, leading to gradual overheating.", "pl": "Częściowe blokady we wlocie znacznie zmniejszają przepływ przy wysokich obrotach, prowadząc do stopniowego przegrzewania." },
            "steps": [
                { "en": "Check the sea strainer for small debris or 'hair' seaweed.", "pl": "Sprawdź filtr wody pod kątem drobnych zanieczyszczeń lub 'włosowatych' wodorostów." },
                { "en": "Clear the intake through-hull from the outside (if possible) to remove barnacles.", "pl": "Oczyść wlot denny od zewnątrz (jeśli to możliwe), aby usunąć pąkle." },
                { "en": "Ensure the seacock is fully opening and the handle isn't slipping on the stem.", "pl": "Upewnij się, że zawór denny otwiera się całkowicie i rączka nie ślizga się na trzpieniu." }
            ]
        },
        "sol_service_heat_exchanger": {
            "title": { "en": "Service Heat Exchanger", "pl": "Serwis Wymiennika Ciepła" },
            "description": { "en": "The heat exchanger's ability to transfer heat is reduced by internal scaling or physical blockages (impeller bits).", "pl": "Zdolność wymiennika do oddawania ciepła jest zmniejszona przez kamień lub fizyczne blokady (kawałki wirnika)." },
            "steps": [
                { "en": "Remove the heat exchanger end caps.", "pl": "Zdejmij pokrywy boczne wymiennika ciepła." },
                { "en": "Use a rod or wire to clear each tube in the stack.", "pl": "Użyj pręta lub drutu, aby udrożnić każdą rurkę w wymienniku." },
                { "en": "Check for old impeller vanes at the intake side of the stack.", "pl": "Sprawdź, czy po stronie wlotowej wymiennika nie ma kawałków starego wirnika." },
                { "en": "Perform a chemical descale if tubes are coated in calcium/salt.", "pl": "Przeprowadź chemiczne odkamienianie, jeśli rurki są pokryte wapniem/solą." }
            ]
        },
        "sol_replace_mixing_elbow": {
            "title": { "en": "Clean/Replace Exhaust Mixing Elbow", "pl": "Wyczyść/Wymień Kolanko Mieszające" },
            "description": { "en": "Carbon buildup restricts both exhaust gases and cooling water discharge, creating high backpressure and heat.", "pl": "Osad węgla ogranicza zarówno spaliny, jak i wypływ wody chłodzącej, tworząc wysokie ciśnienie i temperaturę." },
            "steps": [
                { "en": "Remove the mixing elbow from the exhaust manifold.", "pl": "Zdemontuj kolanko mieszające z kolektora wydechowego." },
                { "en": "Inspect the water injection port for narrow passages caused by carbon.", "pl": "Sprawdź port wtrysku wody pod kątem zwężeń spowodowanych nagarem." },
                { "en": "Clean thoroughly with a wire brush or replace if corrosion is severe.", "pl": "Wyczyść dokładnie szczotką drucianą lub wymień, jeśli korozja jest silna." }
            ]
        },
        "sol_clean_hull_prop": {
            "title": { "en": "Clean Hull and Propeller", "pl": "Oczyść Kadłub i Śrubę" },
            "description": { "en": "Excessive marine growth increases drag, forcing the engine to work harder and produce more heat than the cooling system can remove.", "pl": "Nadmierne porosty zwiększają opór, zmuszając silnik do cięższej pracy i wytwarzania większej ilości ciepła." },
            "steps": [
                { "en": "Inspect the hull for slime, barnacles, or weed growth.", "pl": "Sprawdź kadłub pod kątem śluzu, pąkli lub wodorostów." },
                { "en": "Clean the propeller blades thoroughly; even light growth reduces efficiency.", "pl": "Dokładnie oczyść łopatki śruby; nawet lekki nalot zmniejsza wydajność." },
                { "en": "Verify that the boat is not overloaded with unnecessary gear or water in the bilge.", "pl": "Upewnij się, że łódź nie jest przeładowana sprzętem lub wodą w zęzie." }
            ]
        },
        "sol_refer_rapid_overheat": {
            "title": { "en": "Refer to Rapid Overheating", "pl": "Przejdź do Szybkiego Przegrzewania" },
            "description": { "en": "Immediate overheating is usually a total loss of flow (seacock, impeller, airlock).", "pl": "Natychmiastowe przegrzewanie to zazwyczaj całkowity brak przepływu (zawór, wirnik, zapowietrzenie)." },
            "steps": [
                { "en": "Search for 'Rapid overheating after start' diagnostic path.", "pl": "Szukaj ścieżki diagnostycznej 'Szybkie przegrzewanie po starcie'." }
            ]
        },
        "expert_required": {
            "title": { "en": "Expert Diagnosis Required", "pl": "Wymagana Diagnoza Eksperta" },
            "description": { "en": "If basic cooling and load checks pass, the issue may be internal (partially stuck thermostat, internal scaling, or head gasket).", "pl": "Jeśli podstawowe sprawdzenia chłodzenia i obciążenia przeszły pomyślnie, problem może być wewnętrzny (termostat, kamień, uszczelka)." },
            "steps": [
                { "en": "Replace the thermostat as a precaution.", "pl": "Wymień termostat profilaktycznie." },
                { "en": "Check for internal coolant flow issues or head gasket signs (bubbles in coolant).", "pl": "Sprawdź oznaki problemów z uszczelką pod głowicą (pęcherzyki w płynie)." },
                { "en": "Call a marine mechanic for a professional thermal scan.", "pl": "Wezwij mechanika w celu przeprowadzenia profesjonalnego skanu termowizyjnego." }
            ]
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = gradualOverheatingLoadPath;
}


