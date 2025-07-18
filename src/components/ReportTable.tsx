import { h } from 'preact';

interface TestResult {
  name: string;
  status: 'passed' | 'failed';
}

interface Props {
  results: TestResult[];
}

export function ReportTable({ results }: Props) {
  return (
    <div class="p-4">
    <div class="animate-fade-in">
      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
        `}
      </style>
    
      <h1 class="text-2xl font-bold mb-4">Test Report</h1>
      <table class="table-auto w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">Test Name</th>
            <th class="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((test) => (
            <tr class={test.status === 'passed' ? 'bg-green-50' : 'bg-red-50'}>
              <td class="border px-4 py-2">{test.name}</td>
              <td class="border px-4 py-2 text-center">
                <span class={test.status === 'passed' ? 'text-green-600' : 'text-red-600'}>
                  {test.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}