JEKYLL_IMG=jekyll:3.8 # JEKYLL_IMG=minimal:3.8
docker run --rm -v $(pwd):/wrk -w /wrk jekyll/$JEKYLL_IMG jekyll build -d _site
chmod -R 755 _site
docker stack deploy -c /home/ben/Projects/cluster/nginx/docker-compose.yml nginx
