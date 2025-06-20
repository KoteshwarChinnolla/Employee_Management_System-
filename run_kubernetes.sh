#!/bin/bash


#  minikube start --nodes=3 --cpus 4 --memory 4096 --driver virtualbox --no-vtx-check

echo "checking for namespace 'ems'..."
if kubectl get ns ems &> /dev/null; then
    echo "Namespace 'ems' already exists."
else
    echo "Creating namespace 'ems'..."
    kubectl apply -f kubernetes/namespace.yaml
fi

echo "creating tickets deployment..."
kubectl apply -f kubernetes/tickets-deployment.yaml -n ems
echo "creating admin deployment..."
kubectl apply -f kubernetes/admin-deployment.yaml -n ems
echo "creating auth deployment..."
kubectl apply -f kubernetes/auth-deployment.yaml -n ems
echo "creating employee deployment..."
kubectl apply -f kubernetes/employee-deployment.yaml -n ems

echo "adding ingress to minikube..."
minikube addons enable ingress

echo "applying ingress rules..."
kubectl apply -f kubernetes/kong-ingress.yaml -n ems

install_kong() {
    echo "Installing Kong ingress controller..."
    helm repo add kong https://charts.konghq.com
    helm repo update
    helm install kong kong/kong -n kong --create-namespace --version 2.47.0 --set proxy.type=NodePort --set proxy.http.nodePort=31705 --set env.database=off
}

# helm install kong kong/kong -n kong --create-namespace --version 2.47.0 --set proxy.type=NodePort --set proxy.http.nodePort=31705 --set env.database=off

echo "All deployments are up and running."
echo "Script execution completed!"


# debugging commands
# kubectl logs <pod_name> -n <name-space>
# kubectl describe pod <pod_name> -n <name-space>
# 

# unset http_proxy
# unset https_proxy