"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var Posts_1 = require("./Posts");
var Home = function (_a) {
    var props = _a.props, userdata = _a.userdata;
    return (React.createElement("div", { style: { margin: "1em" } }, userdata.username == '' ? (React.createElement(core_1.Card, null,
        React.createElement(core_1.CardHeader, { title: "Log in!" }),
        React.createElement(core_1.CardContent, null,
            React.createElement(semantic_ui_react_1.Button, { as: react_router_dom_1.Link, to: 'Login', size: 'huge', inverted: true }, "Log in to see my art!"))))
        : (React.createElement(Posts_1.default, { user: userdata }))));
};
exports.default = Home;
//# sourceMappingURL=Home.js.map