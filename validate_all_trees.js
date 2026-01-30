const fs = require('fs');
const path = require('path');
const { validateDiagnosticTree } = require('./marine_specifics.js');

/**
 * CI Validation Script for Diagnostic Trees
 * Scans directories for tree files and validates them.
 */

const CONFIG = {
    searchDirs: [
        './systems_knowledge',
        './logic_inputs',
        './diagnostic_paths'
    ],
    fileExtensions: ['.json', '.js'], // CI primarily checks structured data
    maxDepth: 6
};

let totalTrees = 0;
let totalErrors = 0;

function log(msg) { console.log(`[CI-VALIDATOR] ${msg}`); }
function logError(msg) { console.error(`[CI-VALIDATOR] ERROR: ${msg}`); }

/**
 * Validates a single tree object
 */
function validateTree(tree, filePath) {
    totalTrees++;
    const treeId = tree.tree_id || tree.id || path.basename(filePath);
    log(`Validating tree: ${treeId} (${filePath})`);
    
    const errors = validateDiagnosticTree(tree);
    
    if (errors.length > 0) {
        logError(`Tree '${treeId}' failed validation with ${errors.length} errors:`);
        errors.forEach(err => {
            const pathInfo = err.path ? ` at ${err.path}` : '';
            console.error(`  - [${err.type}] ${err.id}${pathInfo}: ${err.message}`);
        });
        totalErrors += errors.length;
        return false;
    }
    
    log(`Tree '${treeId}' passed.`);
    return true;
}

/**
 * Recursively find files in directories
 */
function getFiles(dir, extList) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, extList));
        } else {
            if (extList.includes(path.extname(file))) {
                results.push(file);
            }
        }
    });
    return results;
}

/**
 * Main execution
 */
function run() {
    log('Starting CI validation...');
    
    // 1. Check hardcoded trees in marine_specifics.js
    const { diagnosticTrees, productionTrees } = require('./marine_specifics.js');
    if (diagnosticTrees) {
        log('Validating legacy trees in marine_specifics.js...');
        Object.values(diagnosticTrees).forEach(tree => {
            validateTree(tree, 'marine_specifics.js (legacy)');
        });
    }
    if (productionTrees) {
        log('Validating production trees in marine_specifics.js...');
        Object.values(productionTrees).forEach(tree => {
            validateTree(tree, 'marine_specifics.js (production)');
        });
    }

    // 2. Scan directories for standalone tree files
    CONFIG.searchDirs.forEach(dir => {
        const absoluteDir = path.resolve(dir);
        if (!fs.existsSync(absoluteDir)) {
            log(`Skipping non-existent directory: ${dir}`);
            return;
        }
        
        const files = getFiles(absoluteDir, CONFIG.fileExtensions);
        files.forEach(file => {
            try {
                if (file.endsWith('.json')) {
                    const content = fs.readFileSync(file, 'utf8');
                    const tree = JSON.parse(content);
                    validateTree(tree, file);
                } else if (file.endsWith('.js')) {
                    // Skip the main marine_specifics.js as it's handled separately
                    if (file.includes('marine_specifics.js') || file.includes('validate_all_trees.js')) return;
                    
                    const treeModule = require(file);
                    const tree = treeModule.diesel_engine_core_tree || 
                                 treeModule.blackSmokeUnderLoadPath || 
                                 Object.values(treeModule)[0]; // Try to find the tree object
                    
                    if (tree && typeof tree === 'object') {
                        validateTree(tree, file);
                    }
                }
            } catch (e) {
                logError(`Failed to parse file ${file}: ${e.message}`);
                totalErrors++;
            }
        });
    });

    log('-----------------------------------');
    if (totalErrors > 0) {
        logError(`CI Validation FAILED. Total trees: ${totalTrees}, Total errors: ${totalErrors}`);
        process.exit(1); // Exit with failure code for CI
    } else {
        log(`CI Validation PASSED. Total trees: ${totalTrees} validated successfully.`);
        process.exit(0);
    }
}

run();
