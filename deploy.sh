# if a command exits with a non-zero status, exit
set -e
npm run build


TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"
cd "$TEMP_DIR"


git init
git remote add origin git@github.com:geekcoldhand/geekMedia.git
git fetch origin prod
git checkout prod


git add .
git commit -m "Auto deployment to prod"
git push --force origin prod

cd ..
# Cleanup
rm -rf "$TEMP_DIR"

echo "🚀 Deployment to Prod complete!"
