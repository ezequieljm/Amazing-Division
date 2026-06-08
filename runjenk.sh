#!/bin/bash

echo "Starting Jenkins..."

# 1. Create the network if it doesn't exist
docker network inspect jenkins >/dev/null 2>&1 || \
	(echo "Creating Jenkins network..." && docker network create --ipv6 --subnet=fd42:dead:beef:0001::/64 jenkins)

# 2. Run Jenkins container (DinD - Docker in Docker)
echo "Running Jenkins container DinD..."
docker run --name jenkins-docker --rm --detach \
    --privileged --network jenkins \
    --network-alias docker \
    --network-alias jenkins-docker \
    --env DOCKER_TLS_CERTDIR=/certs \
    --volume jenkins-docker-certs:/certs/client \
    --volume jenkins-data:/var/jenkins_home \
    --publish 2376:2376 \
    --publish 80:80 \
    docker:dind --storage-driver=overlay2

# Wait for Docker in Docker to be ready
echo "Waiting for Docker in Docker to be ready..."
sleep 5

# 3. Run Jenkins container
# If the container already exists, just start it; otherwise, create and run it
if [ "$(docker ps -a -f name=jenkins-blueocean | grep -c jenkins-blueocean)" -eq 0 ]; then
    echo "Creating and running Jenkins container..."
    docker run --name jenkins-blueocean --rm --detach \
        --network jenkins \
	--env DOCKER_HOST=tcp://docker:2376 \
        --env DOCKER_CERT_PATH=/certs/client \
	--env DOCKER_TLS_VERIFY=1 \
        --publish 8080:8080 --publish 50000:50000 \
        --volume jenkins-data:/var/jenkins_home \
        --volume jenkins-docker-certs:/certs/client:ro \
        myjenkins-blueocean:2.555.2-1
else
    echo "Starting existing Jenkins container..."
    docker start jenkins-blueocean
fi

ipdocker=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.GlobalIPv6Address}}{{end}}' jenkins-blueocean)

echo "Jenkins is running. Access it at http://[$ipdocker]:8080"
