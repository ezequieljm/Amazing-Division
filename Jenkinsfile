pipeline {
    // We use agent any because we will execute Docker commands via native Shell
    agent any 

    environment {
        // Variables to build and deploy the application container
        IMAGE_NAME = 'amazingdiv-app'
        IMAGE_TAG  = "${env.BRANCH_NAME ?:'latest'}"
        CONTAINER_NAME = "amazingdiv-server-${env.BRANCH_NAME ?: 'prod'}"
        PORT_APP = '80' 
    }

    stages {
        // === FASE CI (Continous Integration) ===
        stage('Install & Test & Build') {
            steps {
                echo "Running CI operations on branch ${env.BRANCH_NAME ?: 'unknown'}"
                // We use the official Node.js 20 Alpine image to run npm install, test and build inside a container
                sh "docker run --rm -u root -v ${WORKSPACE}:/app -w /app node:20-alpine sh -c 'npm install && npm test && npm run build'"
            }
        }

        stage('Docker Package (CI)') {
            steps {
                echo "Building Application Docker Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                // We compile the production image using the Dockerfile in the root of the project, which uses the build output from the previous stage
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        // === FASE CD (Continuous Deployment) ===
        stage('Local Deploy (CD)') {
            steps {
                echo 'Deploying application container locally...'
                
                sh """
                    if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
                        echo "Stopping and removing old container..."
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    fi
                """

                sh "docker run --name ${CONTAINER_NAME} -p 3000:3000 -d ${IMAGE_NAME}:${IMAGE_TAG}"
                echo "Application deployed successfully inside the Jenkins network."

            }
        }
    }

    post {
        success {
            echo 'FEEDBACK: CI/CD Pipeline completed! App is live.'
            
            mail to: "${env.NOTIFY_EMAIL}",
                subject: "Jenkins Pipeline SUCCESS: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}]",
                body: """Hi!
                
                The project has been built, tested and deployed to production without any issues.
                
                Details of the execution:
                - Project: ${env.JOB_NAME}
                - Build Number: #${env.BUILD_NUMBER}
                - Branch: ${env.BRANCH_NAME ?: 'main'}
                
                The TypeScript code was compiled, the Jest tests passed in green and the Docker container is running in production on port ${env.PORT_APP}.
                
                You can view the complete logs here: ${env.BUILD_URL}
                
                Best regards,
                Your Jenkins Server."""
        }
        
        failure {
            echo 'FEEDBACK: Pipeline failed. Check the stage logs.'
            
            mail to: "${env.NOTIFY_EMAIL}",
                subject: "Jenkins Pipeline FAILED: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}]",
                body: """Warning! The Pipeline FAILED."
                
                Detected an error during the CI/CD cycle execution.
                
                Details of the failure:
                - Project: ${env.JOB_NAME}
                - Build Number: #${env.BUILD_NUMBER}
                
                It is very likely that one of the automated tests failed or that there was a compilation error in the TypeScript code. The deployment to production was canceled to protect the environment.
                
                Please review the console output immediately to fix the bug:
                👉 ${env.BUILD_URL}console
                
                Best regards,
                Your Jenkins Server."""
        }
    }
}