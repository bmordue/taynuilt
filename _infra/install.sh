RUBY_TAG=2.6
docker run --rm -v $(pwd):/workspace -w /workspace ruby:$RUBY_TAG bundle install --path vendor
