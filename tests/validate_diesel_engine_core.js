const { validateDiagnosticTree } = require("../marine_specifics.js");
const { diesel_engine_core_tree } = require("../diagnostic_paths/diesel_core/engine_no_start.js");

const errors = validateDiagnosticTree(diesel_engine_core_tree);
if (!errors || errors.length === 0) {
  console.log("VALID");
} else {
  console.log("ERRORS");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
