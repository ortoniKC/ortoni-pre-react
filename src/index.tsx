import { h, render } from 'preact';
import { ReportTable } from './components/ReportTable';
import './style.css';

const data = JSON.parse(document.getElementById("report-data")!.textContent!);
render(<ReportTable results={data} />, document.getElementById("app")!);