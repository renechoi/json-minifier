import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.minifyJson', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            const text = document.getText(selection);
            if (text) {
                try {
                    const minifiedJson = JSON.stringify(JSON.parse(text));
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, minifiedJson);
                    });
                    vscode.window.showInformationMessage('JSON Minified!');
                } catch (error) {
                    vscode.window.showErrorMessage('Invalid JSON!');
                }
            } else {
                vscode.window.showErrorMessage('No JSON selected!');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
