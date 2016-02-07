var generators = require('yeoman-generator');

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
        var src = this.templatePath("package.json");
        var dest = this.destinationPath("package.json");

        console.log(src);
        this.fs.copyTpl(src, dest, {
            projectName: answer.projectName,
            projectDesc: answer.projectDesc,
            githubUsername: answer.githubUsername,
            githubRepoUrl: answer.githubRepoUrl,
            email: answer.email,
            license: answer.license
        })
    },
    installDep: function () {
        //console.log("installing")
        this.npmInstall("", {"saveDev": true});
    }
});