#!/usr/bin/env node
// Claude Code Pre-execution Validator
// Auto-enforces DEVELOPMENT_RULES.md compliance

const fs = require('fs');
const path = require('path');

class ComplianceValidator {
    constructor() {
        this.compliance = JSON.parse(fs.readFileSync('.claude/compliance.json'));
        this.sessionState = this.loadSessionState();
        this.violations = [];
    }

    loadSessionState() {
        const statePath = '.claude/session_state.json';
        if (!fs.existsSync(statePath)) {
            return {
                response_count: 0,
                last_context7: null,
                last_checkpoint: new Date().toISOString()
            };
        }
        return JSON.parse(fs.readFileSync(statePath));
    }

    async validateTask(taskName, taskConfig) {
        console.log(`[COMPLIANCE] Validating task: ${taskName}`);
        
        // Check 1: Response count
        if (this.sessionState.response_count >= 5) {
            this.halt("CHECKPOINT REQUIRED: 5 responses reached");
        }
        
        // Check 2: Context7 requirement
        if (taskConfig.involves_code && !taskConfig.context7_validated) {
            this.halt("CONTEXT7 VALIDATION REQUIRED before code generation");
        }
        
        // Check 3: Git tool validation
        if (taskConfig.git_operation && taskConfig.tool?.includes('desktop-commander')) {
            this.halt("FORBIDDEN: Use GitHub MCP for git operations");
        }
        
        // Check 4: Chunk size for file operations
        if (taskConfig.file_lines && taskConfig.file_lines > 30) {
            console.warn("[WARNING] File exceeds 30 lines - will auto-chunk");
            taskConfig.auto_chunk = true;
        }
        
        return this.violations.length === 0;
    }

    halt(reason) {
        this.violations.push(reason);
        console.error(`[HALT] ${reason}`);
        process.exit(1);
    }

    updateSessionState() {
        this.sessionState.response_count++;
        fs.writeFileSync('.claude/session_state.json', 
            JSON.stringify(this.sessionState, null, 2));
    }
}

// Auto-execute validation
const validator = new ComplianceValidator();
const taskConfig = JSON.parse(process.argv[2] || '{}');

validator.validateTask(taskConfig.name, taskConfig).then(valid => {
    if (valid) {
        console.log("[COMPLIANCE] ✓ All checks passed");
        validator.updateSessionState();
    }
});
