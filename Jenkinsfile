pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        REPOSITORY = "public.ecr.aws/z4m1p6s9/amcart-search"
        IMAGE_NAME = "amcart-search"
    }
    stages {
         stage('Build') { 
            steps { 
                script {
                    bat "docker build -t amcart-search ."
                }
            }
        }
        stage('Tag & Deploy Image to ECR') {
            steps {
                script {
                    bat "docker tag ${IMAGE_NAME} ${REPOSITORY}:latest"
                    bat "docker push ${REPOSITORY}:latest"
                    bat "docker tag ${IMAGE_NAME} ${REPOSITORY}:${env.BUILD_NUMBER}"
                    bat "docker push ${REPOSITORY}:${env.BUILD_NUMBER}"
                }
            }
        }

        stage ('Deploy Service') {
            steps {
                script {
                    if ("${BRANCH_NAME}" == 'main') {
                        build propagate: false, job: 'services/amcart-search-cd/main'
                    }
                    if ("${BRANCH_NAME}" == 'test') {
                        build propagate: false, job: 'services/amcart-search-cd/test'
                    }
                }
            }
        }
    }
}