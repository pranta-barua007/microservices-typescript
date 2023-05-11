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

## Developement setup

We need to edit the `host` file of our computer to identify our custom route  in dev environment.

![Find Host file](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/4-hostfile.png?raw=true)

Add `127.0.0.1 ticketing.dev` to the host file

![Edit Host file](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/4.1-hostfiledit.png?raw=true)

## Troubleshooting

You may face this error in `Chrome Browser` or `Chromium` based browsers

![Chrome Error](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/4.2-err.png?raw=true)

To fix the error -> 

- Click on the active tab of the browser
- Type `thisisunsafe`
- The error should gone by now

![Fix Chrome Error](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/4.3-fix.png?raw=true)

## Service's overview

![Service overview](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/1-service.png?raw=true)

## Mircroservice Architecture

![Service Architecture](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/3-design.png?raw=true)

## Events for communicating between Mircroservice's through NATS

![NATS Events](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/2-events.png?raw=true)

## Developement Flow

![Dev Flow](https://github.com/pranta-barua007/microservices-typescript/blob/master/__readme-images/5-devflow.png?raw=true)