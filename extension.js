// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function showPyMessage(exec, filepath) {
	let coins = vscode.workspace.getConfiguration().get("binance.coins").join(" ");
	let command = "python " + filepath + " " + coins;
	exec(command, (error, stdout, stderr) => {
		let pymessage;
		if (error) {
			console.log(error);
			vscode.window.showInformationMessage(`${error}`);
			pymessage = "ERROR";
		}
		else {
			pymessage = stdout;
		}
		vscode.window.setStatusBarMessage(pymessage);
	});
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('binance.markPrice', function () {
		const { exec } = require('child_process');
		let filepath = __dirname + "/binance_price.py";
		let interval = vscode.workspace.getConfiguration().get("binance.interval");
		setInterval(showPyMessage, interval, exec, filepath);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
