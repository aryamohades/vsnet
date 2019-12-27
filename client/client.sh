#!/bin/bash
## A utility to spawn multiple client instances in different network namespaces using Docker
## This helps to overcome ephemeral port exhaustion
## Usage: ./setup <connections> <number of instances> <ramp> <server ip> <server port>
## Example: ./client 50 3 10 172.17.0.2 8000

CONNECTIONS=$1
INSTANCES=$2
RAMP=$3
IP=$4
PORT=$5

for (( i=0; i<${INSTANCES}; i++ ))
do
    docker run -d -l wss-client wss-client /app/node_modules/forever/bin/forever /app/client.js --conn=${CONNECTIONS} --ramp=${RAMP} --ip=${IP} --port=${PORT}
done
