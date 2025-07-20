# AI AGENT GUIDE - DR-ISLAM-WEBSITE
<!-- READ THIS FIRST - Context Engineering Structure Explained -->

## 🚨 CRITICAL: How This Project Works

This project uses **Context Engineering** methodology for AI collaboration. Before doing ANY work:

1. **Read ALL files in this order:**
   - rules/CLAUDE.md - Global rules you MUST follow
   - project/PROJECT_CONTEXT.md - Complete project information
   - project/TODO_TRACKER.md - Current tasks with deadlines
   - rules/DEV_RULES.md - Technical implementation rules

2. **Check examples/ folder for patterns**
   - Every implementation should follow these patterns
   - Copy structure, not just concepts

3. **Workflow is MANDATORY:**
   ```
   LOCAL → GitHub → Auto-deploy
   NEVER direct deploy to Cloudflare
   ```

## 📁 FOLDER STRUCTURE EXPLAINED

```
docs/
├── .claude/                    # AI assistant configuration
│   └── commands/              # Custom AI commands (future)
├── PRPs/                      # Product Requirement Prompts
│   └── templates/             # PRP templates
├── examples/                  # CRITICAL - Code patterns to follow
│   ├── css-modular.js        # How to split CSS files
│   ├── worker-pattern.js     # Cloudflare Workers patterns
│   └── security-headers.js   # Security implementation
├── project/                   # Project information
│   ├── PROJECT_CONTEXT.md    # Infrastructure & history
│   └── TODO_TRACKER.md       # Time-tracked tasks
├── rules/                     # Rules and standards
│   ├── CLAUDE.md             # AI assistant rules
│   └── DEV_RULES.md          # Technical standards
├── AI_AGENT_GUIDE.md         # This guide
├── INITIAL.md                # Current feature request
└── README.md                 # Quick navigation
```

## 🎯 YOUR FIRST TASK

1. **Current Priority:** CSS Modularization (Due: July 21, 2025)
   - Read INITIAL.md for requirements
   - Check TODO_TRACKER.md for sub-tasks
   - Use examples/css-modular.js pattern

2. **Steps:**
   ```bash
   # 1. Work locally
   npm run dev
   
   # 2. Split styles.js using examples/css-modular.js pattern
   # 3. Test thoroughly
   # 4. Commit and push
   git add .
   git commit -m "feat: modularize CSS into 3 files"
   git push origin master
   
   # 5. Auto-deploys to https://dr-elsagher.com
   ```

## ⚡ QUICK REFERENCE

**Project:**
- Live: https://dr-elsagher.com
- GitHub: https://github.com/ahmedziwar/dr-islam-website
- Stack: Cloudflare Workers + R2
- Score: B+ (85/100)

**Critical Issues:**
1. CSS file too large (1,556 lines)
2. Missing cache headers (s-maxage)
3. Need performance monitoring

**Commands:**
```bash
npm run dev          # Local development
npm run lint:css     # Fix CSS issues
npm run test:mobile  # Test mobile UI
```

## 🚫 COMMON MISTAKES TO AVOID

1. **DON'T** deploy directly to Cloudflare
2. **DON'T** create files > 500 lines
3. **DON'T** skip the examples/ patterns
4. **DON'T** hardcode secrets
5. **DON'T** use old audit files

## ✅ SUCCESS CHECKLIST

Before ANY commit:
- [ ] Followed examples/ patterns
- [ ] All files < 500 lines
- [ ] Updated TODO_TRACKER.md
- [ ] Tested locally with npm run dev
- [ ] Applied security headers
- [ ] Added performance timing

## 💡 WHY CONTEXT ENGINEERING?

Traditional: "Make the CSS modular"
Context Engineering: Complete blueprint with examples, patterns, rules, and validation

This ensures:
- Consistent implementation
- Follows project patterns
- Meets all requirements
- Works first time

## 🆘 STUCK?

1. Re-read CLAUDE.md rules
2. Check examples/ for patterns
3. Verify TODO_TRACKER.md status
4. Follow DEV_RULES.md standards

Remember: Examples > Instructions. Always copy patterns from examples/ folder.