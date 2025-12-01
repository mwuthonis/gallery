pipeline {
    agent any

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
                echo "Render will automatically deploy after GitHub push."
                // If you want to use a deploy hook instead, replace echo with the curl example below:
                // sh 'curl -X POST "$RENDER_HOOK"'
            }
        }
        stage('Push Changes') {
            steps {
                sh """
                git config --global user.email "muthonishelmith136@gmail.com"
                git config --global user.name "mwuthonis"
                git add .
                git commit -m "Update from Jenkins" || true
                git push origin main
                """
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
