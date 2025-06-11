#!/bin/bash
set -e

# Only run restore if data directory is empty
if [ -z "$(ls -A /var/lib/postgresql/data/base)" ]; then
  echo "📦 Restoring SQL backup..."

  # Wait for PostgreSQL to be ready
  until pg_isready -U "$POSTGRES_USER"; do
    sleep 1
  done

  # Restore using psql
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/store_to_container.sql

  echo "✅ SQL backup restored successfully!"
else
  echo "✅ Database already initialized, skipping restore."
fi
