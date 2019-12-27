TAG=wss-client

build:
	docker build -t $(TAG) -f Dockerfile .

clean:
	docker rm -vf $$(docker ps -aq -f label=$(TAG))
