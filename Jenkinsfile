pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-u root'
        }
    }

    environment {
        NODE_ENV = 'development'
        
        DOCKER_HOST = 'tcp://jenkins-docker:2376'
        
        DOCKER_CERT_PATH = ''
        DOCKER_TLS_VERIFY = ''
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Repository already cloned by Jenkins SCM.'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing node modules inside Node container...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing Jest automation tests...'
                sh 'npm test'
            }
        }

        stage('Build Project') {
            steps {
                echo 'Compiling TypeScript code to JavaScript...'
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'FEEDBACK: Build and tests passed successfully! The code is healthy.'
        }
        failure {
            echo 'FEEDBACK: The pipeline failed. Check the logs above to find the bug.'
        }
    }
}