# XOAAI Container Image

XOAAI is an AI API gateway for distributing and managing AI product
subscription quotas. The canonical image is published by the repository's
release workflow to GitHub Container Registry (GHCR):

```text
ghcr.io/newcodebook/xoaai
```

The package is public, so normal pulls do not require authentication.

## Tags and Architectures

Full releases publish multi-architecture images for `linux/amd64` and
`linux/arm64` with these tags:

- `latest` — latest stable release; convenient for evaluation.
- `x.y.z` — immutable release version; recommended for production.
- `x.y` — latest patch release in a minor line.
- `x` — latest release in a major line.

Production deployments should pin an `x.y.z` tag or an image digest so an
operator explicitly controls upgrades and rollback inputs.

## Quick Start

The supported all-in-one deployment uses the Compose files in this directory;
they include PostgreSQL and Redis and persist all state:

```bash
mkdir -p xoaai-deploy && cd xoaai-deploy
curl -sSL https://raw.githubusercontent.com/newcodebook/xoaai/main/deploy/docker-deploy.sh | bash
docker compose up -d
docker compose logs -f xoaai
```

The preparation script downloads `docker-compose.local.yml` as
`docker-compose.yml`, creates local data directories, and generates required
secrets in a mode-600 `.env` file.

## Selecting an Image

Compose reads the `XOAAI_IMAGE` setting and defaults to the canonical `latest`
tag. Pin a production release in `.env`:

```dotenv
XOAAI_IMAGE=ghcr.io/newcodebook/xoaai:1.0.0
```

Then pull and recreate the application container:

```bash
docker compose pull xoaai
docker compose up -d xoaai
```

Changing the image does not replace the application, PostgreSQL, or Redis data
volumes. Database migrations are forward-only, so take a backup before an
upgrade and do not assume that an image rollback reverses a schema migration.

## Private-Package Authentication

Public releases need no login. If an administrator intentionally changes the
GHCR package to private, each deployment host must authenticate with a GitHub
token that has `read:packages` permission:

```bash
docker login ghcr.io -u YOUR_GITHUB_USERNAME
```

Enter the token at the password prompt. Do not place registry tokens in Compose
files or commit them to the repository.

## Configuration

The Compose deployment uses `deploy/.env.example` as the complete environment
reference. At minimum, keep fixed values for:

- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `TOTP_ENCRYPTION_KEY`
- `ADMIN_PASSWORD` for an explicitly managed initial administrator password

See [README.md](./README.md) for Compose lifecycle, backup, migration, and
auto-setup behavior.

## Release Ownership

GHCR is the only official container publication target. The release workflow
uses the current GitHub repository owner, `packages: write`, and the built-in
`GITHUB_TOKEN`; it does not depend on a personal Docker registry account.

Repository: <https://github.com/newcodebook/xoaai>
