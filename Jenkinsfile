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
        timeout(time: 3, unit: 'MINUTES') {
          sh 'npm run build'
        }
      }
    }

    stage('Server image'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker build -t mapbul-pub-server -f Dockerfile.server .'
        }
      }
    }

    stage('Server container'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker stop mapbul-pub-server-cn'
          sh 'docker rm mapbul-pub-server-cn'
          sh 'docker run -d --name mapbul-pub-server-cn --restart always -p 3100:3100 mapbul-pub-server'
        }
      }
    }
  }
}