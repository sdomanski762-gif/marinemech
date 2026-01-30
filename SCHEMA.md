# Diagnostic Tree Data Contract & Rules

This document defines the strict JSON schema and logical rules for creating diagnostic trees in the MarineMech application.

## 1. Core Structure Requirements

Every tree must be a JSON object containing the following top-level fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `tree_id` | `string` | Unique identifier (e.g., `diesel_fuel_system`). |
| `start_node` | `string` | The ID of the first node to display. |
| `metadata` | `object` | Versioning and descriptive information. |
| `nodes` | `object` | Map of all questions/steps. |
| `solutions` | `object` | Map of all possible outcomes. |

### Metadata
- `title`: Object with `en` and `pl` keys (Required).
- `version`: String (e.g., `"1.0"`).
- `engine_type`: One of `"diesel"`, `"gasoline"`, or `"electrical"`.

## 2. Localization Rules (EN + PL)

**Bilingual text is mandatory.** The validator will fail if any of these fields are missing either `en` or `pl` translations:
- `metadata.title`
- `nodes[id].question`
- `nodes[id].context` (if provided)
- `nodes[id].answers[i].text`
- `solutions[id].title`
- `solutions[id].description`
- `solutions[id].steps[i]` (both keys `en` and `pl` per step object)

## 3. Nodes and Answers

### Node Object
- `question`: `{ "en": "...", "pl": "..." }`
- `answers`: Array of Answer objects.

### Answer Object
- `text`: `{ "en": "...", "pl": "..." }`
- `type`: Either `"standard"` or `"cant_check"`.
- `next`: Object defining the target:
  - `type`: `"node"` or `"solution"`.
  - `id`: The ID of the target.
- `probability`: (Optional) Float between `0.0` and `1.0`.

### The 'cant_check' Mandate
**Every node must have at least one answer with `type: "cant_check"`.** This ensures that if a user is unable to perform a physical check (e.g., they don't have a multimeter), the diagnostic flow can still provide a safe fallback path or solution.

## 4. Constraints & Validation

- **Max Depth**: No path from `start_node` to a solution may exceed **6 levels**.
- **Infinite Loops**: The validator performs recursive traversal; loops will fail the build.
- **Dangling References**: Every `next.id` must point to an existing entry in `nodes` or `solutions`.

## 5. Examples

### Valid Minimal Tree
```json
{
  "tree_id": "minimal_example",
  "start_node": "q1",
  "metadata": {
    "title": { "en": "Quick Check", "pl": "Szybki Test" },
    "version": "1.0",
    "engine_type": "diesel"
  },
  "nodes": {
    "q1": {
      "question": { "en": "Is it on?", "pl": "Czy włączone?" },
      "answers": [
        { 
          "text": { "en": "Yes", "pl": "Tak" }, 
          "type": "standard", 
          "next": { "type": "solution", "id": "s1" } 
        },
        { 
          "text": { "en": "I can't tell", "pl": "Nie wiem" }, 
          "type": "cant_check", 
          "next": { "type": "solution", "id": "s1" } 
        }
      ]
    }
  },
  "solutions": {
    "s1": {
      "title": { "en": "Result", "pl": "Wynik" },
      "description": { "en": "Desc", "pl": "Opis" },
      "steps": [
        { "en": "Step 1", "pl": "Krok 1" }
      ]
    }
  }
}
```

## 6. Common Mistakes to Avoid
1. **Missing 'cant_check'**: Forgetting to add a fallback for users without tools.
2. **Partial Localization**: Providing `pl` text but skipping `en`.
3. **Circular Logic**: Creating a path that returns to a previous node without reaching a solution.
4. **Incorrect Target Type**: Setting `next.type` to `"node"` but providing a `solution_id`.
