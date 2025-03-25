import { h, info, iconPerson, iconWrench } from "/js/src/index.js";

const content = (model) => h("", [
        "Home Page",
        h(
            "button",
            {
                onclick: () => {
                    console.log("taking user to About page");
                    model.router.go("?page=about");
                },
            },
            ["About", info()]
        ),
        h(
            "button",
            {
                onclick: () => console.log(model.session.name),
            },
            ["Get username", iconPerson()]
        ),
        h(
            "button",
            {
                onclick: () => model.homeModel.setUsername("NewUsername"),
            },
            ["Change username", iconWrench()]
        ),
        h("", `Your username is ${model.homeModel.getUsername()}`)
    ]);

export default content;
