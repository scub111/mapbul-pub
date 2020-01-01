pipeline {
  agent any
  environment {
    HOME = '.'
  }
  stages {
    stage('Bootstrap'){
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          sh 'npm -v'
          sh 'lerna -v'
          sh 'npm run bootstrap'
        }
      }
    }

    stage('Build'){
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          print "Start building..."          
          sh 'npm run build'
        }
      }
    }
  }
}