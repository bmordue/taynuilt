JEKYLL_IMG=jekyll:3.8 # JEKYLL_IMG=minimal:3.8
BUILD_OUTPUT=_staging
mkdir -p $BUILD_OUTPUT
docker run --rm -v $(pwd):/wrk -w /wrk jekyll/$JEKYLL_IMG jekyll build -d $BUILD_OUTPUT
chmod -R 755 $BUILD_OUTPUT
