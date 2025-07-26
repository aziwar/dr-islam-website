# GITHUB SETUP INSTRUCTIONS

## 🚀 Manual GitHub Tasks Required

### 1. Create Milestones (GitHub UI)
1. Go to: https://github.com/aziwar/dr-islam-website/milestones
2. Click "New milestone"
3. Create these 3 milestones:
   - **Critical Fixes** (Due: July 28, 2025)
   - **Week 1** (Due: August 2, 2025)
   - **Week 2** (Due: August 9, 2025)

### 2. Create Labels (GitHub UI)
1. Go to: https://github.com/aziwar/dr-islam-website/labels
2. Click "New label"
3. Create these labels:
   - `claude-code-ready` (color: #0E8A16) - Tasks ready for Claude Code
   - `needs-review` (color: #FEF2C0) - PR needs review
   - `blocked` (color: #D73A4A) - Task blocked by dependency

### 3. Create Issues
Copy content from `.github/ISSUES_TO_CREATE/` folder:
1. issue-01-readme.md → Create as Issue #1
2. issue-02-cleanup.md → Create as Issue #2
3. issue-03-security.md → Create as Issue #3
4. issue-04-docs.md → Create as Issue #4
5. issue-05-error-boundary.md → Create as Issue #5

### 4. Setup Branch Protection Rules
1. Go to: Settings → Branches
2. Add rule for `master` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators
   - Status checks: `PR Validation`, `Code Quality`

### 5. Create Project Board
1. Go to: https://github.com/aziwar/dr-islam-website/projects
2. Create new project "Dr Islam Website Tasks"
3. Choose "Board" view
4. Add columns: To Do, In Progress, In Review, Done
5. Enable automation:
   - To Do: Newly added issues
   - In Progress: Newly opened PRs
   - Done: Closed issues and merged PRs

## 📁 Files Created in This Session

### CI/CD Workflows
- `.github/workflows/test.yml` - PR validation tests
- `.github/workflows/quality.yml` - Code quality checks

### Issue Templates  
- `.github/ISSUE_TEMPLATE/bug.md`
- `.github/ISSUE_TEMPLATE/feature.md`
- `.github/ISSUE_TEMPLATE/claude-code-task.md`

### Issues to Create
- `.github/ISSUES_TO_CREATE/issue-01-readme.md`
- `.github/ISSUES_TO_CREATE/issue-02-cleanup.md`
- `.github/ISSUES_TO_CREATE/issue-03-security.md`
- `.github/ISSUES_TO_CREATE/issue-04-docs.md`
- `.github/ISSUES_TO_CREATE/issue-05-error-boundary.md`

## 🔄 Next Steps

1. **Commit and push these changes:**
```bash
git add .github/
git commit -m "feat: add CI/CD workflows and issue templates for Claude Code collaboration"
git push origin master
```

2. **Complete manual GitHub setup** (15 minutes)

3. **Claude Code can then:**
   - See all issues labeled `claude-code-ready`
   - Create feature branches
   - Submit PRs that auto-run tests
   - Reference issues in commits

## 🎯 Communication Protocol

- **Claude Desktop** (Senior Dev):
  - Creates detailed issues
  - Reviews PRs
  - Provides technical guidance
  - Approves and merges

- **Claude Code** (Junior Dev):
  - Implements solutions
  - Creates feature branches
  - Submits PRs with "Fixes #X"
  - Addresses review feedback

All communication through GitHub only!