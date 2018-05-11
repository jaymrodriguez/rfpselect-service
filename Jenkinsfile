node {
  def project = 'rfpselectdev'
  def appName = 'rfpselect-service'
  def feSvcName = "${appName}-frontend"
  def imageTag = "us.gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  def build_image(path) {
    sh("docker build -t ${imageTag} .")
  }

  def push_image() {
    sh("gcloud docker -- push ${imageTag}")
  }

  def deploy_to_gcp() {
    switch (env.BRANCH_NAME) {
      // Roll out to canary environment
      case "canary":
          // Change deployed image in canary to the one we just built
          // -i edits the fie in-place. bak will create a backup file
          sh("sed -i.bak 's#us.gcr.io/rfpselectdev/rfpselect-service:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
          sh("kubectl --namespace=production apply -f k8s/services/")
          sh("kubectl --namespace=production apply -f k8s/canary/")
          sh("echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
          break

      // Roll out to production
      case "master":
          // Change deployed image in canary to the one we just built
          sh("sed -i.bak 's#us.gcr.io/rfpselectdev/rfpselect-service:1.0.0#${imageTag}#' ./k8s/production/*.yaml")
          sh("kubectl --namespace=production apply -f k8s/services/")
          sh("kubectl --namespace=production apply -f k8s/production/")
          sh("echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
          break

      // Roll out a dev environment
      default:
          // Create namespace if it doesn't exist
          sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
          // Don't use public load balancing for development branches
          sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/frontend.yaml")
          sh("sed -i.bak 's#us.gcr.io/rfpselectdev/rfpselect-service:1.0.0#${imageTag}#' ./k8s/dev/*.yaml")
          sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
          sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
          echo 'To access your environment run `kubectl proxy`'
          echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
    }
  }

  checkout scm

  stage('Build images') {
    build_image('react path')
    build_image('nodejs path')
  }

  stage('Push image to registry') {
    push_image('image react')
    push_image('image nodejs')
  }

  stage("Deploy Application") {
    deploy_to_gcp('react app')
    deploy_to_gcp('node app')
  }

}