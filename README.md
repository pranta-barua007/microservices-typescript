## Mircroservice Typescript

An microservices app created with Express.js, Typescript, MongoDB, BullJS, Docker, Kubernernetes, Ingress-NGINX & NATS.

## Getting Started
requirements
* [Docker](https://www.docker.com)
* [Kubernetes](https://kubernetes.io)
* [Skaffold](https://skaffold.dev/docs/install)

## Available Commands
To install INGRESS-NGNIX
```console
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml
```

To run all services at parallel
```console
$ skaffold dev
```

To set a JSON web token secret
```console
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=yourTokenSecret
```

To set a STRIPE secret (needed for `payments` service)
Create your STRIPE account and get the secret
* [stripe](https://stripe.com/docs/keys)
```console
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
```

Check all created secrets
```console
$ kubectl get secrets
```

## Service's overview

![Service overview](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/1-service.png?raw=true)

## Mircroservice Architecture

![Service Architecture](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/3-design.png?raw=true)

## Events for communicating between Mircroservice's through NATS

![NATS Events](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/2-events.png?raw=true)