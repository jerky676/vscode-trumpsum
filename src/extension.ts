'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as https from 'https';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "trumpsum" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.trumpsum', () => {
        // The code you place here will be executed every time your command is executed

        const editor = vscode.window.activeTextEditor;
        var cheerio = require('cheerio');
        var htmlToText = require('html-to-text');
        var data = "";
       https.get('https://trumpipsum.net/?paras=1&type=make-it-great', (res) => {
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                var html = cheerio.load(data);
                var text = htmlToText.fromString(String(html('div.anyipsum-output > p')));
                console.log(text);
                editor.edit((eb) => {
                    eb.insert(editor.selection.active, text);
                });

            });
            res.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}


