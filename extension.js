const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  const provider = new OneRequestViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "onerequest.panelView",
      provider,
      { webviewOptions: { retainContextWhenHidden: true } },
    ),
  );

  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("onerequest.port")) {
      provider.refresh();
    }
  });
}

function deactivate() {}

class OneRequestViewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
    this._view = undefined;
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    this._updateHtml();

    webviewView.onDidDispose(() => {
      this._view = undefined;
    });
  }

  refresh() {
    if (this._view) {
      this._updateHtml();
    }
  }

  _updateHtml() {
    const port = vscode.workspace
      .getConfiguration("onerequest")
      .get("port", 23198);

    const templatePath = path.join(
      this._extensionUri.fsPath,
      "webview",
      "feedback.html",
    );
    let html = fs.readFileSync(templatePath, "utf-8");
    html = html.replace(/\{\{PORT\}\}/g, String(port));
    this._view.webview.html = html;
  }
}

module.exports = { activate, deactivate };
