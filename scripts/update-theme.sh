#!/bin/bash
#
# Update theme from upstream mycelium-theme repository
# Safely stashes your content, merges updates, then restores your content
#

set -e

echo "🍄 Mycelium Theme Updater"
echo "========================="
echo ""

# Check if upstream remote exists
if ! git remote get-url upstream &>/dev/null; then
  echo "Adding upstream remote..."
  git remote add upstream https://github.com/0bserver07/mycelium-theme.git
  echo "✓ Upstream remote added"
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo "Stashing your local changes..."
  git stash push -u -m "mycelium-update-$(date +%Y%m%d-%H%M%S)"
  STASHED=1
  echo "✓ Changes stashed"
else
  STASHED=0
  echo "✓ Working directory clean"
fi

echo ""
echo "Fetching upstream updates..."
git fetch upstream
echo "✓ Fetched"

echo ""
echo "Merging upstream/master..."
if git merge upstream/master -m "Merge upstream theme updates"; then
  echo "✓ Merged successfully"
else
  echo ""
  echo "⚠️  Merge conflict detected!"
  echo "Resolve conflicts, then run: git stash pop"
  exit 1
fi

# Restore stashed changes
if [[ $STASHED -eq 1 ]]; then
  echo ""
  echo "Restoring your local changes..."
  if git stash pop; then
    echo "✓ Changes restored"
  else
    echo ""
    echo "⚠️  Conflict restoring your changes!"
    echo "Your changes are still in stash. Run: git stash list"
    echo "Resolve conflicts, then: git stash drop"
  fi
fi

echo ""
echo "✅ Theme updated!"
echo ""
echo "Reload Obsidian to see plugin updates."
