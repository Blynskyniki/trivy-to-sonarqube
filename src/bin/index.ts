#!/usr/bin/env node

import * as yargs from 'yargs';
import { convertReport } from '../index';

const options: {
  output: string,
  file: string
} = <any>yargs
  .usage('Usage: -f <name>')
  .usage('Usage: -o <name>')
  .option('f', { alias: 'file', describe: 'Your trivy report', type: 'string', demandOption: true })
  .option('o', { alias: 'output', describe: 'Path to save sonarqube report', type: 'string', demandOption: true })
  .argv;

console.log('starting....');

convertReport(options.file, options.output).catch(e => {
  console.error(e);
  process.exit(1);
}).then(() => {
  console.log('Done');
  process.exit(0);
});
