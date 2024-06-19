pipeline {
    agent any
  
        environment {
            DOCKER_REGISTRY = 'http://13.60.25.250:8082'  
            DOCKER_USERNAME = credentials('admin')  
            DOCKER_PASSWORD = credentials('Gowno123*')  
        }
  
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'payload', value: '$'] // Przekazujemy cały payload jako zmienną
            ],
            causeString: 'Triggered on $ref',
            token: 'gowno',
            tokenCredentialId: '',
            printContributedVariables: false,
            printPostContent: false,
            silentResponse: false,
            shouldNotFlatten: false,
            regexpFilterText: '$ref'
        )
    }
    stages {
        stage('WEBHOOK PAYLOAD') {
            steps {
                script {
                    def result 
                    result = sh(script: '''
                        PAYLOAD="$payload" 
                        KEYS=$(echo "$PAYLOAD" | jq -r 'keys[]' )
                        ACTION=$(echo "$PAYLOAD" | jq -r '.action')
                        PullRequestNumber=$(echo "$PAYLOAD" | jq -r '.number')
                        echo "KEYS: $KEYS"
                        echo "PullRequestNumber=$PullRequestNumber"
                        echo "ACTION: $ACTION"
                        if [ "$ACTION" = "closed" ] || [ "$ACTION" = "reopened" ]; then
                            echo "Pipeline został zatrzymany z powodu specjalnego warunku"
                            exit 1
                        fi
                        echo $PullRequestNumber > pr_number.txt
                    ''', returnStatus: true) 
                     if (result != 0) {
                        currentBuild.result = 'NOT_BUILT'
                        error "Pipeline został zatrzymany z powodu specjalnego warunku"
                    }  
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: '*/master']], 
                          doGenerateSubmoduleConfigurations: false, 
                          extensions: [[$class: 'CloneOption', depth: 1]], 
                          submoduleCfg: [], 
                          userRemoteConfigs: [[url: 'https://github.com/jkb91jkb91/Angular_gym_site_forking.git']]])
            }
        }
       stage('List files') {
            steps {
                script {
                    sh 'ls'
                }
            }
        }

      stage('Docker pull images') {
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY, DOCKER_USERNAME, DOCKER_PASSWORD) {
                        // Możesz wykonać dowolne operacje związane z Dockerem tutaj
                        sh 'docker pull angular_prod/angular:1.0'
                        sh 'docker images'
                    }
                }
            }
        }
        stage('SEND DOCKER IMAGE TO REPO and MERGE CODE TO GITHUB') {
            steps {
                script {
                      def userInput = input(
                        id: 'userInput',
                        message: 'MERGE REUQEST',
                        parameters: [
                            choice(name: 'CONFIRM MR', choices: ['MERGE'])
                        ]
                      )
                      withCredentials([string(credentialsId: 'jenkins_token', variable: 'TOKEN')]) {
                        def githubApiUrl = 'https://api.github.com'
                        def prNumber = readFile('pr_number.txt').trim()
                        def jenkins_token = env.TOKEN
                        echo "TOKEN: ${jenkins_token}"
                        sh """
                            curl -X PUT -u jkb91jkb91:${jenkins_token} ${githubApiUrl}/repos/jkb91jkb91/webhook_training/pulls/${prNumber}/merge
                        """
                    }
                }
            }
        }
    }
}
