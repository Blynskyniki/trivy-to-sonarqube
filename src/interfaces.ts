export interface SonarIssue {
  engineId: string;
  ruleId: string;
  primaryLocation: {
    message: string;
    filePath: string;
  };
  type: 'BUG' | 'VULNERABILITY' | 'CODE_SMELL';
  severity: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
}

export interface TryviReport {
  SchemaVersion: number;
  ArtifactName: string;
  ArtifactType: string;
  Results: Array<{
    Target: string;
    Class: string;
    Type: string;
    MisconfSummary?: {
      Successes: number;
      Failures: number;
      Exceptions: number;
    };
    Vulnerabilities?: Array<{
      VulnerabilityID: string;
      PkgName: string;
      InstalledVersion: string;
      FixedVersion: string;

      SeveritySource: string;
      PrimaryURL: string;
      DataSource: {
        ID: string;
        Name: string;
        URL: string;
      };
      Title: string;
      Description: string;
      Severity: 'HIGH' | 'LOW' | 'MEDIUM' | 'CRITICAL';

      References: string[];
      PublishedDate: string;
      LastModifiedDate: string;
    }>;
    Misconfigurations?: Array<{
      Type: string;
      ID: string;
      Title: string;
      Description: string;
      Message: string;
      Namespace: string;
      Query: string;
      Resolution: string;
      Severity: 'HIGH' | 'LOW' | 'MEDIUM' | 'CRITICAL';
      PrimaryURL: string;
      References: string[];
    }>;
  }>;
}
