pipeline {
    agent any

    tools {
        nodejs "node24"
    }

    triggers {
        pollSCM('H/1 * * * *')   // Check for changes every minute
    }

    stages {
        stage('Checkout and Cloning Repo') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build || echo "No build step defined"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                unsuccessful {
                    mail to: 'muthonishelmith136@gmail.com',
                         subject: "Jenkins: TESTS FAILED",
                         body: "Your tests failed on Jenkins. Please check the pipeline logs."
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Render will automatically deploy after GitHub push."
                // If you want to use a deploy hook instead, replace echo with the curl example below:
                // sh 'curl -X POST "$RENDER_HOOK"'
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
