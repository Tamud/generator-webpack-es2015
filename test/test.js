"use strict";
var path = require("path");
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");

describe("webpack-es2015:app", function () {
    before(function (done) {
        helpers.run(path.join(__dirname, "../app"))
            .withOptions({ skipInstall: true })
            .withPrompts({
                projectName: "my-project",
                projectDesc: "description of my-project",
                githubUsername: "Tamud",
                email: "tamud82@gmail.com",
                githubRepoUrl: "https://github.com/Tamud",
                license: "MIT"
            }).on("end", done);
    });

    // check if files and directories exist
    it("should contain .gitignore file", function () {
        assert.file(".gitignore");
    });

    it("should contain .eslintrc file", function () {
        assert.file(".eslintrc");
    });

    it("should contain README.md file", function () {
        assert.file("README.md");
    });

    it("should contain package.json file", function () {
        assert.file("package.json");
    });

    it("should contain webpack.config.js file", function () {
        assert.file("webpack.config.js");
    });

    it("should contain test.js file", function () {
        assert.file("test/test.js");
    });

    it("should contain src/index.js file", function () {
        assert.file("src/index.js");
    });

    it("should contain demo/index.html file", function () {
        assert.file("demo/index.html");
    });

    it("should contain build/index.min.js file", function () {
        assert.file("build/index.min.js");
    });

    it("should contain src directory", function () {
        assert.file("src/");
    });

    it("should contain build directory", function () {
        assert.file("build/");
    });

    it("should contain test directory", function () {
        assert.file("test/");
    });

    it("should contain demo directory", function () {
        assert.file("demo/");
    });

    // check if answers been rendered to package.json file
    it("should contain projectName in package.json file", function () {
        assert.fileContent("package.json", /"name": "my-project"/);
    });

    it("should contain projectDesc in package.json file", function () {
        assert.fileContent("package.json", /"description": "description of my-project"/);
    });

    it("should contain repository url in package.json file", function () {
        assert.fileContent("package.json", /"url": "https:\/\/github.com\/Tamud"/);
    });

    it("should contain license in package.json file", function () {
        assert.fileContent("package.json", /"license": "MIT"/);
    });

    it("should contain author information in package.json file", function () {
        assert.fileContent("package.json", /"author": "Tamud <tamud82@gmail.com>"/);
    });
});