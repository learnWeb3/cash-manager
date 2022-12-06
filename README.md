# T-DEV_70_MAR_11 (Cash Manager)

This repository is divided in 4 parts

- server: A JSON-RPC like API to manage mobile and dashboard data and related logic
- bank: A JSON_RPC like API to handle customer funds (fake bank) 
- mobile: A mobile application to handle day to day operation in the shop (register new products, add new inventories, handle customer baskets)
- dashboard: A web interface to manage products and stocks and have anlytics on the shop performance

## Environnement variables

Each containers have a separate .env configuration file containing their related environnement variables scoped to each environnement (production/development)

- bank: .env.bank.development / .env.bank.production
- server: .server.env.development / .server.env.production
- database: .env.database.development / .env.database.production

## Quick start

### Using docker compose

```bash
# build docker images
docker compose build --no-cache
# start containers in detach mode
docker compose up -d
```

### Using minikube (one node local kubernetes cluster)

```bash
# build docker images
docker compose build --no-cache
# start the cluster with enough memory and cpu ressource
minikube start --memory 2000 --cpus 2
# import your image in minikube from docker 
minikube load image epitechregistry.azurecr.io/cash-manager epitechregistry.azurecr.io/bank
# check image are present in minikube to avoid pullBackOff errors when deploying pods
minikube image ls
```

```bash
# deploy the database (will be replaced by a mongodb operated cluster)
kubectl apply -f ./k8s/database.statefulset.yaml
# deploy the bank
kubectl apply -f ./k8s/bank.deployment.yaml
# deploy the server
kubectl apply -f ./k8s/server.deployment.yaml
```

