#!/bin/bash

docker build -t nest-otel-load .

docker run --network="host" --rm --name k6_nest-otel-load nest-otel-load