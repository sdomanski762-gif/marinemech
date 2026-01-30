import re
import os

path = r'g:\TRAE APPS\nowy app\FOUNDATIONV1.html'

with open(path, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# 1. Define the new overheating_master tree
new_overheating_tree = """    "overheating_master": {
        tree_id: "overheating_master",
        metadata: {
            title: { en: "Master Overheating Diagnostic", pl: "Pełna diagnostyka Przegrzewania" },
            version: "1.2.1",
            engine_type: "diesel"
        },
        start_node: "exhaust_observation",
        nodes: {
            "exhaust_observation": {
                question: {
                    en: "Mechanic's first check: Is water coming out of the exhaust with the gases?",
                    pl: "Pierwszy krok mechanika: Czy z wydechu wylatuje woda razem ze spalinami?"
                },
                answers: [
                    { text: { en: "No water / Only steam", pl: "Brak wody / Sama para" }, type: "standard", next: { type: "node", id: "intake_side_start" } },
                    { text: { en: "Water is flowing normally", pl: "Woda leci normalnie" }, type: "standard", next: { type: "node", id: "internal_cooling_start" } },
                    { text: { en: "Water is spitting / intermittent", pl: "Woda pryska / leci przerywanie" }, type: "standard", next: { type: "node", id: "impeller_inspection" } },
                    { text: { en: "I can't see the exhaust", pl: "Nie widzę wydechu" }, type: "cant_check", next: { type: "node", id: "intake_side_start" } }
                ]
            },
            "intake_side_start": {
                question: {
                    en: "Is the intake seacock (valve) fully open and the strainer clear?",
                    pl: "Czy zawór denny jest otwarty, a filtr wody czysty?"
                },
                answers: [
                    { text: { en: "Yes, both OK", pl: "Tak, oba OK" }, type: "standard", next: { type: "node", id: "pump_belt_check" } },
                    { text: { en: "No, found a blockage/closed valve", pl: "Nie, znalazłem zator/zamknięty zawór" }, type: "standard", next: { type: "solution", id: "clear_intake_restriction" } },
                    { text: { en: "Strainer is empty/dry", pl: "Filtr jest pusty/suchy" }, type: "standard", next: { type: "solution", id: "air_leak_intake" } }
                ]
            },
            "pump_belt_check": {
                question: {
                    en: "Is the raw water pump belt intact and tight? Is the pump pulley spinning?",
                    pl: "Czy pasek pompy wody jest cały i napięty? Czy koło pompy się obraca?"
                },
                answers: [
                    { text: { en: "Yes, spinning fine", pl: "Tak, kręci się" }, type: "standard", next: { type: "node", id: "impeller_inspection" } },
                    { text: { en: "No, belt issues", pl: "Nie, problem z paskiem" }, type: "standard", next: { type: "tree", id: "drive_belt_core" } }
                ]
            },
            "impeller_inspection": {
                question: {
                    en: "Open the pump. Is the rubber impeller intact with all blades present?",
                    pl: "Otwórz pompę. Czy wirnik (impeller) jest cały i ma wszystkie łopatki?"
                },
                answers: [
                    { text: { en: "Yes, perfect condition", pl: "Tak, stan idealny" }, type: "standard", next: { type: "node", id: "heat_exchanger_inlet_check" } },
                    { text: { en: "No, damaged/missing blades", pl: "Nie, uszkodzony/brak łopatek" }, type: "standard", next: { type: "solution", id: "replace_impeller_find_bits" } },
                    { text: { en: "I can't open the pump", pl: "Nie mogę otworzyć pompy" }, type: "cant_check", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "heat_exchanger_inlet_check": {
                question: {
                    en: "Check the inlet to the heat exchanger. Are there old impeller bits or debris blocking the tube stack?",
                    pl: "Sprawdź wlot do wymiennika ciepła. Czy kawałki starego wirnika lub śmieci blokują rurki?"
                },
                answers: [
                    { text: { en: "Yes, found debris", pl: "Tak, znalazłem śmieci" }, type: "standard", next: { type: "solution", id: "clean_heat_exchanger_inlet" } },
                    { text: { en: "No, inlet is clear", pl: "Nie, wlot jest czysty" }, type: "standard", next: { type: "node", id: "external_intake_blockage" } }
                ]
            },
            "internal_cooling_start": {
                question: {
                    en: "Check the fresh water (coolant) level in the header tank. Is it full?",
                    pl: "Sprawdź poziom płynu chłodniczego w zbiorniku. Czy jest pełny?"
                },
                answers: [
                    { text: { en: "Yes, level is OK", pl: "Tak, poziom OK" }, type: "standard", next: { type: "node", id: "thermostat_check" } },
                    { text: { en: "No, it's low", pl: "Nie, jest mało" }, type: "standard", next: { type: "solution", id: "coolant_loss_check" } },
                    { text: { en: "It's boiling over", pl: "Wyrzuca płyn/gotuje się" }, type: "standard", next: { type: "solution", id: "head_gasket_suspected" } }
                ]
            },
            "thermostat_check": {
                question: {
                    en: "Is the top radiator hose getting hot, or does it stay cold while the engine overheats?",
                    pl: "Czy górny wąż chłodnicy robi się gorący, czy pozostaje zimny mimo przegrzania silnika?"
                },
                answers: [
                    { text: { en: "Stays cold (Thermostat stuck closed)", pl: "Pozostaje zimny (Termostat zamknięty)" }, type: "standard", next: { type: "solution", id: "replace_thermostat" } },
                    { text: { en: "Gets hot (Thermostat is opening)", pl: "Robi się gorący (Termostat się otwiera)" }, type: "standard", next: { type: "node", id: "heat_exchanger_efficiency" } }
                ]
            },
            "heat_exchanger_efficiency": {
                question: {
                    en: "Is the heat exchanger scale-free? When was it last descaled?",
                    pl: "Czy wymiennik jest wolny od kamienia? Kiedy był ostatnio odkamieniany?"
                },
                answers: [
                    { text: { en: "Likely scaled up / Years ago", pl: "Prawdopodobnie zakamieniony / dawno temu" }, type: "standard", next: { type: "solution", id: "descale_heat_exchanger" } },
                    { text: { en: "Clean / Recently serviced", pl: "Czysty / Niedawno serwisowany" }, type: "standard", next: { type: "node", id: "exhaust_elbow_deep_check" } }
                ]
            },
            "exhaust_elbow_deep_check": {
                question: {
                    en: "Check the mixing elbow. Is the water injection port restricted by rust or carbon?",
                    pl: "Sprawdź kolanko wydechowe. Czy króciec wtrysku wody jest zwężony przez rdzę lub nagar?"
                },
                answers: [
                    { text: { en: "Yes, looks restricted", pl: "Tak, wygląda na zapchany" }, type: "standard", next: { type: "tree", id: "exhaust_elbow_core" } },
                    { text: { en: "No, looks clear", pl: "Nie, wygląda na czysty" }, type: "standard", next: { type: "node", id: "high_load_factors" } }
                ]
            },
            "high_load_factors": {
                question: {
                    en: "Is the propeller fouled or the boat heavily overloaded? Does it only overheat at high RPM?",
                    pl: "Czy śruba jest obrośnięta lub łódź przeładowana? Czy grzeje się tylko na wysokich obrotach?"
                },
                answers: [
                    { text: { en: "Yes, suspect prop fouling", pl: "Tak, podejrzewam brudną śrubę" }, type: "standard", next: { type: "tree", id: "drivetrain_overload_diagnostic" } },
                    { text: { en: "No, happens even at low RPM", pl: "Nie, grzeje się nawet na małych obrotach" }, type: "standard", next: { type: "solution", id: "expert_required" } }
                ]
            },
            "external_intake_blockage": {
                question: {
                    en: "Is there something blocking the intake grate outside the hull (plastic bag, barnacles)?",
                    pl: "Czy coś blokuje kratkę wlotową na zewnątrz kadłuba (folia, pąkle)?"
                },
                answers: [
                    { text: { en: "Yes/Maybe (Need to check)", pl: "Tak/Możliwe (Trzeba Sprawdzić)" }, type: "standard", next: { type: "solution", id: "clear_hull_intake" } },
                    { text: { en: "No, definitely clear", pl: "Nie, na pewno czysto" }, type: "standard", next: { type: "solution", id: "expert_required" } }
                ]
            }
        },
        solutions: {
            "replace_impeller_find_bits": {
                title: { en: "Replace Impeller & Recover Fragments", pl: "Wymień wirnik i Odzyskaj Kawałki" },
                description: { en: "Broken blades will travel downstream and clog the heat exchanger.", pl: "Urwane łopatki popłyną dalej i zapchają wymiennik ciepła." },
                steps: [
                    { en: "Remove pump cover and old impeller.", pl: "Zdejmij pokrywę pompy i stary wirnik." },
                    { en: "Count the missing blades.", pl: "Policz ile łopatek brakuje." },
                    { en: "Open the heat exchanger end cap and remove ALL fragments.", pl: "Otwórz pokrywę wymiennika i usuń WSZYSTKIE kawałki." },
                    { en: "Install new impeller with glycerin/soap.", pl: "Zainstaluj nowy wirnik używając gliceryny/mydła." }
                ]
            },
            "clean_heat_exchanger_inlet": {
                title: { en: "Clean Heat Exchanger Inlet", pl: "Wyczyść wlot wymiennika" },
                description: { en: "Debris at the entrance of the tube stack is restricting flow.", pl: "Śmieci na wejściu do rurek ograniczają przepływ." },
                steps: [
                    { en: "Remove the raw water hose from the heat exchanger.", pl: "Zdejmij wąż wody zaburtowej z wymiennika." },
                    { en: "Use a vacuum or long pliers to remove debris.", pl: "Użyj odkurzacza lub długich szczypiec, by usunąć śmieci." },
                    { en: "Flush with fresh water if possible.", pl: "Przepłucz słodką wodą jeśli to możliwe." }
                ]
            },
            "replace_thermostat": {
                title: { en: "Replace Thermostat", pl: "Wymień Termostat" },
                description: { en: "The thermostat is stuck closed, preventing coolant from reaching the heat exchanger.", pl: "Termostat zaciął się w pozycji zamkniętej, blokując przepływ do wymiennika." },
                steps: [
                    { en: "Allow engine to cool.", pl: "Poczekaj aż silnik ostygnie." },
                    { en: "Remove thermostat housing.", pl: "Zdejmij obudowę termostatu." },
                    { en: "Test old thermostat in boiling water if unsure.", pl: "Jeśli nie masz pewności, przetestuj stary termostat w gotującej się wodzie." },
                    { en: "Install new thermostat with a new gasket.", pl: "Zainstaluj nowy termostat z nową uszczelką." }
                ]
            },
            "descale_heat_exchanger": {
                title: { en: "Descale Heat Exchanger", pl: "Odkamień Wymiennik Ciepła" },
                description: { en: "Calcium buildup inside the tubes is reducing heat transfer.", pl: "Osad wapienny wewnątrz rurek pogarsza oddawanie ciepła." },
                steps: [
                    { en: "Use a commercial descaling agent or white vinegar.", pl: "Użyj profesjonalnego odkamieniacza lub octu." },
                    { en: "Circulate the agent through the raw water side for several hours.", pl: "Cyrkuluj środek przez stronę zaburtową przez kilka godzin." },
                    { en: "Rinse thoroughly with fresh water.", pl: "Przepłucz dokładnie słodką wodą." }
                ]
            },
            "clear_hull_intake": {
                title: { en: "Clear Hull Intake", pl: "Udrożnij wlot w kadłubie" },
                description: { en: "Something is blocking the water before it even reaches the seacock.", pl: "Coś blokuje wodę zanim dotrze do zaworu dennego." },
                steps: [
                    { en: "Dive under the boat or use a brush on a pole to clear the intake grate.", pl: "Zanurkuj pod łódź lub użyj szczotki na tyczce, by oczyścić kratkę." },
                    { en: "Try blowing compressed air backwards from the strainer (with seacock open).", pl: "Spróbuj 'dmuchnąć' powietrzem wstecz od filtra (przy otwartym zaworze)." }
                ]
            },
            "coolant_loss_check": {
                title: { en: "Coolant Loss / Leak", pl: "Ubytek Płynu / Wyciek" },
                description: { en: "The fresh water cooling circuit is losing fluid.", pl: "Układ chłodzenia słodką wodą traci płyn." },
                steps: [
                    { en: "Check for green/blue stains on the engine block.", pl: "Szukaj zielonych/niebieskich zacieków na bloku silnika." },
                    { en: "Inspect the water pump weep hole for leaks.", pl: "Sprawdź otwór kontrolny pompy wody pod kątem wycieków." },
                    { en: "Check the oil level (rising oil = internal coolant leak).", pl: "Sprawdź poziom oleju (przybywanie oleju = wewnętrzny wyciek płynu)." }
                ]
            },
            "head_gasket_suspected": {
                title: { en: "Suspected Head Gasket Failure", pl: "Podejrzenie Uszczelki pod Głowicą" },
                description: { en: "Combustion gases are entering the cooling system, causing it to boil over.", pl: "Gazy spalinowe dostają się do układu chłodzenia, powodując 'wyrzucanie' płynu." },
                steps: [
                    { en: "DO NOT OPEN CAP WHILE HOT.", pl: "NIE OTWIERAJ KORKA GDY SILNIK JEST GORĄCY." },
                    { en: "Look for 'mayonnaise' under the oil filler cap.", pl: "Szukaj 'majonezu' pod korkiem wlewu oleju." },
                    { en: "Check if coolant smells like exhaust gases.", pl: "Sprawdź czy płyn chłodniczy śmierdzi spalinami." }
                ]
            },
            "air_leak_intake": {
                title: { en: "Air Leak in Intake / Lost Prime", pl: "Nieszczelność dolotu / Zapowietrzenie pompy" },
                description: { en: "The pump is sucking air instead of water, usually through the strainer lid.", pl: "Pompa zasysa powietrze zamiast wody, zazwyczaj przez nieszczelną pokrywę filtra." },
                steps: [
                    { en: "Check the O-ring/gasket on the water strainer lid.", pl: "Sprawdź uszczelkę pod pokrywą filtra wody." },
                    { en: "Grease the lid seal with silicone grease.", pl: "Posmaruj uszczelkę smarem silikonowym." },
                    { en: "Tighten all hose clamps on the intake side.", pl: "Dokręć wszystkie opaski na wężach dolotowych." }
                ]
            },
            "clear_intake_restriction": {
                title: { en: "Clear Intake Restriction", pl: "Usuń zator w dolocie" },
                description: { en: "The seacock or strainer is physically blocked.", pl: "Zawór denny lub filtr są fizycznie zablokowane." },
                steps: [
                    { en: "Ensure seacock handle is fully open (parallel to hose).", pl: "Upewnij się, że rączka zaworu jest w pełni otwarta (równolegle do węża)." },
                    { en: "Remove seaweed or plastic from the strainer basket.", pl: "Usuń trawę lub folię z koszyka filtra." }
                ]
            },
            "expert_required": {
                title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
                description: { en: "Mechanical overheating issues can be complex.", pl: "Mechaniczne przyczyny przegrzewania mogą być złożone." },
                steps: [{ en: "Call a professional mechanic.", pl: "Wezwij profesjonalnego mechanika." }]
            }
        }
    },"""

# 2. Define the new plumbing_core and jabsco_toilet trees
plumbing_logic = """    "plumbing_core": {
        tree_id: "plumbing_core",
        metadata: {
            title: { en: "Plumbing & Water Systems", pl: "Instalacje wodne i sanitarne" },
            version: "1.0.0",
            engine_type: "auxiliary"
        },
        start_node: "plumbing_main_symptom",
        nodes: {
            "plumbing_main_symptom": {
                question: {
                    en: "What part of the water system is failing?",
                    pl: "Która część instalacji wodnej sprawia problemy?"
                },
                answers: [
                    { text: { en: "Marine Toilet (WC)", pl: "Toaleta morska (WC)" }, type: "confirm", next: { type: "tree", id: "jabsco_toilet" } },
                    { text: { en: "Fresh Water Pump / Taps", pl: "Pompa wody słodkiej / Kran" }, type: "confirm", next: { type: "node", id: "fresh_water_pump_check" } },
                    { text: { en: "Bilge Pumps", pl: "Pompy zęzowe" }, type: "confirm", next: { type: "tree", id: "electrical_core" } },
                    { text: { en: "Leaking Pipe / Hose", pl: "Wyciek z rury / węża" }, type: "confirm", next: { type: "solution", id: "leak_fix_general" } }
                ]
            },
            "fresh_water_pump_check": {
                question: {
                    en: "Is the pump running but no water comes out, or does it not run at all?",
                    pl: "Czy pompa pracuje, ale woda nie leci, czy w ogóle się nie włącza?"
                },
                answers: [
                    { text: { en: "Running, no water", pl: "Pracuje, brak wody" }, type: "standard", next: { type: "solution", id: "pump_lost_prime" } },
                    { text: { en: "Not running at all", pl: "W ogóle nie pracuje" }, type: "standard", next: { type: "solution", id: "pump_electrical_check" } },
                    { text: { en: "Runs continuously", pl: "Pracuje bez przerwy" }, type: "standard", next: { type: "solution", id: "pump_pressure_switch_leak" } }
                ]
            }
        },
        solutions: {
            "pump_lost_prime": {
                title: { en: "Pump Lost Prime / Empty Tank", pl: "Zapowietrzona pompa / Pusty zbiornik" },
                description: { en: "The pump cannot suck water because there is air in the line or the tank is empty.", pl: "Pompa nie może zassać wody, bo w układzie jest powietrze lub zbiornik jest pusty." },
                steps: [
                    { en: "Check water tank level.", pl: "Sprawdź poziom wody w zbiorniku." },
                    { en: "Open all taps to bleed air.", pl: "Otwórz wszystkie krany, by odpowietrzyć układ." },
                    { en: "Check the pump inlet strainer for debris.", pl: "Sprawdź filtr wlotowy pompy." }
                ]
            },
            "pump_electrical_check": {
                title: { en: "Pump Electrical Check", pl: "Sprawdzenie elektryczne pompy" },
                description: { en: "The pump is not receiving power.", pl: "Pompa nie dostaje zasilania." },
                steps: [
                    { en: "Check the 'Water Pump' switch on the panel.", pl: "Sprawdź przełącznik 'Water Pump' na panelu." },
                    { en: "Check the fuse/breaker.", pl: "Sprawdź bezpiecznik." },
                    { en: "Check for 12V/24V at the pump terminals.", pl: "Sprawdź napięcie na zaciskach pompy." }
                ]
            },
            "pump_pressure_switch_leak": {
                title: { en: "Continuous Running / Pressure Leak", pl: "Praca ciągła / Wyciek ciśnienia" },
                description: { en: "The pump runs because it can't reach cutoff pressure, usually due to a leak or internal valve failure.", pl: "Pompa pracuje, bo nie może osiągnąć ciśnienia wyłączenia, zazwyczaj przez wyciek lub awarię zaworu." },
                steps: [
                    { en: "Check EVERY tap and the transom shower for drips.", pl: "Sprawdź KAŻDY kran i prysznic rufowy pod kątem wycieków." },
                    { en: "Check the water heater (calorifier) pressure relief valve.", pl: "Sprawdź zawór bezpieczeństwa na bojlerze." },
                    { en: "If no leaks, the pump internal pressure switch or valves are faulty.", pl: "Jeśli nie ma wycieków, uszkodzony jest wyłącznik ciśnieniowy lub zawory pompy." }
                ]
            },
            "leak_fix_general": {
                title: { en: "Locate and Fix Leak", pl: "Zlokalizuj i napraw wyciek" },
                description: { en: "Water is escaping the system.", pl: "Woda ucieka z układu." },
                steps: [
                    { en: "Dry the area and watch for the source.", pl: "Wytrzyj obszar do sucha i obserwuj źródło." },
                    { en: "Tighten hose clamps or replace cracked fittings.", pl: "Dokręć opaski lub wymień pęknięte złączki." }
                ]
            }
        }
    },"""

# 3. Perform replacements
# Use regex to find the blocks and replace them
content = re.sub(r'"overheating_master":\s*\{.*?\n\s*\},\s*"overheating_master_legacy":\s*\{.*?\n\s*\}', new_overheating_tree, content, flags=re.DOTALL)

# If the above failed (e.g. legacy not found), try replacing just overheating_master
if '"overheating_master": {' not in content:
    # Fallback: find by the tree_id
    content = re.sub(r'"overheating_master":\s*\{.*?\n\s*\}', new_overheating_tree, content, flags=re.DOTALL)

# Replace plumbing_core
content = re.sub(r'"plumbing_core":\s*\{.*?\n\s*\},', plumbing_logic, content, flags=re.DOTALL)

# 4. Final encoding fixes for common corrupted words
word_fixes = {
    'si': 'się',
    'ruba': 'śruba',
    'ruba': 'śruba',
    'Ktra': 'Która',
    'Ktra': 'Która',
    'cz': 'część',
    'cz': 'część',
    'peny': 'pełny',
    'peny': 'pełny',
    'Pena': 'Pełna',
    'pena': 'pełna',
    'zawr': 'zawór',
    'zawr': 'zawór',
    'znalazem': 'znalazłem',
    'znalazem': 'znalazłem',
    'pokryw': 'pokrywę',
    'pokryw': 'pokrywę',
    'pomp': 'pompę',
    'pomp': 'pompę',
    'opatki': 'łopatki',
    'opatki': 'łopatki',
    'ciepa': 'ciepła',
    'ciepa': 'ciepła',
    'mieci': 'śmieci',
    'mieci': 'śmieci',
    'wejciu': 'wejściu',
    'wejciu': 'wejściu',
    'zaci': 'zaciął',
    'zaci': 'zaciął',
    'zamknity': 'zamknięty',
    'zamknity': 'zamknięty',
    'gra': 'góra',
    'gra': 'góra',
    'w': 'wąż',
    'w': 'wąż',
    'odrodkowe': 'odśrodkowe',
    'odrodkowe': 'odśrodkowe',
    'bezpieczestwa': 'bezpieczeństwa',
    'bezpieczestwa': 'bezpieczeństwa',
    'sprawd': 'sprawdź',
    'Sprawd': 'Sprawdź',
    'sprawdz': 'sprawdź',
    'Sprawdz': 'Sprawdź',
    'Usu': 'Usuń',
    'Usu': 'Usuń',
    'usu': 'usuń',
    'usu': 'usuń',
    'wyj': 'wyjąć',
    'wyj': 'wyjąć',
    'wyciekw': 'wycieków',
    'wyciekw': 'wycieków',
    'zaciekw': 'zacieków',
    'zaciekkw': 'zacieków',
    'siLNIK': 'SILNIK',
    'GORCY': 'GORĄCY',
    'GORCY': 'GORĄCY',
    'otwieraJ': 'otwieraj',
    'GdY': 'GDY',
    'wSZYSTKIE': 'WSZYSTKIE',
    'Otwrz': 'Otwórz',
    'Otwrz': 'Otwórz',
    'otwrz': 'otwórz',
    'otwrz': 'otwórz',
    'rczka': 'rączka',
    'rczka': 'rączka',
    'rczk': 'rączkę',
    'rczk': 'rączkę',
    'wach': 'wężach',
    'wach': 'wężach',
    'napity': 'napięty',
    'napity': 'napięty',
    'cay': 'cały',
    'cay': 'cały',
    'koo': 'koło',
    'koo': 'koło',
    'krci': 'kręci',
    'krci': 'kręci',
    'mao': 'mało',
    'mao': 'mało',
    'grny': 'górny',
    'grny': 'górny',
    'gorcy': 'gorący',
    'gorcy': 'gorący',
    'wyg lda': 'wygląda',
    'wyglda': 'wygląda',
    'obronita': 'obrośnięta',
    'obronita': 'obrośnięta',
    'd': 'łódź',
    'd': 'łódź',
    'przeadowana': 'przeładowana',
    'przeadowana': 'przeładowana',
    'zewntrz': 'zewnątrz',
    'zewntrz': 'zewnątrz',
    'kaduba': 'kadłuba',
    'kaduba': 'kadłuba',
    'pkle': 'pąkle',
    'pkle': 'pąkle',
    'Moliwe': 'Możliwe',
    'Moliwe': 'Możliwe',
    'Sprawdzi': 'Sprawdzić',
    'Sprawdzi': 'Sprawdzić',
    'sprawdzi': 'sprawdzić',
    'sprawdzi': 'sprawdzić',
    'Wymie': 'Wymień',
    'Wymie': 'Wymień',
    'wymie': 'wymień',
    'wymie': 'wymień',
    'Kawaki': 'Kawałki',
    'kawaki': 'kawałki',
    'popyn': 'popłyną',
    'popyn': 'popłyną',
    'uywajc': 'używając',
    'uywajc': 'używając',
    'myda': 'mydła',
    'myda': 'mydła',
    'Wyczy': 'Wyczyść',
    'Wyczy': 'Wyczyść',
    'wyczy': 'wyczyść',
    'wyczy': 'wyczyść',
    'Uyj': 'Użyj',
    'Uyj': 'Użyj',
    'uyj': 'użyj',
    'uyj': 'użyj',
    'dugich': 'długich',
    'dugich': 'długich',
    'przepucz': 'przepłucz',
    'przepucz': 'przepłucz',
    'sodk': 'słodką',
    'sodk': 'słodką',
    'moliwe': 'możliwe',
    'moliwe': 'możliwe',
    'uszczelk': 'uszczelkę',
    'uszczelk': 'uszczelkę',
    'Odkamie': 'Odkamień',
    'Odkamie': 'Odkamień',
    'odkamie': 'odkamień',
    'odkamie': 'odkamień',
    'wewntrz': 'wewnątrz',
    'wewntrz': 'wewnątrz',
    'rodek': 'środek',
    'rodek': 'środek',
    'dokadnie': 'dokładnie',
    'dokadnie': 'dokładnie',
    'Udronij': 'Udrożnij',
    'Udronij': 'Udrożnij',
    'udronij': 'udrożnij',
    'udronij': 'udrożnij',
    'oczyci': 'oczyścić',
    'oczyci': 'oczyścić',
    'dmuchn': 'dmuchnąć',
    'dmuchn': 'dmuchnąć',
    'mierdzi': 'śmierdzi',
    'mierdzi': 'śmierdzi',
    'nieszczelno': 'nieszczelność',
    'nieszczelno': 'nieszczelność',
    'dokr': 'dokręć',
    'dokr': 'dokręć',
    'rwnolegle': 'równolegle',
    'rwnolegle': 'równolegle',
    'wa': 'węża',
    'wa': 'węża',
}

for old, new in word_fixes.items():
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated overheating and plumbing trees and fixed encoding issues.")
