pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    environment {
        SLACK_CHANNEL = 'shelmith_ip1'
        RENDER_URL = 'https://gallery-zbc9.onrender.com/'
        SLACK_WEBHOOK = credentials('slack-webhook-id')
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook')
    }

    triggers {
        pollSCM('H/1 * * * *')
    }

    stages {
        stage('Checkout and Cloning Repo') {
            steps {
                checkout scm
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
        emailext(
            to: 'muthonishelmith136@gmail.com',
            subject: "❌ Jenkins Tests FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
Hello Shelmith,

Your tests FAILED in Jenkins for the Gallery project.

Check pipeline logs: ${env.BUILD_URL}
"""
        )
    }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X POST '${env.RENDER_DEPLOY_HOOK}'"
            }
            post {
                success {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        color: 'good',
                        message: "Deployment to Render was successful!\nBuild ID: ${env.BUILD_ID}\nCheck it out here: ${env.RENDER_URL}",
                        webhookUrl: SLACK_WEBHOOK
                    )
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
