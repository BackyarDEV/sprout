#!/bin/bash

cd ../frontend
npm run build

rm -rf ../backend/src/main/resources/static/*
cp -r dist/* ../backend/src/main/resources/static/

cd ../backend
mvn package -DskipTests