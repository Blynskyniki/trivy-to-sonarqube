import { promises as fs } from 'fs';
import path from 'path';

import { SonarIssue, TrivyReport ,TrivySeverity} from './interfaces';
const ENGINE_ID ='Trivy'
const VULNERABILITY ='VULNERABILITY'

/**
 * Convert Severity trivy to sonarqube
 * @param {string} level
 * @returns {SonarIssue["severity"]}
 */
function convertSeverity(level:TrivySeverity): SonarIssue['severity'] {
  switch (level) {
    case 'HIGH':
      return 'BLOCKER';
    case 'LOW':
      return 'MINOR';
    case 'CRITICAL':
      return 'CRITICAL';
    case 'MEDIUM':
      return 'MAJOR';
    default:
      return 'INFO';
  }
}

export async function convertReport(inputFile: string, outputFile: string):Promise<void> {
  const reportBlob = await fs.readFile(path.join(inputFile));
  const report: TrivyReport | undefined = JSON.parse(reportBlob.toString() || '{}');
  const data: SonarIssue[] = [];
  for (const file of report?.Results || []) {
    // if exists
    for (const issue of file?.Misconfigurations || []) {
      data.push({
        engineId: ENGINE_ID,
        ruleId: issue.ID,
        primaryLocation: {
          filePath: file.Target,
          message: `${issue.ID} : ${issue.Message} => ${issue.Resolution} (${issue.PrimaryURL})`,
        },
        severity: convertSeverity(issue.Severity),
        type: VULNERABILITY,
      });
    }
    // if exists
    for (const issue of file?.Vulnerabilities || []) {
      data.push({
        engineId: ENGINE_ID,
        ruleId: issue.VulnerabilityID,
        primaryLocation: {
          filePath: file.Target,
          message: `${issue.VulnerabilityID} : ${issue.Title} \n ${issue.InstalledVersion} => ${issue.FixedVersion} \n ${issue.Description} (${issue.PrimaryURL})`,
        },
        severity: convertSeverity(issue.Severity),
        type: VULNERABILITY,
      });
    }
  }
  await fs.writeFile(path.join(outputFile), JSON.stringify({ issues: data }, null, 2), {
    flag: 'w',
  });


}
