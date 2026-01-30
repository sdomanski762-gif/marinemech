
const { validateDiagnosticTree } = require('./marine_specifics.js');

function createLargeComplexTree(depth, breadth) {
    const tree = {
        tree_id: "perf_test_tree",
        metadata: {
            title: { en: "Perf Test", pl: "Test Wydajności" },
            version: "1.0",
            engine_type: "diesel"
        },
        start_node: "node_0_0",
        nodes: {},
        solutions: {
            "sol_end": {
                title: { en: "End", pl: "Koniec" },
                description: { en: "End", pl: "Koniec" },
                steps: [{ en: "Step", pl: "Krok" }]
            }
        }
    };

    // Create a DAG where many nodes point to the same downstream nodes
    // This is the worst case for non-memoized DFS
    for (let d = 0; d <= depth; d++) {
        for (let b = 0; b < breadth; b++) {
            const nodeId = `node_${d}_${b}`;
            const answers = [];
            
            // Each node points to all nodes in the next layer
            if (d < depth) {
                for (let nextB = 0; nextB < breadth; nextB++) {
                    answers.push({
                        text: { en: `Next ${nextB}`, pl: `Dalej ${nextB}` },
                        type: "standard",
                        next: { type: "node", id: `node_${d+1}_${nextB}` }
                    });
                }
            } else {
                answers.push({
                    text: { en: "Solution", pl: "Rozwiązanie" },
                    type: "standard",
                    next: { type: "solution", id: "sol_end" }
                });
            }

            // Add mandatory cant_check
            answers.push({
                text: { en: "Cant check", pl: "Nie mogę" },
                type: "cant_check",
                next: { type: "solution", id: "sol_end" }
            });

            tree.nodes[nodeId] = {
                question: { en: `Question ${d}-${b}`, pl: `Pytanie ${d}-${b}` },
                answers: answers
            };
        }
    }

    return tree;
}

console.log("Creating large synthetic tree...");
const largeTree = createLargeComplexTree(5, 10); // 6 layers, breadth 10 -> many paths!
console.log(`Nodes: ${Object.keys(largeTree.nodes).length}`);

console.log("Running validator...");
const start = Date.now();
const errors = validateDiagnosticTree(largeTree);
const end = Date.now();

console.log(`Validation finished in ${end - start}ms`);
console.log(`Errors found: ${errors.length}`);
if (errors.length > 0) {
    console.log("First 3 errors:", errors.slice(0, 3));
}
