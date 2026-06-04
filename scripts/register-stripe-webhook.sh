#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root_dir"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

app_url="${APP_URL:?Set APP_URL in .env (e.g. https://your-domain.com)}"
webhook_url="${app_url%/}/api/stripe/webhook"

endpoint_json="$(stripe webhook_endpoints create \
  --url="$webhook_url" \
  --enabled-events=checkout.session.completed \
  --enabled-events=checkout.session.async_payment_succeeded)"

secret="$(printf '%s' "$endpoint_json" | node -e "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
if (typeof data.secret !== 'string') process.exit(1);
process.stdout.write(data.secret);
")"

echo "Created webhook endpoint: $webhook_url"
echo "Add to .env:"
echo "STRIPE_WEBHOOK_SECRET=$secret"
