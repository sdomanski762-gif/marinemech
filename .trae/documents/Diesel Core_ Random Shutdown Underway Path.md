## Implementation Plan: Random Shutdown Underway

### 1. File Creation
- Create `diagnostic_paths/diesel_core/random_shutdown_underway.js` as part of the `diesel_engine_core` tree.

### 2. Logic Attachment
- Update (or define in context) the `engine_start_check` node to include:
  - **Answer**: "Engine shut down randomly while underway"
  - **Target**: `shutdown_entry` node.

### 3. Node Definitions (Deterministic Path)
- **`shutdown_entry`**: Safety-first check for smoke, sparks, or intense heat.
  - *Yes* -> `sol_emergency_safety_stop` (Terminate).
  - *No* -> `alarm_status_check`.
- **`alarm_status_check`**: Were any alarms (Temp/Oil) active?
  - *Temp* -> `thermal_seizure_check`.
  - *Oil* -> `lube_system_check`.
  - *None/Unknown* -> `shutdown_behavior_check`.
- **`shutdown_behavior_check`**: Abrupt (like turning off key) vs. Struggling/Slowing down.
  - *Abrupt* -> `stop_circuit_stability`.
  - *Struggling* -> `fuel_starvation_underway`.
- **`stop_circuit_stability`**: Check stop solenoid wiring and relay.
- **`fuel_starvation_underway`**: Check for fuel tank vacuum or sudden pre-filter blockage.

### 4. Safety & Precision
- Every node will include a `cant_check` option routing to `expert_required`.
- `safety_stop: true` will be applied to all catastrophic failure branches.
- Use `knockout: others` to confirm definitive safety failures.

### 5. Solutions
- Define specific solutions for:
  - Thermal shutdown (Cooling failure).
  - Low oil pressure shutdown.
  - Intermittent electrical stop (Solenoid/Relay).
  - Tank vent/Vacuum starvation.
  - Propeller entanglement (Drivetrain overload).