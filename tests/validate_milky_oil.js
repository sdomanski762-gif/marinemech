const { validateDiagnosticTree } = require("../marine_specifics.js");
const milkyOilPath = require("../diagnostic_paths/diesel_core/milky_oil_diagnostic.js");

const errors = validateDiagnosticTree(milkyOilPath);
if (!errors || errors.length === 0) {
  console.log("VALIDATION_PASSED");
} else {
  console.log("VALIDATION_FAILED");
  errors.forEach(e => {
    console.log(`[${e.type}] ${e.id}${e.path ? " " + e.path : ""}: ${e.message}`);
  });
}
