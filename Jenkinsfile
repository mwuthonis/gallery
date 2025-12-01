pipeline {
    agent {
        docker { image 'node:lts' }
    }

    triggers {
        pollSCM('H/1 * * * *')   // Check for changes every minute
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/mwuthonis/gallery.git'
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
                echo "No tests yet, skipping"
            }
        }

        stage('Deploy to Render') {
            steps {
                // If Render autodeploys on GitHub push:
                echo "Render will automatically deploy after code is pushed."
               
                // If you are using a Render deploy hook, replace with:
                // sh "curl -X POST ${RENDER_DEPLOY_HOOK}"
                // sh 'curl -X POST https://api.render.com/deploy/...
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
