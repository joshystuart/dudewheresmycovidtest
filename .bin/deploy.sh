#!/usr/bin/env bash
cd ../

aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 148982226388.dkr.ecr.ap-southeast-2.amazonaws.com

# Build CRON Lambdas
docker build -f AioDockerfile --no-cache -t dudewheresmycovidtest-aio .

docker tag dudewheresmycovidtest-aio:latest 148982226388.dkr.ecr.ap-southeast-2.amazonaws.com/dudewheresmycovidtest-aio:latest && docker push 148982226388.dkr.ecr.ap-southeast-2.amazonaws.com/dudewheresmycovidtest-aio:latest

# Build API
docker build -f ApiDockerfile --no-cache -t dudewheresmycovidtest-api .

docker tag dudewheresmycovidtest-api:latest 148982226388.dkr.ecr.ap-southeast-2.amazonaws.com/dudewheresmycovidtest-api:latest && docker push 148982226388.dkr.ecr.ap-southeast-2.amazonaws.com/dudewheresmycovidtest-api:latest