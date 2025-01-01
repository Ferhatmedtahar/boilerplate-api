#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const colorError = "\x1b[31m";
const colorSuccess = "\x1b[32m";
const colorReset = "\x1b[0m";

function printError(message) {
  console.error(colorError, message + colorReset);
}

function printSuccess(message) {
  console.log(colorSuccess, message + colorReset);
}

const dir = process.argv[2];
// check if project name is provided and create directory if it doesn't exist
if (!dir)
  return printError(
    "please enter project name, run: create-p5-boilerplate [project-name]"
  );

if (fs.existsSync(dir))
  return printError("directory exists, please choose another name");

fs.mkdirSync(dir);

// copy files

printSuccess(`Created directory: ${dir}`);

// Determine the template path
const templatePath = path.join(__dirname, "./template");
if (!fs.existsSync(templatePath)) {
  return printError(`Template folder does not exist at ${templatePath}`);
}

// Copy the template
copyRecursiveSync(templatePath, dir);
printSuccess(`Boilerplate created successfully in ${dir}`);

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) {
    printError(`Source folder ${src} does not exist.`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
