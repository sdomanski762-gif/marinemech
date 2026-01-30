const { validateDiagnosticTree } = require("../marine_specifics.js");
const coolantPath = require("../diagnostic_paths/diesel_core/coolant_loss_pressure.js");

const errors = validateDiagnosticTree(coolantPath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
