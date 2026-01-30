const { validateDiagnosticTree } = require("../marine_specifics.js");
const blackSmokePath = require("../diagnostic_paths/diesel_core/black_smoke_under_load.js");

const errors = validateDiagnosticTree(blackSmokePath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
