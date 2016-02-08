"use strict";
var generators = require("yeoman-generator");
var mkdirp = require("mkdirp");

module.exports = generators.Base.extend({
    prompting: function () {
        var done = this.async();
        var prompts = [
            {
                type: "input",
                name: "projectName",
                message: "Your project name: ",
                default: this.appname,
                store: true
            },
            {
                type: "input",
                name: "projectDesc",
                message: "Your project description: ",
                store: true
            },
            {
                type: "input",
                name: "githubUsername",
                message: "Your Github username: ",
                store: true
            },
            {
                type: "input",
                name: "githubRepoUrl",
                message: "Github repository url of your project: ",
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
        var pkgJSON = "/package.json";
        var webpackrc = "/webpack.config.js";
        var eslintrc = "/.eslintrc";
        var srcFolder = "/src/";
        var buildFolder = "/build/";
        var demoFolder = "/demo/";

        // create files
        this.fs.copyTpl(srcRoot + pkgJSON, buildRoot + pkgJSON, {
            projectName: answer.projectName,
            projectDesc: answer.projectDesc,
            githubUsername: answer.githubUsername,
            githubRepoUrl: answer.githubRepoUrl,
            email: answer.email,
            license: answer.license
        });
        this.fs.copyTpl(srcRoot + webpackrc, buildRoot + webpackrc, {
            projectName: answer.projectName
        });
        this.fs.copy(srcRoot + eslintrc, buildRoot + eslintrc);

        // create directories
        mkdirp.sync(buildRoot + srcFolder);
        mkdirp.sync(buildRoot + buildFolder);
        mkdirp.sync(buildRoot + demoFolder);

        // install dependencies
        this.npmInstall("", {"saveDev": true});
    }
});