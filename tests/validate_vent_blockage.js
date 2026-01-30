const { validateDiagnosticTree } = require("../marine_specifics.js");
const ventBlockagePath = require("../diagnostic_paths/diesel_core/fuel_tank_vent_blockage.js");

const errors = validateDiagnosticTree(ventBlockagePath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
