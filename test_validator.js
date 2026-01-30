
const { validateDiagnosticTree } = require('./marine_specifics.js');

/**
 * Test Runner Utility
 */
function runTest(name, tree, expectedErrorsCount, expectedErrorSnippets = []) {
    console.log(`Running Test: ${name}`);
    const errors = validateDiagnosticTree(tree);
    
    let passed = true;
    
    // Check error count
    if (errors.length !== expectedErrorsCount) {
        console.error(`  FAILED: Expected ${expectedErrorsCount} errors, but got ${errors.length}.`);
        passed = false;
    }

    // Check for specific error snippets in the structured error messages
    expectedErrorSnippets.forEach(snippet => {
        const found = errors.some(err => {
            const fullErrorText = JSON.stringify(err).toLowerCase();
            return fullErrorText.includes(snippet.toLowerCase());
        });
        if (!found) {
            console.error(`  FAILED: Could not find error containing "${snippet}".`);
            passed = false;
        }
    });

    if (passed) {
        console.log(`  PASSED`);
    } else {
        console.log(`  Current Errors:`, JSON.stringify(errors, null, 2));
    }
    console.log('-----------------------------------');
    return passed;
}

// 1. Valid Tree Test
const validTree = {
    tree_id: "valid_001",
    start_node: "node_1",
    metadata: {
        title: { en: "Valid Tree", pl: "Prawidłowe Drzewo" },
        version: "1.0",
        engine_type: "diesel"
    },
    nodes: {
        "node_1": {
            question: { en: "Is it working?", pl: "Czy działa?" },
            answers: [
                { text: { en: "Yes", pl: "Tak" }, type: "standard", next: { type: "solution", id: "sol_1" } },
                { text: { en: "No", pl: "Nie" }, type: "cant_check", next: { type: "node", id: "node_2" } }
            ]
        },
        "node_2": {
            question: { en: "Step 2?", pl: "Krok 2?" },
            answers: [
                { text: { en: "Skip", pl: "Pomiń" }, type: "cant_check", next: { type: "solution", id: "sol_1" } }
            ]
        }
    },
    solutions: {
        "sol_1": {
            title: { en: "Fix", pl: "Napraw" },
            description: { en: "Description", pl: "Opis" },
            steps: [{ en: "Step 1", pl: "Krok 1" }]
        }
    }
};

// 2. Missing 'cant_check' Test
const missingCantCheckTree = JSON.parse(JSON.stringify(validTree));
delete missingCantCheckTree.nodes.node_1.answers[1];
missingCantCheckTree.nodes.node_1.answers = missingCantCheckTree.nodes.node_1.answers.filter(a => a);

// 3. Dangling Reference Test
const danglingRefTree = JSON.parse(JSON.stringify(validTree));
danglingRefTree.nodes.node_1.answers[0].next.id = "non_existent_sol";

// 4. Infinite Loop Test
const loopTree = JSON.parse(JSON.stringify(validTree));
loopTree.nodes.node_2.answers[0] = { 
    text: { en: "Back", pl: "Wstecz" }, 
    type: "cant_check", 
    next: { type: "node", id: "node_1" } 
};

// 5. Deep Tree Test (7 levels)
const deepTree = {
    tree_id: "deep_001",
    metadata: validTree.metadata,
    nodes: {},
    solutions: { "sol_final": validTree.solutions.sol_1 }
};
for (let i = 1; i <= 7; i++) {
    deepTree.nodes[`n${i}`] = {
        question: { en: `Q${i}`, pl: `P${i}` },
        answers: [
            { text: { en: "Next", pl: "Dalej" }, type: "standard", next: { type: i < 7 ? "node" : "solution", id: i < 7 ? `n${i+1}` : "sol_final" } },
            { text: { en: "Skip", pl: "Pomiń" }, type: "cant_check", next: { type: "solution", id: "sol_final" } }
        ]
    };
}

// 6. Missing Localization Test
const missingLocTree = JSON.parse(JSON.stringify(validTree));
delete missingLocTree.nodes.node_1.question.pl;
delete missingLocTree.solutions.sol_1.title.en;

// RUN TESTS
console.log("Starting Diagnostic Validator Test Suite...\n");

let allPassed = true;
    allPassed &= runTest("Valid Tree", validTree, 0);
    allPassed &= runTest("Missing 'cant_check'", missingCantCheckTree, 1, ["STRUCTURE", "cant_check"]);
    allPassed &= runTest("Dangling Reference", danglingRefTree, 1, ["REFERENCE", "non_existent_sol"]);
    allPassed &= runTest("Infinite Loop", loopTree, 1, ["FLOW", "Infinite loop"]);
    allPassed &= runTest("Max Depth Exceeded (7 levels)", deepTree, 1, ["FLOW", "Max depth"]);
    allPassed &= runTest("Missing Localization", missingLocTree, 2, ["LOCALIZATION", "question", "title"]);

if (allPassed) {
    console.log("\nALL TESTS PASSED SUCCESSFULLY!");
} else {
    console.error("\nSOME TESTS FAILED. CHECK LOGS.");
    process.exit(1);
}
