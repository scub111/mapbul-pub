pipeline {
  agent {
    docker {
      image 'node:10-alpine'
      args '-p 3000:3000'
    }
  }
  environment {
    HOME = '.'
  }
  stages {
    stage('NPM install'){
      steps {
        sh 'npm -v'
        sh 'npm i webpack lerna -q'
        sh 'npm ci -q'
      }
    }

    stage('Build'){
      steps {
        print "Start building..."
        sh 'cd packages/common'
        sh 'npm run build'
      }
    }
  }
}