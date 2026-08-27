#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
cd "$repo_root"

canonical_image='ghcr.io/newcodebook/xoaai:latest'
compose_image='    image: ${XOAAI_IMAGE:-ghcr.io/newcodebook/xoaai:latest}'

for compose_file in \
  deploy/docker-compose.yml \
  deploy/docker-compose.local.yml \
  deploy/docker-compose.standalone.yml
do
  count=$(grep -Fxc "$compose_image" "$compose_file" || true)
  if [ "$count" -ne 1 ]; then
    printf '%s must use the overridable canonical GHCR image exactly once\n' "$compose_file" >&2
    exit 1
  fi
done

if ! grep -Fqx "XOAAI_IMAGE=$canonical_image" deploy/.env.example; then
  printf '.env.example must declare the canonical Compose image\n' >&2
  exit 1
fi

if ! grep -Fqx "APPLE_CONTAINER_XOAAI_IMAGE=$canonical_image" deploy/.env.example; then
  printf '.env.example must declare the canonical Apple container image\n' >&2
  exit 1
fi

if ! grep -Fq 'read_env_value APPLE_CONTAINER_XOAAI_IMAGE ghcr.io/newcodebook/xoaai:latest' deploy/apple-container.sh; then
  printf 'apple-container.sh must default to the canonical GHCR image\n' >&2
  exit 1
fi

if ! grep -Fq "const DOCKER_IMAGE = 'ghcr.io/newcodebook/xoaai'" frontend/src/components/common/VersionBadge.vue; then
  printf 'VersionBadge.vue must show upgrade commands for the canonical GHCR image\n' >&2
  exit 1
fi

if grep -Eqi 'dockerhub|docker hub' .github/workflows/release.yml .goreleaser.yaml; then
  printf 'release publishing must not depend on Docker Hub\n' >&2
  exit 1
fi

if grep -q 'DOCKERHUB_' .github/workflows/release.yml .goreleaser.yaml; then
  printf 'release publishing must not reference Docker Hub credentials\n' >&2
  exit 1
fi

if ! grep -Fq 'registry: ghcr.io' .github/workflows/release.yml; then
  printf 'release workflow must authenticate to GHCR\n' >&2
  exit 1
fi

if ! grep -Fq 'packages: write' .github/workflows/release.yml; then
  printf 'release workflow must have package write permission\n' >&2
  exit 1
fi

if git grep -n -i -E 'weishaw/xoaai|dockerhub|docker hub' -- . ':!openspec/**' ':!deploy/tests/container-image-source-test.sh' >/dev/null; then
  printf 'active repository files still reference the retired image source\n' >&2
  git grep -n -i -E 'weishaw/xoaai|dockerhub|docker hub' -- . ':!openspec/**' ':!deploy/tests/container-image-source-test.sh' >&2
  exit 1
fi

printf 'container image source contract test passed\n'
