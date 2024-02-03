pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        REPOSITORY = "public.ecr.aws/z4m1p6s9/amcart-product"
        IMAGE_NAME = "amcart-product"
    }
    stages {
         stage('Build') { 
            steps { 
                script {
                    bat "docker build -t amcart-product ."
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
    }
}