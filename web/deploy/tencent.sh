#!/usr/bin/env bash
# 在本机执行：把站点同步到腾讯云并 docker compose up
# 用法：
#   cp deploy/tencent.env.example deploy/tencent.env
#   填好 SERVER_* 和 DOMAIN
#   bash deploy/tencent.sh

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/deploy/tencent.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "缺少 $ENV_FILE ，请先复制 tencent.env.example 并填写。"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude deploy/tencent.env \
  "$ROOT/" "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"

ssh "$SERVER_USER@$SERVER_HOST" "bash -s" <<EOF
set -euo pipefail
cd "$SERVER_PATH"
export NEXT_PUBLIC_ICP_NUMBER="${NEXT_PUBLIC_ICP_NUMBER:-}"
export NEXT_PUBLIC_PSB_NUMBER="${NEXT_PUBLIC_PSB_NUMBER:-}"
export NEXT_PUBLIC_PSB_CODE="${NEXT_PUBLIC_PSB_CODE:-}"
docker compose up -d --build
EOF

echo "已部署。DNS 请把 $DOMAIN 的 A 记录指向 $SERVER_HOST ，并在 Nginx server_name 中写入该域名。"
