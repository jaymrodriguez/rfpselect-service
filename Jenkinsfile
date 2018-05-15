  def build_image(imageTag, dockerfile) {
    sh("docker version")
    sh("docker build -t ${imageTag} ${dockerfile}")
  }

  def push_image(imageTag) {
    sh("gcloud docker -- push ${imageTag}")
  }

  def deploy_to_gcp(feSvcName, imageTag, imagePlaceHolderPath, kuberPath) {
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
          sh("sed -i.bak 's#${imagePlaceHolderPath}#${imageTag}#' ./k8s/production/*.yaml")
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
          sh("sed -i.bak 's#${imagePlaceHolderPath}#${imageTag}#' ./k8s/dev/*.yaml")
          sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
          sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
          echo 'To access your environment run `kubectl proxy`'
          echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
    }
  }

node {
  def project = 'rfpselectdev'

  def serviceLayer = 'rfpselect-service'
  def frontendLayer = 'rfpselect-frontend'
  
  def serviceLayerService = "${serviceLayer}-frontend"
  def frontendLayerService = "${frontendLayer}-frontend"

  def imageTagService = "us.gcr.io/${project}/${serviceLayerService}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def imageTagFrontend = "us.gcr.io/${project}/${frontendLayerService}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  def serviceLayerPath = './service-layer'
  def frontendLayerPath = './front-end'

  checkout scm

  stage('Build images') {
    build_image(imageTagService, "${serviceLayerPath}/")
    build_image(imageTagFrontend, "${frontendLayerPath}/")
  }

  stage('Push image to registry') {
    push_image(imageTagService)
    push_image(imageTagFrontend)
  }

  stage("Deploy Application") {
    deploy_to_gcp(serviceLayerService, imageTagService, 'us.gcr.io/rfpselectdev/rfpselect-service:1.0.0', serviceLayerPath)
    deploy_to_gcp(frontendLayerService, imageTagFrontend, 'us.gcr.io/rfpselectdev/rfpselect-frontend:1.0.0', frontendLayerPath)
  }

}