#!/bin/bash

echo "Stopping Jenkins..."

# Stop containers
docker stop jenkins-blueocean jenkins-docker 2>/dev/null

echo "Jenkins stopped."
