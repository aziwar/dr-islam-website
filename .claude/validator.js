#!/usr/bin/env node
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
        
        if (this.sessionState.response_count >= 5) {
            this.halt("CHECKPOINT REQUIRED: 5 responses reached");
        }
        
        if (taskConfig.involves_code && !taskConfig.context7_validated) {
            this.halt("CONTEXT7 VALIDATION REQUIRED before code generation");
        }
        
        if (taskConfig.git_operation && taskConfig.tool?.includes('desktop-commander')) {
            this.halt("FORBIDDEN: Use GitHub MCP for git operations");
        }
        
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

const validator = new ComplianceValidator();
const taskConfig = JSON.parse(process.argv[2] || '{}');

validator.validateTask(taskConfig.name, taskConfig).then(valid => {
    if (valid) {
        console.log("[COMPLIANCE] ✓ All checks passed");
        validator.updateSessionState();
    }
});