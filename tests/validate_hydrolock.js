const { validateDiagnosticTree } = require("../marine_specifics.js");
const hydrolockPath = require("../diagnostic_paths/diesel_core/suspected_hydrolock.js");

const errors = validateDiagnosticTree(hydrolockPath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
