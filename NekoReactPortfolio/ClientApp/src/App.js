"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
require("./custom.css");
var LoginForm_1 = require("./components/LoginForm");
var semantic_ui_react_1 = require("semantic-ui-react");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.default }),
    React.createElement(react_router_1.Route, { path: '/(.+)', render: function () { return (React.createElement(React.Fragment, null,
            React.createElement(semantic_ui_react_1.Container, { style: { marginTop: '1em', marginBottom: '1em' } },
                React.createElement(react_router_1.Route, { path: '/login', component: LoginForm_1.default })))); } }))); });
//# sourceMappingURL=App.js.map