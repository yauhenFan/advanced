pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/yauhenFan/advanced.git'
            }
        }
                  stage('SonarQube Analysis') {
        steps {
        sh 'sonar-scanner.bat -D"sonar.projectKey=TestProject" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9002" -D"sonar.token=${SONER_TOKEN}"'
    }} 
         stage('Dependencies') {
            steps {
                sh "npm i"
            }
        }
        stage('Test Run') {
            steps {
                sh "npm run ui"
            }
        }
    }
        post {
            always {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }