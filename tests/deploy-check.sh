#!/bin/bash
# Final deployment readiness check

echo "=== DR-ISLAM-WEBSITE DEPLOYMENT CHECK ==="
echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
echo "Testing: http://127.0.0.1:8787"
echo ""

# Check if dev server is running
if ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8787 | grep -q "200"; then
    echo "[FAIL] Dev server not running. Run: npm run dev"
    exit 1
fi

# Run mobile test
echo "Running mobile UI/UX test..."
powershell -ExecutionPolicy Bypass -File ".\tests\mobile-test.ps1"
mobile_result=$?

# Check cache headers
echo -e "\nChecking cache headers..."
cache_check=$(curl -sI http://127.0.0.1:8787 | grep -i "cache-control")
if [[ $cache_check == *"s-maxage"* ]]; then
    echo "[PASS] Cache headers configured: $cache_check"
else
    echo "[FAIL] Cache headers missing s-maxage"
    exit 1
fi

# Final result
if [ $mobile_result -eq 0 ]; then
    echo -e "\n✅ ALL TESTS PASSED - READY FOR DEPLOYMENT"
    echo "Next: git add . && git commit -m 'your message' && git push"
else
    echo -e "\n❌ DEPLOYMENT BLOCKED - Fix issues first"
    exit 1
fi