pipeline {
    environment {
        NODE_ENV = 'development'
        DOCKER_HOST = 'tcp://172.18.0.2:2375'
        DOCKER_TLS_VERIFY = ''
    }

    agent {
        docker {
            image 'node:20-alpine'
            args '-u root'
        }
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