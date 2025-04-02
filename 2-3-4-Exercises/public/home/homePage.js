import { h, info, iconPerson, iconWrench } from "/js/src/index.js";

const aboutButton = (model) =>
    h(
        "button",
        {
            onclick: () => {
                console.log("taking user to About page");
                model.router.go("?page=about");
            },
        },
        ["About", info()]
    );

const usernameButton = (model) =>
    h(
        "button",
        {
            onclick: () => console.log(model.session.name),
        },
        ["Get username", iconPerson()]
    );

const usernameChange = (model) =>
    h(
        "button",
        {
            onclick: () => model.homeModel.setUsername("NewUsername"),
        },
        ["Change username", iconWrench()]
    );

const displayUsername = (model) => h("", `Your username is ${model.homeModel.getUsername()}`);

const content = (model) =>
    h("", [
        "Home Page",
        aboutButton(model),
        usernameButton(model),
        usernameChange(model),
        displayUsername(model),
    ]);

export default content;
