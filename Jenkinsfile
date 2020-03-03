pipeline {
  
  agent none

  environment {

        GIT_CREDS = credentials('git')
  }

  stages {

    stage('Build') {
      agent {
        label "master"
      }
      steps {
          // Build new image
          sh "docker build -t 10.10.10.14:5000/demo:${env.GIT_COMMIT} ."
          // Publish new image
          sh "docker push 10.10.10.14:5000/demo:${env.GIT_COMMIT}"
      }
    }

    stage('Promote to Staging') {
      agent {
          docker {
              image 'argoproj/argo-cd-ci-builder:v0.13.1'
              args '--tty'
          }
      }
      steps {
          sh "rm -rf ./argocd-demo-deploy"
          sh "git clone https://$GIT_CREDS_USR:$GIT_CREDS_PSW@github.com/IAMDEH/argocd-demo-deploy.git"

          dir("argocd-demo-deploy") {
            sh "cd ./e2e && kustomize edit set image 10.10.10.14:5000/demo:${env.GIT_COMMIT}"
            sh "git commit -am 'Publish new version' && git push || echo 'no changes'"
          }
      }
    }

    stage('Promote to Prod') {
      agent {
          docker {
              image 'argoproj/argo-cd-ci-builder:v0.13.1'
              args '--tty'
          }
      }
      steps {
          input message:'Approve deployment?'

          dir("argocd-demo-deploy") {
            sh "cd ./prod && kustomize edit set image 10.10.10.14:5000/demo:${env.GIT_COMMIT}"
            sh "git commit -am 'Publish new version' && git push || echo 'no changes'"
          }
      }
    }
  }
}
