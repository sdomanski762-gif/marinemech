const diesel_engine_core_tree = {
  tree_id: "diesel_no_start",
  metadata: {
    title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
    version: "1.0.0",
    engine_type: "diesel"
  },
  start_node: "engine_start_check",
  nodes: {
    engine_start_check: {
      question: {
        en: "Does the engine turn over (crank) but fail to start?",
        pl: "Czy silnik obraca się (kręci) ale nie zapala?"
      },
      answers: [
        {
          text: { en: "Yes, cranks but won't start", pl: "Tak, kręci się ale nie zapala" },
          type: "confirm",
          next: { type: "node", id: "fuel_system_initial" }
        },
        {
          text: { en: "No, does not crank at all", pl: "Nie, w ogóle się nie kręci" },
          type: "confirm",
          next: { type: "node", id: "electrical_supply_check" }
        },
        {
          text: { en: "Cranks very slowly or unevenly", pl: "Kręci się bardzo wolno lub nierówno" },
          type: "confirm",
          next: { type: "node", id: "battery_cranking_check" }
        },
        {
          text: { en: "Emergency shutdown suspected", pl: "Podejrzenie awaryjnego wyłączenia" },
          type: "escalate",
          next: { type: "node", id: "emergency_shutdown_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    fuel_system_initial: {
      question: {
        en: "Is there fuel in the day tank and are supply valves open?",
        pl: "Czy jest paliwo w zbiorniku dobowym i czy zawory zasilające są otwarte?"
      },
      answers: [
        {
          text: { en: "Fuel present and valves open", pl: "Paliwo jest i zawory otwarte" },
          type: "confirm",
          next: { type: "node", id: "fuel_check" }
        },
        {
          text: { en: "Low fuel or valves closed", pl: "Mało paliwa lub zawory zamknięte" },
          type: "confirm",
          next: { type: "solution", id: "sol_fuel_supply_restore" }
        },
        {
          text: { en: "Water visible in fuel", pl: "Widać wodę w paliwie" },
          type: "terminate",
          next: { type: "solution", id: "sol_water_in_fuel" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    battery_cranking_check: {
      question: {
        en: "Battery voltage during cranking attempt?",
        pl: "Napięcie akumulatora podczas próby rozruchu?"
      },
      answers: [
        {
          text: { en: "Below 9.6V (severe drop)", pl: "Poniżej 9,6V (poważny spadek)" },
          type: "confirm",
          next: { type: "solution", id: "sol_battery_charge_replace" }
        },
        {
          text: { en: "9.6V – 10.5V (marginal)", pl: "9,6V – 10,5V (na granicy)" },
          type: "confirm",
          next: { type: "node", id: "electrical_supply_check" }
        },
        {
          text: { en: "Above 10.5V (adequate)", pl: "Powyżej 10,5V (wystarczające)" },
          type: "exclude",
          next: { type: "node", id: "compression_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    fuel_air_combined: {
      question: {
        en: "During cranking, observe exhaust and sound. What do you see?",
        pl: "Podczas rozruchu obserwuj wydech i dźwięk. Co widzisz?"
      },
      answers: [
        {
          text: { en: "Normal cranking, no smoke", pl: "Normalny rozruch, brak dymu" },
          type: "confirm",
          next: { type: "node", id: "fuel_check" }
        },
        {
          text: { en: "White smoke from exhaust", pl: "Biały dym z wydechu" },
          type: "confirm",
          next: { type: "solution", id: "sol_fuel_injection_timing" }
        },
        {
          text: { en: "Black smoke from exhaust", pl: "Czarny dym z wydechu" },
          type: "confirm",
          next: { type: "node", id: "air_intake_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    emergency_shutdown_check: {
      question: {
        en: "Is any emergency shutdown engaged (lever/button, sensors)?",
        pl: "Czy awaryjne wyłączenie jest aktywne (dźwignia/przycisk, czujniki)?"
      },
      answers: [
        {
          text: { en: "Shutdown is active", pl: "Wyłączenie jest aktywne" },
          type: "terminate",
          next: { type: "solution", id: "sol_reset_emergency_shutdown" }
        },
        {
          text: { en: "Shutdown not active", pl: "Wyłączenie nie jest aktywne" },
          type: "exclude",
          next: { type: "node", id: "fuel_air_combined" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    electrical_supply_check: {
      question: {
        en: "Starter circuit and safety interlocks OK?",
        pl: "Obwód rozrusznika i blokady bezpieczeństwa OK?"
      },
      answers: [
        {
          text: { en: "Fault suspected", pl: "Podejrzenie usterki" },
          type: "confirm",
          next: { type: "solution", id: "sol_starter_circuit_fault" }
        },
        {
          text: { en: "Circuit appears OK", pl: "Obwód wydaje się OK" },
          type: "exclude",
          next: { type: "node", id: "compression_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    fuel_check: {
      question: {
        en: "Fuel delivery present at filters and bleed points?",
        pl: "Czy dostarczanie paliwa jest obecne na filtrach i odpowietrznikach?"
      },
      answers: [
        {
          text: { en: "Air in fuel present", pl: "Obecne powietrze w paliwie" },
          type: "confirm",
          next: { type: "solution", id: "sol_bleed_fuel_air" }
        },
        {
          text: { en: "Fuel flow normal", pl: "Przepływ paliwa normalny" },
          type: "exclude",
          next: { type: "node", id: "air_intake_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    air_intake_check: {
      question: {
        en: "Air intake and filter unobstructed?",
        pl: "Czy wlot powietrza i filtr są drożne?"
      },
      answers: [
        {
          text: { en: "Restriction suspected", pl: "Podejrzenie niedrożności" },
          type: "confirm",
          next: { type: "solution", id: "sol_clear_air_intake" }
        },
        {
          text: { en: "Intake appears clear", pl: "Wlot wydaje się drożny" },
          type: "exclude",
          next: { type: "node", id: "compression_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    compression_check: {
      question: {
        en: "Compression suspected low based on cranking sound/smoke?",
        pl: "Podejrzenie niskiej kompresji na podstawie dźwięku/dymu?"
      },
      answers: [
        {
          text: { en: "Yes, low compression suspected", pl: "Tak, podejrzenie niskiej kompresji" },
          type: "confirm",
          next: { type: "solution", id: "sol_low_compression_service" }
        },
        {
          text: { en: "No, compression seems adequate", pl: "Nie, kompresja wydaje się wystarczająca" },
          type: "exclude",
          next: { type: "solution", id: "expert_required" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    }
  },
  solutions: {
    sol_fuel_supply_restore: {
      title: { en: "Restore Fuel Supply", pl: "Przywróć Zasilanie Paliwem" },
      description: {
        en: "Insufficient fuel supply to injection system.",
        pl: "Niewystarczający dopływ paliwa do układu wtryskowego."
      },
      steps: [
        { en: "Refill day tank to at least half.", pl: "Uzupełnij zbiornik dobowy przynajmniej do połowy." },
        { en: "Open all supply valves.", pl: "Otwórz wszystkie zawory zasilające." },
        { en: "Bleed air from the fuel system.", pl: "Odpowietrz układ paliwowy." }
      ],
      is_temporary: false
    },
    sol_water_in_fuel: {
      title: { en: "Water in Fuel – Immediate Action", pl: "Woda w Paliwie – Natychmiast" },
      description: {
        en: "Purge water to prevent injection pump damage.",
        pl: "Usuń wodę, aby zapobiec uszkodzeniu pompy wtryskowej."
      },
      steps: [
        { en: "Stop cranking and isolate fuel.", pl: "Przerwij rozruch i odizoluj paliwo." },
        { en: "Drain water from filters/separator.", pl: "Spuść wodę z filtrów/separatora." },
        { en: "Replace fuel if contamination is heavy.", pl: "Wymień paliwo przy dużym zanieczyszczeniu." },
        { en: "Prime and bleed fully before restart.", pl: "Zasil i odpowietrz przed ponownym rozruchem." }
      ],
      is_temporary: false
    },
    sol_battery_charge_replace: {
      title: { en: "Battery Charge/Replacement", pl: "Ładowanie/Wymiana Akumulatora" },
      description: {
        en: "Low voltage prevents proper cranking speed.",
        pl: "Niskie napięcie uniemożliwia właściwą prędkość rozruchu."
      },
      steps: [
        { en: "Charge or parallel with healthy bank.", pl: "Naładuj lub połącz ze sprawną grupą." },
        { en: "Clean/tighten terminals.", pl: "Wyczyść/dokręć zaciski." },
        { en: "Replace aged batteries.", pl: "Wymień zużyte akumulatory." }
      ],
      is_temporary: false
    },
    sol_fuel_injection_timing: {
      title: { en: "Check Injection Timing", pl: "Sprawdź Rozrząd Wtrysku" },
      description: {
        en: "White smoke indicates timing issue.",
        pl: "Biały dym wskazuje problem z rozrządem wtrysku."
      },
      steps: [
        { en: "Verify timing marks alignment.", pl: "Zweryfikuj zgodność znaczników." },
        { en: "Inspect pump mounting bolts.", pl: "Sprawdź śruby mocujące pompę." },
        { en: "Check drive coupling wear.", pl: "Sprawdź zużycie sprzęgła napędu." }
      ],
      is_temporary: false
    },
    sol_reset_emergency_shutdown: {
      title: { en: "Reset Emergency Shutdown", pl: "Zresetuj Awaryjne Wyłączenie" },
      description: {
        en: "Engine locked by safety shutdown; reset after addressing cause.",
        pl: "Silnik zablokowany przez awaryjne wyłączenie; zresetuj po usunięciu przyczyny."
      },
      steps: [
        { en: "Identify shutdown cause.", pl: "Zidentyfikuj przyczynę wyłączenia." },
        { en: "Address root cause.", pl: "Usuń przyczynę źródłową." },
        { en: "Reset lever/button.", pl: "Zresetuj dźwignię/przycisk." }
      ],
      is_temporary: false
    },
    sol_starter_circuit_fault: {
      title: { en: "Starter Circuit Fault", pl: "Usterka Obwodu Rozrusznika" },
      description: {
        en: "Fault in starter circuit or interlocks.",
        pl: "Usterka w obwodzie rozrusznika lub blokadach."
      },
      steps: [
        { en: "Inspect wiring and relays.", pl: "Sprawdź okablowanie i przekaźniki." },
        { en: "Verify neutral/safety switches.", pl: "Zweryfikuj wyłączniki neutralne/bezpieczeństwa." }
      ],
      is_temporary: false
    },
    sol_bleed_fuel_air: {
      title: { en: "Bleed Air from Fuel System", pl: "Odpowietrz Układ Paliwowy" },
      description: {
        en: "Air present prevents start.",
        pl: "Powietrze uniemożliwia rozruch."
      },
      steps: [
        { en: "Use bleed screws at filters/pump.", pl: "Użyj odpowietrzników na filtrach/pompie." },
        { en: "Prime with lift/hand pump.", pl: "Zasil pompką ręczną." }
      ],
      is_temporary: false
    },
    sol_clear_air_intake: {
      title: { en: "Clear Air Intake", pl: "Udrożnij Wlot Powietrza" },
      description: {
        en: "Restricted air reduces combustion.",
        pl: "Ograniczony dopływ powietrza zmniejsza spalanie."
      },
      steps: [
        { en: "Remove filter restriction.", pl: "Usuń niedrożność filtra." },
        { en: "Inspect intake path.", pl: "Sprawdź kanał dolotowy." }
      ],
      is_temporary: false
    },
    sol_low_compression_service: {
      title: { en: "Low Compression Suspected", pl: "Podejrzenie Niskiej Kompresji" },
      description: {
        en: "Mechanical wear or sealing issue.",
        pl: "Zużycie mechaniczne lub problem z uszczelnieniem."
      },
      steps: [
        { en: "Perform leak-down/compression test.", pl: "Wykonaj test szczelności/kompresji." },
        { en: "Inspect valves/rings.", pl: "Sprawdź zawory/pierścienie." }
      ],
      is_temporary: false
    },
    expert_required: {
      title: { en: "Expert Assistance Required", pl: "Wymagana Pomoc Eksperta" },
      description: {
        en: "The issue appears to be complex and requires professional tools or deep engine knowledge.",
        pl: "Problem wydaje się złożony i wymaga profesjonalnych narzędzi lub głębokiej wiedzy o silniku."
      },
      steps: [
        { en: "Contact a qualified marine mechanic.", pl: "Skontaktuj się z wykwalifikowanym mechanikiem morskim." },
        { en: "Provide the diagnostic steps already taken to the mechanic.", pl: "Przekaż mechanikowi informacje o wykonanych już krokach diagnostycznych." },
        { en: "Avoid running the engine further to prevent potential damage.", pl: "Unikaj dalszej pracy silnika, aby zapobiec potencjalnym uszkodzeniom." }
      ],
      is_temporary: false
    }
  },
  constraints: {
    entry_conditions_required: ["engine_no_start"],
    entry_conditions_conflicting: ["engine_running_rough", "engine_overheating"],
    convergence: {
      confidence_margin_threshold: 0.3,
      max_steps: 8,
      active_cause_limit: 1
    },
    priority_order: ["safety", "knockout", "elimination", "probability"]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { diesel_engine_core_tree };
}


