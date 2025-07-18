#!/bin/bash
# Pre-deployment validation script

echo "🔍 Running pre-deployment checks..."

# 1. CSS Syntax Check
echo "Checking CSS syntax..."
npx stylelint "src/content/styles.js" --custom-syntax postcss-lit

# 2. Build hash for cache busting
BUILD_HASH=$(git rev-parse --short HEAD)
echo "export const BUILD_VERSION = '${BUILD_HASH}';" > src/build-version.js

# 3. Test Worker locally
echo "Starting local Worker test..."
timeout 30s wrangler dev --local --port 8787 &
WORKER_PID=$!

sleep 5

# 4. Run mobile tests
echo "Running mobile breakpoint tests..."
node tests/mobile-test.js

# 5. Kill test worker
kill $WORKER_PID

# 6. Deployment decision
read -p "Deploy to production? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    wrangler deploy --env production
    echo "✅ Deployed with version: ${BUILD_HASH}"
else
    echo "❌ Deployment cancelled"
fi