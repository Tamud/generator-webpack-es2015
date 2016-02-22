"use strict";
var generators = require("yeoman-generator");
var mkdirp = require("mkdirp");
var walk = require("walk");

module.exports = generators.Base.extend({
    prompting: function () {
        var done = this.async();
        var answer = this.config.get("answer");
        var projectName = answer && answer.projectName || "";
        var githubRepoUrl = answer && answer.githubRepoUrl || "";
        var projectDesc = answer && answer.projectDesc || "";
        var prompts = [
            {
                type: "input",
                name: "projectName",
                message: "Your project name: ",
                default: this.appname
            },
            {
                type: "input",
                name: "projectDesc",
                message: "Your project description: ",
                default: projectDesc
            },
            {
                type: "input",
                name: "githubUsername",
                message: "Your Github username: ",
                store: true
            },
            {
                type: "input",
                name: "email",
                message: "Your email:",
                store: true
            },
            {
                type: "input",
                name: "githubRepoUrl",
                message: "Github repository url of your project: ",
                default: githubRepoUrl
            },
            {
                type: "input",
                name: "license",
                message: "License of your project: ",
                store: true
            }
        ];

        this.prompt(prompts, function (answer) {
            this.config.set("answer", answer);
            done();
        }.bind(this));
    },
    writing: function () {
        var answer = this.config.get("answer");
        var srcRoot = this.templatePath();
        var buildRoot = this.destinationPath();
        var walker = walk.walk(srcRoot);

        // create files
        walker.on("file", function fileHandler (root, stat, next) {
            var filename = "/" + stat.name;

            this.fs.copyTpl(srcRoot + filename, buildRoot + filename, answer);
            next();
        }.bind(this));

        // create directories
        walker.on("directory", function directoryHandler (root, stat, next) {
            var dirname = "/" + stat.name;

            mkdirp(buildRoot + dirname);
            next();
        }.bind(this));

        // install dependencies after files and directories been created
        walker.on("end", function walkEndHandler () {
            //this.npmInstall("", {"saveDev": true});
        }.bind(this));

        // handle errors
        walker.on("error", function errorHandler (root, stat, next) {
            stat.forEach(function errorIterator (err) {
                console.error("[ERROR] " + err.name);
                console.error(err.error.message || (err.error.code + ": " + err.error.path));
            });
            next();
        });
    }
});