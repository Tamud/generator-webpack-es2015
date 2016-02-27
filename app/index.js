"use strict";
var generators = require("yeoman-generator");
var mkdirp = require("mkdirp");
var walk = require("walk");
var isWindows = /^win/.test(process.platform);
var dirSuffix = isWindows ? "\\" : "/";

module.exports = generators.Base.extend({
    prompting: function () {
        var self = this;
        var done = this.async();
        var answer = this.config.get("answer");
        var githubRepoUrl = answer && answer.githubRepoUrl;
        var projectDesc = answer && answer.projectDesc;
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
            },
            //{
            //    type: "list",
            //    name: "preprocessor",
            //    message: "Which CSS preprocessor listed below you prefer?",
            //    choices: [
            //        "none",
            //        "sass",
            //        "scss",
            //        "less",
            //        "stylus"
            //    ],
            //    default: 0
            //},
            //{
            //    type: "list",
            //    name: "template",
            //    message: "Which template engine listed below you prefer?",
            //    choices: [
            //        "none",
            //        "jade",
            //        "ejs",
            //        "swig",
            //        "haml",
            //        "mustache"
            //    ]
            //}
        ];

        self.prompt(prompts, function (answer) {
            self.config.set("answer", answer);
            done();
        });
    },
    writing: function () {
        var self = this;
        var answer = this.config.get("answer");
        var srcRoot = this.templatePath();
        var buildRoot = this.destinationPath();
        var option = {
            listeners: {
                // create directories
                directory: function directoryHandler (root, stat, next) {
                    var dirname = dirSuffix + stat.name;
                    var relativePath = root.replace(srcRoot, "");
                    var destPath = buildRoot + relativePath;

                    mkdirp(destPath + dirname, function (err) {
                        if (err) {
                            self.log(err);
                        } else {
                            self.log.create(relativePath + stat.name + dirSuffix);
                        }
                    });
                    next();
                },

                // create files
                file: function fileHandler (root, stat, next) {
                    var filename = dirSuffix + stat.name;
                    var relativePath = root.replace(srcRoot, "");
                    var destPath = buildRoot + relativePath;

                    self.fs.copyTpl(root + filename, destPath + filename, answer);
                    next();
                },

                // install dependencies after files and directories been created
                end: function walkEndHandler () {
                    self.npmInstall("");
                },

                // handle errors
                errors: function errorHandler (root, stat, next) {
                    stat.forEach(function errorIterator (err) {
                        console.error("[ERROR] " + err.name);
                        console.error(err.error.message || (err.error.code + ": " + err.error.path));
                    });
                    next();
                }
            }
        };

        walk.walkSync(srcRoot, option);
    }
});