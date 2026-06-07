// pipeline {
//     agent {
//         docker {
//             image 'node:20-alpine'
//             args '-u root'
//         }
//     }

//     environment {
//         NODE_ENV = 'development'
        
//         DOCKER_HOST = 'tcp://jenkins-docker:2376'
        
//         DOCKER_CERT_PATH = ''
//         DOCKER_TLS_VERIFY = ''
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Repository already cloned by Jenkins SCM.'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing node modules inside Node container...'
//                 sh 'npm install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 echo 'Executing Jest automation tests...'
//                 sh 'npm test'
//             }
//         }

//         stage('Build Project') {
//             steps {
//                 echo 'Compiling TypeScript code to JavaScript...'
//                 sh 'npm run build'
//             }
//         }
//     }

//     post {
//         success {
//             echo 'FEEDBACK: Build and tests passed successfully! The code is healthy.'
//         }
//         failure {
//             echo 'FEEDBACK: The pipeline failed. Check the logs above to find the bug.'
//         }
//     }
// }



pipeline {
    agent any 

    environment {
        DOCKER_HOST = 'tcp://jenkins-docker:2376'
        NODE_IMAGE  = 'node:20-alpine'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Repository already cloned by Jenkins SCM.'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Running npm install inside an isolated Node container...'
                sh "docker run --rm -u root -v ${WORKSPACE}:/app -w /app ${NODE_IMAGE} npm install"
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing Jest automation tests...'
                sh "docker run --rm -u root -v ${WORKSPACE}:/app -w /app ${NODE_IMAGE} npm test"
            }
        }

        stage('Build Project') {
            steps {
                echo 'Compiling TypeScript code to JavaScript...'
                sh "docker run --rm -u root -v ${WORKSPACE}:/app -w /app ${NODE_IMAGE} npm run build"
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