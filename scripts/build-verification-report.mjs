import fs from 'node:fs';
import vm from 'node:vm';

const code = fs.readFileSync(new URL('../data.js', import.meta.url), 'utf8');
const context = { window: {}, encodeURIComponent };
vm.createContext(context);
vm.runInContext(code, context);
const schools = context.window.SCHOOL_DATA;

const columns = [
  'id','school','zh','city','usNews','qs','nobel','costUG','admitUG','cdsC7Status','cdsC7Year','cdsC7Source','costStatus','admitStatus','nobelStatus','tuitionSource','nobelSource','scorecardSource'
];
const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const rows = schools.map((s) => ({
  id: s.id,
  school: s.name,
  zh: s.zh,
  city: s.city,
  usNews: s.usNews,
  qs: s.qs,
  nobel: s.nobel,
  costUG: s.costUG,
  admitUG: s.admitUG,
  cdsC7Status: s.verification.cdsC7,
  cdsC7Year: s.cdsC7.year,
  cdsC7Source: s.cdsC7.source,
  costStatus: s.verification.cost,
  admitStatus: s.verification.admitRate,
  nobelStatus: s.verification.nobel,
  tuitionSource: s.sourceLinks.tuition,
  nobelSource: s.sourceLinks.nobel,
  scorecardSource: s.sourceLinks.scorecard,
}));
const csv = [columns.join(','), ...rows.map((row) => columns.map((col) => escapeCsv(row[col])).join(','))].join('\n') + '\n';
fs.writeFileSync(new URL('../verification-report.csv', import.meta.url), csv);
console.log(`Wrote ${rows.length} rows to verification-report.csv`);
