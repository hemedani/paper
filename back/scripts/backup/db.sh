#!/usr/bin/env bash
# Database backup / transfer helper for the paper project.
#
#   ./db.sh backup     dump the local `paper` database to a timestamped archive
#   ./db.sh push       copy the newest archive to the production server
#   ./db.sh restore    restore the newest local archive on the production server
#
# `restore` is destructive: it drops and recreates the collections listed in
# COLLECTIONS on the server. Collections that only exist on the server (blog,
# category, file, ...) are left untouched.
set -euo pipefail

DB="${DB:-paper}"
OUT_DIR="${OUT_DIR:-$HOME/work/paper-backups}"
REMOTE="${REMOTE:-syd@94.184.45.192}"
REMOTE_DIR="${REMOTE_DIR:-/home/syd/work/backups}"
# Collections to replace when restoring. Deliberately excludes `blog` because
# the production database has blog posts that this local dump does not.
COLLECTIONS="${COLLECTIONS:-article author publication tag keyword user}"

stamp() { date +%Y%m%d-%H%M%S; }
newest() { ls -1t "$OUT_DIR"/"$DB"-*.archive.gz 2>/dev/null | head -1; }

cmd_backup() {
  mkdir -p "$OUT_DIR"
  local archive="$OUT_DIR/$DB-$(stamp).archive.gz"
  echo "→ dumping $DB to $archive"
  mongodump --db "$DB" --archive="$archive" --gzip --quiet

  echo "→ verifying archive"
  gzip -t "$archive"
  mongorestore --archive="$archive" --gzip --dryRun --nsInclude="$DB.*" >/dev/null
  local size
  size=$(du -h "$archive" | cut -f1)
  echo "✓ $archive ($size)"

  # keep the last 10 archives
  ls -1t "$OUT_DIR"/"$DB"-*.archive.gz | tail -n +11 | xargs -r rm -f
}

cmd_push() {
  local archive
  archive=$(newest)
  [ -n "$archive" ] || { echo "no archive in $OUT_DIR — run ./db.sh backup first" >&2; exit 1; }
  echo "→ copying $(basename "$archive") to $REMOTE:$REMOTE_DIR"
  ssh "$REMOTE" "mkdir -p $REMOTE_DIR"
  scp -q "$archive" "$REMOTE:$REMOTE_DIR/"
  ssh "$REMOTE" "ls -lh $REMOTE_DIR/$(basename "$archive")"
}

cmd_restore() {
  local archive
  archive=$(newest)
  [ -n "$archive" ] || { echo "no archive in $OUT_DIR" >&2; exit 1; }
  local name
  name=$(basename "$archive")
  local include=""
  for c in $COLLECTIONS; do include="$include --nsInclude=$DB.$c"; done

  echo "→ restoring $name on $REMOTE (drops: $COLLECTIONS)"
  ssh "$REMOTE" "ls -1 $REMOTE_DIR/$name >/dev/null" || { echo "archive not on server — run ./db.sh push" >&2; exit 1; }
  # shellcheck disable=SC2086
  ssh "$REMOTE" "mongorestore --archive=$REMOTE_DIR/$name --gzip --drop $include"
  echo "✓ restored"
}

case "${1:-}" in
  backup) cmd_backup ;;
  push) cmd_push ;;
  restore) cmd_restore ;;
  *) sed -n '2,12p' "$0"; exit 1 ;;
esac
