pipeline {
    // We use agent any because we will execute Docker commands via native Shell
    agent any 

    environment {
        // Variables to build and deploy the application container
        IMAGE_NAME = 'safediv-app'
        IMAGE_TAG  = 'latest'
        CONTAINER_NAME = 'safediv-production-server'
        PORT_APP = '80' 
    }

    stages {
        // === FASE CI (Continous Integration) ===
        stage('Install & Test & Build') {
            steps {
                echo 'Running CI operations...'
                // We use the official Node.js 20 Alpine image to run npm install, test and build inside a container
                sh "docker run --rm -u root -v ${WORKSPACE}:/app -w /app node:20-alpine sh -c 'npm install && npm test && npm run build'"
            }
        }

        stage('Docker Package (CI)') {
            steps {
                echo 'Building Application Docker Image...'
                // We compile the production image using the Dockerfile in the root of the project, which uses the build output from the previous stage
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        // === FASE CD (Continuous Deployment) ===
        stage('Local Deploy (CD)') {
            steps {
                echo 'Deploying application container locally...'
                
                // If the container with the same name is running, we stop and remove it to avoid conflicts with the new one
                sh """
                    if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
                        echo "Stopping and removing old container..."
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    fi
                """

                // We run the new container mapping the internal port 3000 of Express to port 80 of the dind docker container
                sh "docker run --name ${CONTAINER_NAME} -d -p ${PORT_APP}:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
                
                echo "Application deployed successfully"
            }
        }
    }

    post {
        success {
            echo 'FEEDBACK: CI/CD Pipeline completed! App is live.'
        }
        failure {
            echo 'FEEDBACK: Pipeline failed. Check the stage logs.'
        }
    }
}