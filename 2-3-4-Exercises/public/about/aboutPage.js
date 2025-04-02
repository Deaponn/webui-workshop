import { h, iconHome, iconEye } from "/js/src/index.js";

const homeButton = (model) =>
    h(
        "button",
        {
            onclick: () => {
                console.log("taking user to Home page");
                model.router.go("?page=home");
            },
        },
        ["Home", iconHome()]
    );

const infoButton = (model) =>
    h(
        "button",
        {
            onclick: () =>
                console.log(
                    "Basic WebUI Workshop training application",
                    model.aboutModel.getDetails()
                ),
        },
        ["About the page", iconEye()]
    );

const detailsButton = (model) =>
    h(
        "button",
        {
            onclick: () => {
                model.aboutModel.appendDetails(`new detail @ ${Date.now()}`, "detail text");
            },
        },
        "Get details"
    );

const detailsTable = (model) => [
    h("", `getDetails count: ${model.aboutModel.getRequestedTimes()}`),
    h(
        "table.table.table-primary",
        [h("thead", h("tr", [h("th", "Key"), h("th", "Value")]))].concat(
            h(
                "tbody",
                Object.entries(model.aboutModel.getDetails()).map(([key, value]) =>
                    h("tr", [h("td", key), h("td", value)])
                )
            )
        )
    ),
];

const content = (model) =>
    h("", [
        "About Page",
        homeButton(model),
        infoButton(model),
        detailsButton(model),
        detailsTable(model),
    ]);

export default content;
