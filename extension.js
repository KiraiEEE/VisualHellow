// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	const disposable = vscode.commands.registerCommand('visualhellow.addLog', function () {

		//access to editor
		const editor = vscode.window.activeTextEditor;
		if(editor){
		//extract selected text
		const selection = editor.selection;
		const document = editor.document;
		const selectedText = document.getText(selection);
		if(selectedText.trim()){
		editor.edit(editorBuilder => {
		const currentLine = selection.start.line;
		const currentLineText = document.lineAt(currentLine).text;
		const endOfCurrentLine = new vscode.Position(
			currentLine,
			currentLineText.length
		)
		const consoleLog = `console.log(\`${selectedText}:\`, ${selectedText});`;
		const matchResult = currentLineText.match(/^\s*/);
		const indentLength = matchResult ? matchResult[0].length : 0;
		const indentationString = ' '.repeat(indentLength);
		editorBuilder.insert(endOfCurrentLine,`\n${indentationString}${consoleLog}`)
		});
		}else{
			vscode.window.showErrorMessage("No Variable Selected");
		}
		}


	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
