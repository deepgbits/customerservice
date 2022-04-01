#!/bin/sh

docker build -t customerservice .

docker run --name customerservicenn --env DB='local' -p 9050:9050 customerservice