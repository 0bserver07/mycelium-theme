#!/bin/bash

# Mycelium Theme - Link Spore Vault Script
# This script connects your Mycelium Spore vault to the theme

echo "🌱 Mycelium Spore Linker"
echo "========================"
echo ""

# Check if we're in the right directory
if [ ! -f "astro.config.mjs" ]; then
    echo "❌ Error: Run this script from the mycelium-theme directory"
    exit 1
fi

# Get the path to Spore
if [ -z "$1" ]; then
    echo "Enter the path to your mycelium-spore folder:"
    echo "(e.g., ~/Documents/mycelium-spore or ../mycelium-spore)"
    read -p "> " SPORE_PATH
else
    SPORE_PATH="$1"
fi

# Expand ~ to home directory
SPORE_PATH="${SPORE_PATH/#\~/$HOME}"

# Check if Spore exists
if [ ! -d "$SPORE_PATH" ]; then
    echo "❌ Error: Cannot find Spore vault at: $SPORE_PATH"
    exit 1
fi

# Confirm
echo ""
echo "This will link:"
echo "  $SPORE_PATH/posts    → src/content/posts"
echo "  $SPORE_PATH/pages    → src/content/pages"
echo "  $SPORE_PATH/projects → src/content/projects"
echo "  $SPORE_PATH/docs     → src/content/docs"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Remove existing content directories
echo "🗑️  Removing existing content..."
rm -rf src/content/posts
rm -rf src/content/pages
rm -rf src/content/projects
rm -rf src/content/docs

# Create symlinks
echo "🔗 Creating symlinks..."
ln -s "$SPORE_PATH/posts" src/content/posts
ln -s "$SPORE_PATH/pages" src/content/pages
ln -s "$SPORE_PATH/projects" src/content/projects
ln -s "$SPORE_PATH/docs" src/content/docs

echo ""
echo "✅ Done! Your Spore vault is now linked."
echo ""
echo "Restart the dev server to see changes:"
echo "  npm run dev"
