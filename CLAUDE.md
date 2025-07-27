# SuperClaude Framework Integration

This project is integrated with SuperClaude v3.0.0 - an AI-enhanced development framework for Claude Code.

## Available Commands

### Analysis Commands
- `/analyze` - Multi-dimensional code and system analysis
- `/troubleshoot` - Problem investigation and root cause analysis
- `/explain` - Educational explanations with context

### Development Commands  
- `/build` - Project builder with framework detection
- `/implement` - Feature and code implementation
- `/design` - Design orchestration and system architecture

### Quality Commands
- `/improve` - Evidence-based code enhancement  
- `/cleanup` - Project cleanup and technical debt reduction

### Additional Commands
- `/document` - Documentation generation
- `/estimate` - Evidence-based estimation
- `/task` - Long-term project management
- `/test` - Testing workflows
- `/git` - Git workflow assistant

## MCP Server Integration

The project now includes SuperClaude MCP server integration enabling:
- Enhanced analysis capabilities
- Intelligent code generation
- Framework-aware development workflows
- Automated quality gates and validation

## Usage Examples

```bash
# Comprehensive analysis
/analyze --think-hard --focus architecture

# Implement new feature  
/implement user authentication --framework vanilla

# Improve code quality
/improve --quality --loop

# Build with optimization
/build --perf --validate
```

## Framework Features

- **Auto-Activation**: Intelligent persona and tool selection
- **Quality Gates**: 8-step validation framework  
- **Wave Mode**: Multi-stage orchestration for complex tasks
- **Evidence-Based**: All recommendations backed by analysis
- **Performance Optimized**: Token-efficient operations

## Key Project Learnings

### CI/CD Troubleshooting Patterns
- Always include `npm ci` step in deployment workflows
- Use direct `npx` commands over GitHub Actions for better debugging
- Add verification steps (`npx wrangler --version`, `npx wrangler whoami`)
- Don't over-optimize by removing "unnecessary" dependencies

### Debugging Methodology
1. Test locally first (`npx wrangler --version`)
2. Add debugging steps to workflows
3. Use environment variables over action parameters
4. Check GitHub repository secrets for API tokens
5. Analyze error patterns (exit codes, timing, consistency)

For detailed command documentation, see the global SuperClaude installation at `C:\Users\zewar\.claude\commands\sc\`
For troubleshooting guidance, see `TROUBLESHOOTING.md` in this repository.