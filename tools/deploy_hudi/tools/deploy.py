#!/usr/bin/env python3

import subprocess
import sys
import time
import requests

HEALTH_URL = "https://api.huidrom.com/health"


def run(cmd):
    print(f"\n> {cmd}")

    result = subprocess.run(
        cmd,
        shell=True,
        text=True
    )

    if result.returncode != 0:
        print("\n❌ Command failed.")
        sys.exit(result.returncode)


print("\n===================================")
print("      HUDI Deployment Tool")
print("===================================\n")

msg = input(
    "Commit message (Enter = dev:auto deploy): "
).strip()

if msg == "":
    msg = "dev:auto deploy"

run("git add .")
run(f'git commit -m "{msg}" || echo Nothing to commit')
run("git push")

print("\nConnecting to HUDI server...\n")

run(
    'ssh hudi "cd /opt/hudi && git pull && systemctl restart hudi"'
)

print("\nWaiting for service...\n")

for i in range(20):

    result = subprocess.run(
        'ssh hudi "systemctl is-active hudi"',
        shell=True,
        capture_output=True,
        text=True
    )

    state = result.stdout.strip()

    print(f"Status : {state}")

    if state == "active":
        break

    time.sleep(1)

else:

    print("\n❌ HUDI failed to restart.\n")

    subprocess.run(
        'ssh hudi "journalctl -u hudi -n 50 --no-pager"',
        shell=True
    )

    sys.exit(1)


print("\nRunning Health Check...\n")

try:

    response = requests.get(
        HEALTH_URL,
        timeout=10
    )

    if response.status_code == 200:

        print("✅ Health Check Passed")

    else:

        print(
            f"⚠ Health endpoint returned {response.status_code}"
        )

except Exception as ex:

    print("⚠ Health check failed")

    print(ex)

print("\n===================================")
print("✅ DEPLOYMENT SUCCESSFUL")
print("===================================\n")