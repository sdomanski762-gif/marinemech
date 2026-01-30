const { validateDiagnosticTree } = require("../marine_specifics.js");
const fuelStarvePath = require("../diagnostic_paths/diesel_core/fuel_starvation_high_rpm.js");

const errors = validateDiagnosticTree(fuelStarvePath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
