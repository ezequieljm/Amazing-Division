#!/bin/bash

echo "Stopping Jenkins..."

# Stop containers
docker stop jenkins-blueocean jenkins-docker 2>/dev/null
docker rm jenkins-blueocean
docker rm jenkins-docker

echo "Jenkins stopped."
