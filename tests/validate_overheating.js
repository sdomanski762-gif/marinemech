const { validateDiagnosticTree } = require("../marine_specifics.js");
const overheatingPath = require("../diagnostic_paths/diesel_core/rapid_overheating_start.js");

const errors = validateDiagnosticTree(overheatingPath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
