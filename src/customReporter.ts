import fs from "fs";
import path from "path";
import { FullResult, Reporter } from "@playwright/test/reporter";

class CustomHtmlReporter implements Reporter {
  private results: { name: string; status: "passed" | "failed" }[] = [];

  onTestEnd(test: { title: any }, result: { status: string }) {
    const status = result.status === "passed" ? "passed" : "failed";
    this.results.push({ name: test.title, status });
  }

  async onEnd(result: FullResult) {
    const outputDir = path.join(process.cwd(), "ortoni-report");
    fs.mkdirSync(outputDir, { recursive: true });

    const viteAssetsDir = path.join(process.cwd(), "ortoni-report");
    const assetsSrcDir = path.join(viteAssetsDir, "assets");
    const assetsDestDir = path.join(outputDir, "assets");

    if (fs.existsSync(path.join(viteAssetsDir, "ortoni-report.js"))) {
      fs.copyFileSync(
        path.join(viteAssetsDir, "ortoni-report.js"),
        path.join(outputDir, "ortoni-report.js")
      );
    }

    if (fs.existsSync(assetsSrcDir)) {
      fs.mkdirSync(assetsDestDir, { recursive: true });
      fs.readdirSync(assetsSrcDir).forEach((file) => {
        fs.copyFileSync(
          path.join(assetsSrcDir, file),
          path.join(assetsDestDir, file)
        );
      });
    }

    const dataScript = `<script id="report-data" type="application/json">${JSON.stringify(
      this.results
    )}</script>`;
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Playwright Report</title>
        <link rel="stylesheet" href="./assets/index.css" />
        <script type="module" src="./ortoni-report.js"></script>
      </head>
      <body>
        <div id="app"></div>
        ${dataScript}
      </body>
      </html>
    `;
    fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf-8");
  }
}

export default CustomHtmlReporter;
