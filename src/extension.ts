// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.showLineCountInFoldedSections', () => {
        if (vscode.window.activeTextEditor) {
            const editor = vscode.window.activeTextEditor;
            const foldedRegions = editor.visibleRanges.filter(range => range.start.line !== range.end.line);

            foldedRegions.forEach(range => {
                const lineCount = range.end.line - range.start.line;
                const decoration = vscode.window.createTextEditorDecorationType({
                    after: {
                        contentText: ` (${lineCount} lines)`,
                        color: 'gray',
                        margin: '0px 0px 0px 2px'
                    }
                });

                editor.setDecorations(decoration, [range]);
                context.subscriptions.push(decoration);
            });
        }
    });


	context.subscriptions.push(disposable);
  }
  
// This method is called when your extension is deactivated
export function deactivate() {}
