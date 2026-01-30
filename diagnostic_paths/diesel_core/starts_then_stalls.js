const diesel_engine_core_stall_tree = {
  tree_id: "starts_then_stalls",
  metadata: {
    title: { en: "Marine Diesel Engine Diagnostic", pl: "Diagnostyka Silnika Diesel" },
    version: "1.0.0",
    engine_type: "diesel"
  },
  start_node: "engine_start_check",
  nodes: {
    engine_start_check: {
      question: {
        en: "Does the engine start and stall within 10–60 seconds?",
        pl: "Czy silnik startuje i gaśnie w ciągu 10–60 sekund?"
      },
      answers: [
        {
          text: { en: "Yes, stalls quickly after start", pl: "Tak, gaśnie krótko po starcie" },
          type: "confirm",
          next: { type: "node", id: "stall_entry" }
        },
        {
          text: { en: "No, different behavior", pl: "Nie, inny objaw" },
          type: "exclude",
          next: { type: "solution", id: "expert_required" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    stall_entry: {
      question: {
        en: "Did the stall occur at idle or under load?",
        pl: "Czy zgaśnięcie nastąpiło na biegu jałowym czy pod obciążeniem?"
      },
      answers: [
        {
          text: { en: "Idle/neutral", pl: "Jałowy/neutralny" },
          type: "confirm",
          next: { type: "node", id: "air_ingress_check" }
        },
        {
          text: { en: "Under load", pl: "Pod obciążeniem" },
          type: "confirm",
          next: { type: "node", id: "tank_vent_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    tank_vent_check: {
      question: {
        en: "After stall, is there vacuum hiss when opening fuel tank cap?",
        pl: "Po zgaśnięciu, czy słychać syk podciśnienia przy otwieraniu korka zbiornika?"
      },
      answers: [
        {
          text: { en: "Yes, vacuum present", pl: "Tak, obecne podciśnienie" },
          type: "confirm",
          next: { type: "solution", id: "sol_open_tank_vent" }
        },
        {
          text: { en: "No vacuum", pl: "Brak podciśnienia" },
          type: "exclude",
          next: { type: "node", id: "prefilter_bowl_level_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    prefilter_bowl_level_check: {
      question: {
        en: "Does the pre-filter bowl level drop during run, then recover at idle?",
        pl: "Czy poziom w misce prefiltrowej spada podczas pracy, a wraca na jałowym?"
      },
      answers: [
        {
          text: { en: "Yes, level drops and recovers", pl: "Tak, poziom spada i wraca" },
          type: "confirm",
          next: { type: "node", id: "air_ingress_check" }
        },
        {
          text: { en: "Level stable", pl: "Poziom stabilny" },
          type: "exclude",
          next: { type: "node", id: "lift_pump_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    air_ingress_check: {
      question: {
        en: "Is air visible in fuel lines or bubbles at bleed points?",
        pl: "Czy w przewodach paliwowych widać powietrze lub pęcherzyki przy odpowietrzaniu?"
      },
      answers: [
        {
          text: { en: "Yes, air present", pl: "Tak, obecne powietrze" },
          type: "confirm",
          next: { type: "solution", id: "sol_bleed_air_restart" }
        },
        {
          text: { en: "No air present", pl: "Brak powietrza" },
          type: "exclude",
          next: { type: "node", id: "return_line_blockage_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    lift_pump_check: {
      question: {
        en: "Does manual priming restore running temporarily or is the lift pump leaking?",
        pl: "Czy ręczne zasilanie przywraca chwilowo pracę lub czy pompa podająca przecieka?"
      },
      answers: [
        {
          text: { en: "Manual priming helps or leakage found", pl: "Ręczne zasilanie pomaga lub wykryto wyciek" },
          type: "confirm",
          next: { type: "solution", id: "sol_replace_lift_pump" }
        },
        {
          text: { en: "No effect and no leaks", pl: "Brak efektu i brak wycieków" },
          type: "exclude",
          next: { type: "node", id: "control_power_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    return_line_blockage_check: {
      question: {
        en: "Is the return line restricted causing backpressure to stall?",
        pl: "Czy przewód powrotu paliwa jest ograniczony, powodując wzrost ciśnienia i zgaśnięcie?"
      },
      answers: [
        {
          text: { en: "Restriction suspected", pl: "Podejrzenie ograniczenia" },
          type: "confirm",
          next: { type: "solution", id: "sol_clear_return_blockage" }
        },
        {
          text: { en: "Return seems clear", pl: "Powrót wydaje się drożny" },
          type: "exclude",
          next: { type: "node", id: "control_power_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    control_power_check: {
      question: {
        en: "Is control power stable to stop solenoid and sensors during run?",
        pl: "Czy zasilanie sterowania do elektrozaworu stop i czujników jest stabilne podczas pracy?"
      },
      answers: [
        {
          text: { en: "Control power intermittent", pl: "Zasilanie sterowania przerywane" },
          type: "confirm",
          next: { type: "solution", id: "sol_service_stop_solenoid" }
        },
        {
          text: { en: "Power stable", pl: "Zasilanie stabilne" },
          type: "exclude",
          next: { type: "node", id: "safety_shutdown_retrigger_check" }
        },
        {
          text: { en: "Don't know / Can't check", pl: "Nie wiem / Nie mogę sprawdzić" },
          type: "cant_check",
          next: { type: "solution", id: "expert_required" }
        }
      ]
    },
    safety_shutdown_retrigger_check: {
      question: {
        en: "Did any safety shutdown retrigger (oil pressure, temp) during stall event?",
        pl: "Czy którykolwiek wyłącznik bezpieczeństwa zadziałał ponownie (ciśnienie oleju, temperatura) podczas zgaśnięcia?"
      },
      answers: [
        {
          text: { en: "Shutdown retriggered", pl: "Wyłączenie ponownie zadziałało" },
          type: "terminate",
          next: { type: "solution", id: "sol_reset_emergency_shutdown_stall" }
        },
        {
          text: { en: "No shutdown retrigger", pl: "Brak ponownego zadziałania" },
          type: "exclude",
          next: { type: "solution", id: "sol_request_mechanical_inspection" }
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
    sol_open_tank_vent: {
      title: { en: "Open or Clear Tank Vent", pl: "Otwórz lub Udrożnij Odpowietrzenie Zbiornika" },
      description: {
        en: "Vacuum in tank caused fuel starvation under load.",
        pl: "Podciśnienie w zbiorniku spowodowało głód paliwa pod obciążeniem."
      },
      steps: [
        { en: "Open/clear vent; test under load.", pl: "Otwórz/udrożnij odpowietrznik; test pod obciążeniem." },
        { en: "Inspect vent line for kinks or blockages.", pl: "Sprawdź przewód odpowietrzenia pod kątem zagięć i blokad." }
      ],
      is_temporary: false
    },
    sol_bleed_air_restart: {
      title: { en: "Bleed Air and Restart", pl: "Odpowietrz i Uruchom Ponownie" },
      description: {
        en: "Air ingress caused rapid stall after start.",
        pl: "Dostanie się powietrza spowodowało szybkie zgaśnięcie po starcie."
      },
      steps: [
        { en: "Bleed at filters and pump.", pl: "Odpowietrz przy filtrach i pompie." },
        { en: "Seal fittings; check transparent sections for bubbles.", pl: "Uszczelnij złączki; sprawdź przezroczyste odcinki na pęcherzyki." }
      ],
      is_temporary: false
    },
    sol_replace_lift_pump: {
      title: { en: "Replace Lift/Feed Pump", pl: "Wymień Pompę Zasilającą" },
      description: {
        en: "Weak or leaking lift pump leads to starvation and stall.",
        pl: "Słaba lub cieknąca pompa zasilająca powoduje głód paliwa i zgaśnięcie."
      },
      steps: [
        { en: "Replace pump; verify prime holds.", pl: "Wymień pompę; zweryfikuj utrzymanie zasilania." },
        { en: "Check for diaphragm failure and leaks.", pl: "Sprawdź uszkodzenie membrany i wycieki." }
      ],
      is_temporary: false
    },
    sol_clear_return_blockage: {
      title: { en: "Clear Fuel Return Blockage", pl: "Udrożnij Powrót Paliwa" },
      description: {
        en: "Blocked return raises rail pressure causing stall.",
        pl: "Zablokowany powrót podnosi ciśnienie listwy powodując zgaśnięcie."
      },
      steps: [
        { en: "Inspect and clear return path.", pl: "Sprawdź i udrożnij przewód powrotny." },
        { en: "Verify free flow to tank.", pl: "Zweryfikuj swobodny przepływ do zbiornika." }
      ],
      is_temporary: false
    },
    sol_service_stop_solenoid: {
      title: { en: "Service Stop Solenoid/Control Power", pl: "Serwis Elektrozaworu Stop/Zasilania Sterowania" },
      description: {
        en: "Intermittent control power causes shutoff after start.",
        pl: "Przerywane zasilanie sterowania powoduje wyłączenie po starcie."
      },
      steps: [
        { en: "Test solenoid hold-in; check connectors.", pl: "Przetestuj podtrzymanie zaworu; sprawdź złącza." },
        { en: "Secure grounds; inspect sensor feeds.", pl: "Zabezpiecz masy; sprawdź zasilanie czujników." }
      ],
      is_temporary: false
    },
    sol_reset_emergency_shutdown_stall: {
      title: { en: "Reset Safety Shutdown After Stall", pl: "Zresetuj Wyłączenie Bezpieczeństwa po Zgaśnięciu" },
      description: {
        en: "Safety shutdown retriggered; address root and reset.",
        pl: "Wyłączenie bezpieczeństwa zadziałało ponownie; usuń przyczynę i zresetuj."
      },
      steps: [
        { en: "Verify oil pressure and temperature.", pl: "Zweryfikuj ciśnienie oleju i temperaturę." },
        { en: "Reset shutdown lever/button.", pl: "Zresetuj dźwignię/przycisk wyłączenia." }
      ],
      is_temporary: false
    },
    sol_request_mechanical_inspection: {
      title: { en: "Request Mechanical Inspection", pl: "Zleć Inspekcję Mechaniczną" },
      description: {
        en: "Stall cause not confirmed; mechanical inspection required.",
        pl: "Przyczyna zgaśnięcia niepotwierdzona; wymagana inspekcja mechaniczna."
      },
      steps: [
        { en: "Stop attempts and document observations.", pl: "Przerwij próby i udokumentuj obserwacje." }
      ],
      is_temporary: false
    },
    expert_required: {
      title: { en: "Expert Required", pl: "Wymagana Pomoc Eksperta" },
      description: {
        en: "Cannot determine safely with available information.",
        pl: "Nie można bezpiecznie ustalić przyczyny na podstawie dostępnych informacji."
      },
      steps: [
        { en: "Call a mechanic.", pl: "Wezwij mechanika." }
      ],
      is_temporary: false
    }
  },
  constraints: {
    entry_conditions_required: ["engine_stalls_10_60s"],
    entry_conditions_conflicting: ["engine_no_start", "engine_overheating"],
    convergence: {
      confidence_margin_threshold: 0.3,
      max_steps: 8,
      active_cause_limit: 1
    },
    priority_order: ["safety", "knockout", "elimination", "probability"]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { diesel_engine_core_stall_tree };
}


