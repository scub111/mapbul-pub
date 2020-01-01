pipeline {
  agent {
    docker {
      image 'node:10-alpine'
      args '-u root:root'
    }
  }
  environment {
    HOME = '.'
  }
  stages {
    stage('NPM install'){
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          sh 'npm -v'
          sh 'npm i webpack lerna rimraf -g'
          sh 'npm ci -q'
        }
      }
    }

    stage('Build'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          print "Start building..."
          sh 'npm run build:local'
          sh 'cd packages/common; npm run build'
        }
      }
    }
  }
}