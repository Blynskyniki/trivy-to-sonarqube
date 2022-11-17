## Install

```bash
npm i trivy-to-sonarqube -g
```


## Generate trivy report 
```bash
trivy fs --ignorefile .trivyignore  -f json -o trivy-report.json  .
trivy config --ignorefile .trivyignore  -f json -o trivy-report.json  .
trivy image --ignorefile .trivyignore  -f json -o trivy-report.json  my-docker-image


```

## Convert data to sonarqube generic issue format 

```bash 
trivy-to-sonarqube -f trivy-report.json -o ./my-sonarqube-report.json

```


## Run sonar-scaner witch additional params
```bash
 sonar-scanner 
      -Dsonar.projectKey=MyProject
      -Dsonar.host.url=my-host.com
      -Dsonar.login=${SONARQUBE_TOKEN}
      -Dsonar.sources=.
      -Dsonar.externalIssuesReportPaths=./trivy-report.json


```
