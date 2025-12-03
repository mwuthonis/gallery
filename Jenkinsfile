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
                    mail to: 'muthonishelmith136@gmail.com',
                         subject: "Jenkins: TESTS FAILED",
                         body: "Your tests failed on Jenkins. Please check the pipeline logs."
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl -X POST "$RENDER_DEPLOY_HOOK"'
            }
            post {
                success {
                    slackSend(
                        channel: "#${env.SLACK_CHANNEL}",
                        color: 'good',
                        message: "Deployment to Render was successful!\nBuild ID: ${env.BUILD_ID}\nCheck it out here: ${env.RENDER_URL}",
                        tokenCredentialId: 'slack-webhook-id'
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
