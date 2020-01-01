pipeline {
  agent any
  environment {
    HOME = '.'
  }
  stages {
    stage('NPM install'){
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          sh 'npm -v'
          sh 'npm i webpack webpack-cli lerna rimraf -g'
          sh 'npm ci -q'
        }
      }
    }

    stage('Build'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          print "Start building..."          
          sh 'uname -a'
          sh 'pwd'
          sh 'npm run build:local'
          sh 'lerna run --scope @mapbul-pub/common build'
        }
      }
    }
  }
}