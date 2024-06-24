pipeline {

    agent any
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
                        set +x
                        PAYLOAD="$payload" 
                        KEYS=$(echo "$PAYLOAD" | jq -r 'keys[]')
                        ACTION=$(echo "$PAYLOAD" | jq -r '.action')
                        PullRequestNumber=$(echo "$PAYLOAD" | jq -r '.number')
                        set -x
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
        stage('Checkout Angular Repo') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: '*/master']], 
                          doGenerateSubmoduleConfigurations: false, 
                          extensions: [[$class: 'CloneOption', depth: 1]], 
                          submoduleCfg: [], 
                          userRemoteConfigs: [[url: 'https://github.com/jkb91jkb91/Angular_gym_site_forking.git']]])
            }
        }
      stage('Cypress tests') {
            steps {
                script {
                  def result 
                    result = sh(script: '''
                        docker login -u admin -p Gowno123 http://16.170.201.82:8082
                        docker-compose -f Production_docker_compose/docker-compose_prod.yml up -d
                        cd ..
                        rm -rf cypress_e2e_tests
                        git clone git@github.com:jkb91jkb91/cypress_e2e_tests.git && cd cypress_e2e_tests
                        npm install
                        TERM=xterm npx cypress run --headless
                    ''', returnStatus: true)
                    if (result != 0) {
                        currentBuild.result = 'FAILURE'
                        error "Test section failed"
                    }
                }
            }
        }
        stage('MERGE PULL REQUEST and OPTIONALLY SEND DOCKER IMAGE TO ARTIFACTORY') {
            // TO DO >> SEND DOCKER IMAGE TO ARTIFACTORY
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
