pipeline {
    agent any

    stages {
        stage('Get Code') {
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
