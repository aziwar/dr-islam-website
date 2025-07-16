# Token Tracking

## Estimates per Task

### Claude Code (Sonnet 4)
- File analysis: ~2K tokens
- Code editing: ~3K tokens  
- Git operations: ~500 tokens
- Context7 docs: ~1K tokens (saves debugging)
- **Total per task**: ~6.5K tokens

### Claude Desktop (Opus 4)
- Deployment check: ~500 tokens
- Status verify: ~300 tokens
- **Total per task**: ~800 tokens

## Cost Comparison

### Old Way (All Opus 4)
- Full task: ~6.3K tokens @ Opus rate

### New Way (Split)
- Sonnet 4: 5.5K tokens @ 3¢/1K = $0.165
- Opus 4: 0.8K tokens @ 15¢/1K = $0.120
- **Total**: $0.285

### Savings
- Old: ~$0.945 per task
- New: ~$0.285 per task  
- **Savings**: 70% reduction

## Track Your Usage
After each session in Claude Code:
```
/cost
```

## Monthly Projection
- 10 tasks/day = $85.50/month (vs $283.50)
- 20 tasks/day = $171/month (vs $567)

Remember: Let Sonnet do the work!