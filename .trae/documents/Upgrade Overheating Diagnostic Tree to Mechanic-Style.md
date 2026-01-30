# Overheating Diagnostic Tree Upgrade (Mechanic-Style)

The current overheating diagnostic is fragmented and lacks critical mechanical checks. I will restructure it to follow a professional marine mechanic's logical flow.

## 1. Unified Diagnostic Flow
I will upgrade the `raw_water_diagnostic` in [FOUNDATIONV1.html](file:///g:/TRAE%20APPS/nowy%20app/FOUNDATIONV1.html) to become the **Master Overheating Diagnostic**. It will follow this logic:
- **Phase 1: Observation** - Start at the exhaust (Water flow? Steam? Temperature?).
- **Phase 2: Branching** - 
    - **Path A: No/Low Water** -> Intake -> Strainer -> Pump/Impeller -> Heat Exchanger (Inlet).
    - **Path B: Water is Flowing** -> Heat Exchanger (Efficiency) -> Thermostat -> Fresh Water Coolant -> Exhaust Elbow.
- **Phase 3: High-Level Factors** - Propeller fouling (load), air intake blockage, etc.

## 2. New Mechanical Nodes
I will add specific nodes for:
- **Heat Exchanger**: Checking for clogged tubes (impeller bits) or scale buildup.
- **Thermostat**: Testing the valve opening temperature.
- **Coolant Level (Fresh Water)**: Checking the header tank and pressure cap.
- **Exhaust Elbow (Mixing Elbow)**: Integrated more deeply into the main flow for backpressure checks.

## 3. Fixing Navigation & Dead Ends
- Ensure every answer (including "I don't know") leads to a helpful next step or a detailed solution instead of just "Expert Required".
- Bridge the gap between general diesel diagnostics and specialized sub-trees like `drive_belt_core` and `exhaust_elbow_core`.

## 4. Enhanced Solutions
Add detailed repair steps for:
- Cleaning heat exchanger tubes.
- Thermostat testing/replacement.
- Clearing external intake blockages (outside the hull).

Do you want me to proceed with this overhaul?
