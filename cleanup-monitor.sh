#!/bin/bash

echo "🧹 Uninstalling Helm releases..."

# Uninstall Prometheus stack
helm uninstall kube-prometheus -n monitoring --ignore-not-found

# Uninstall Grafana (if installed separately — optional, harmless if not)
helm uninstall grafana -n monitoring --ignore-not-found

# Uninstall Ingress-NGINX
helm uninstall ingress-nginx -n ingress-nginx --ignore-not-found

echo "🧽 Deleting monitoring namespace resources..."
kubectl delete all --all -n monitoring --force --grace-period=0
kubectl delete configmap,secret,ingress,serviceaccount,role,rolebinding --all -n monitoring --force --grace-period=0
kubectl delete servicemonitor,prometheus,alertmanager,prometheusrule --all -n monitoring --ignore-not-found

echo "🧽 Deleting ingress-nginx namespace resources..."
kubectl delete all --all -n ingress-nginx --force --grace-period=0
kubectl delete configmap,secret,ingress,serviceaccount,role,rolebinding --all -n ingress-nginx --force --grace-period=0

echo "🧼 Deleting namespaces..."
kubectl delete namespace monitoring --ignore-not-found
kubectl delete namespace ingress-nginx --ignore-not-found

echo "🔓 Deleting ClusterRoles and ClusterRoleBindings..."
kubectl delete clusterrole $(kubectl get clusterrole -o name | grep -E 'prometheus|grafana|kube-prometheus|kube-state-metrics|node-exporter') --ignore-not-found
kubectl delete clusterrolebinding $(kubectl get clusterrolebinding -o name | grep -E 'prometheus|grafana|kube-prometheus|kube-state-metrics|node-exporter') --ignore-not-found

echo "🧨 Deleting monitoring CRDs..."
kubectl delete crd \
  alertmanagers.monitoring.coreos.com \
  alertmanagerconfigs.monitoring.coreos.com \
  podmonitors.monitoring.coreos.com \
  probes.monitoring.coreos.com \
  prometheuses.monitoring.coreos.com \
  prometheusrules.monitoring.coreos.com \
  scrapeconfigs.monitoring.coreos.com \
  servicemonitors.monitoring.coreos.com \
  thanosrulers.monitoring.coreos.com \
  prometheusagents.monitoring.coreos.com \
  --ignore-not-found

echo ""
echo "✅ Cleanup complete. Verifying..."

kubectl get namespace monitoring || echo "✅ monitoring namespace deleted"
kubectl get namespace ingress-nginx || echo "✅ ingress-nginx namespace deleted"
kubectl get crd | grep 'monitoring.coreos.com' || echo "✅ All Prometheus CRDs deleted"
kubectl get clusterrole,clusterrolebinding -A | grep -E 'prometheus|grafana|kube' || echo "✅ No Prometheus/Grafana cluster-scoped resources remain"
