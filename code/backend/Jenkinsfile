pipeline {
    agent {
        docker {
            image 'maven:3-alpine'
            args '-v /root/.m2:/root/.m2'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo build-stage'
            }
        }

         stage('Test') {
            steps {
                sh 'echo test-stage'
            }
         }
    }
}