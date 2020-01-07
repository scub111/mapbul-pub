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
          sh 'docker stop mapbul-pub-server'
          sh 'docker rm mapbul-pub-server'
          sh 'docker run -d --name mapbul-pub-server --restart always -p 3100:3100 mapbul-pub-server'
        }
      }
    }

    stage('SSR image'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker build -t mapbul-pub-ssr -f Dockerfile.ssr .'
        }
      }
    }

    stage('SSR container'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker stop mapbul-pub-ssr'
          sh 'docker rm mapbul-pub-ssr'
          sh 'docker run -d --name mapbul-pub-ssr --restart always -p 3300:3300 mapbul-pub-ssr'
        }
      }
    }

    stage('Docker prune'){
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          sh 'docker system prune -a -f'
        }
      }
    }
  }
}