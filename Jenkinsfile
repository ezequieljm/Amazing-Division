pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository from GitHub...'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing node modules...'
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