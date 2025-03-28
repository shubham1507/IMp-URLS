pipeline {
    agent { node { label 'cm-linux' } }

    parameters {
        choice(name: 'Type', choices: ['Change_WITHOUT_SourceCode_update', 'Change_with_SourceCode_update'], description: 'Select type of CR')
        string(name: 'CRNumber', defaultValue: '', description: 'Change Request (CR) Number')
        string(name: 'RequirementUrls', defaultValue: '', description: 'Requirement URLs (comma-separated)')
        string(name: 'testEvidenceUrl', defaultValue: '', description: 'Test Evidence URL')
        string(name: 'postDeploymentVerificationEvidenceUrl', defaultValue: '', description: 'Post Deployment Verification Evidence URL')
        string(name: 'independentCodeReviewUrl', defaultValue: '', description: 'Independent Code Review URL')
        string(name: 'businessApprovalUrl', defaultValue: '', description: 'Business Approval URL')
        string(name: 'AutomatedRegressionTestUrls', defaultValue: '', description: 'Automated Regression Test URLs (comma-separated)')
        string(name: 'Source_Code_URL', defaultValue: 'NA', description: 'Source Code URL (MANDATORY for Change_with_SourceCode_update)')
    }

    stages {
        stage('UpdateEvidence') {
            steps {
                script {
                    def requirementUrlsValue = params.RequirementUrls ? params.RequirementUrls.split(',').collect { it.trim() } : []
                    def automatedRegressionTestUrlsValue = params.AutomatedRegressionTestUrls ? params.AutomatedRegressionTestUrls.split(',').collect { it.trim() } : []
                    def sourceCodeUrlValue = params.Source_Code_URL

                    def change = [
                        testEvidenceUrl: params.testEvidenceUrl,
                        independentCodeReviewUrl: params.independentCodeReviewUrl,
                        businessApprovalUrl: params.businessApprovalUrl,
                        requirementUrls: requirementUrlsValue,
                        postDeploymentVerificationEvidenceUrl: params.postDeploymentVerificationEvidenceUrl,
                        vulnerabilityScanUrl: "https://security-scan.systems.uk.hsbc/vulnerability-report/${params.CRNumber}",
                        automatedRegressionTestUrls: automatedRegressionTestUrlsValue
                    ]

                    def fieldsToUpdate = [
                        "requirementUrls",
                        "businessApprovalUrl",
                        "independentCodeReviewUrl",
                        "postDeploymentVerificationEvidenceUrl",
                        "testEvidenceUrl",
                        "automatedRegressionTestUrls",
                        "vulnerabilityScanUrl"
                    ]

                    if (params.Type == "Change_with_SourceCode_update") {
                        if (!sourceCodeUrlValue || !sourceCodeUrlValue.startsWith('http')) {
                            error "Source_Code_URL must be a valid URL starting with 'http://' or 'https://'"
                        }

                        def componentName = sourceCodeUrlValue.tokenize('/')[-1]
                        def sastScanUrl = "https://wpb-confluence.systems.uk.hsbc/display/SCAN/${componentName}/SAST"
                        def mastScanUrl = "https://wpb-confluence.systems.uk.hsbc/display/SCAN/${componentName}/MAST"

                        change.sastScanUrl = sastScanUrl
                        change.mastScanUrl = mastScanUrl
                        fieldsToUpdate.addAll(["sastScanUrl", "mastScanUrl"])

                        def artifactsValue = [
                            [
                                "url": sourceCodeUrlValue,
                                "componentId": componentName,
                                "id": componentName,
                                "artifactType": "source-code",
                                "repositoryUrl": sourceCodeUrlValue
                            ]
                        ]
                        change.artifacts = [artifacts: artifactsValue]
                        fieldsToUpdate.add("artifacts")
                    }

                    def jsonPayload = [
                        change: change,
                        fieldsToUpdate: fieldsToUpdate
                    ]

                    def jsonString = new groovy.json.JsonBuilder(jsonPayload).toPrettyString()
                    def response = sh(script: """
                        curl -i -s -X PATCH "https://ice.it.global.hsbc/ice/api/v1/changes/${params.CRNumber}" \\
                        -H 'accept: */*' \\
                        -H 'Authorization: Basic aHpfdXNlcjpOb1M1V0tOTVNqaVJpUTdCeWVmLThVY3hpTjAtbXJBaGpWNzl0ZHpqSmFF' \\
                        -H 'Content-Type: application/json' \\
                        -d '${jsonString}'
                    """, returnStdout: true).trim()

                    echo "HTTP response: ${response}"
                    if (response.contains("204")) {
                        println("The update is successful, Thank You")
                    } else {
                        error "Failed to update evidence. Please check the input and try again."
                    }
                }
            }
        }
    }
}
