const logicTreeTemplate = {
  tree_id: "",
  metadata: {
    title: { en: "", pl: "" },
    version: "1.0.0",
    engine_type: ""
  },
  start_node: "start",
  nodes: {
    start: {
      question: { en: "", pl: "" },
      answers: [
        {
          text: { en: "", pl: "" },
          type: "confirm",
          next: { type: "solution", id: "sol_confirm" }
        },
        {
          text: { en: "", pl: "" },
          type: "exclude",
          next: { type: "node", id: "next_node" }
        },
        {
          text: { en: "", pl: "" },
          type: "escalate",
          next: { type: "node", id: "next_node" }
        },
        {
          text: { en: "", pl: "" },
          type: "terminate",
          next: { type: "solution", id: "sol_terminate" }
        },
        {
          text: { en: "", pl: "" },
          type: "cant_check",
          next: { type: "solution", id: "sol_safety" }
        }
      ]
    }
  },
  solutions: {
    sol_confirm: {
      title: { en: "", pl: "" },
      description: { en: "", pl: "" },
      steps: [{ en: "", pl: "" }]
    },
    sol_terminate: {
      title: { en: "", pl: "" },
      description: { en: "", pl: "" },
      steps: [{ en: "", pl: "" }],
      is_temporary: false
    },
    sol_safety: {
      title: { en: "", pl: "" },
      description: { en: "", pl: "" },
      steps: [{ en: "", pl: "" }],
      is_temporary: true
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { logicTreeTemplate };
}
