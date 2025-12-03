pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    environment {
        SLACK_CHANNEL = 'shelmith_ip1'
        RENDER_URL = 'https://gallery-zbc9.onrender.com/'
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
                sh 'curl -X POST "https://api.render.com/deploy/srv-d4labdshg0os73b5k0gg?key=--4s6glpt8Q"'
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
