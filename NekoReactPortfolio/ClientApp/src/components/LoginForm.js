"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var core_2 = require("@material-ui/core");
var formik_1 = require("formik");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var MyTextInput_1 = require("./MyTextInput");
var axios_1 = require("axios");
function LoginForm(_a) {
    var _this = this;
    var ParentCallBack = _a.ParentCallBack;
    var login = function (creds) { return __awaiter(_this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("https://nekocosmosapi.azurewebsites.net/api/Account/login", creds)];
                case 1:
                    user = _a.sent();
                    console.log(user);
                    ParentCallBack(user.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(core_2.Card, null,
        React.createElement(core_2.CardHeader, { title: "Log in!" }),
        React.createElement(core_1.CardContent, null,
            React.createElement(formik_1.Formik, { initialValues: {
                    username: '', email: '', password: ''
                }, onSubmit: function (values) { return login(values); } }, function (_a) {
                var handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting;
                return (React.createElement(formik_1.Form, { className: 'ui form', onSubmit: handleSubmit, autoComplete: 'off', translate: true },
                    React.createElement(MyTextInput_1.default, { name: 'email', placeholder: 'Email' }),
                    React.createElement(MyTextInput_1.default, { name: 'password', placeholder: 'Password', type: 'password' }),
                    React.createElement(semantic_ui_react_1.Button, { loading: isSubmitting, positive: true, content: 'Login', type: 'submit', fluid: true })));
            }))));
}
exports.default = LoginForm;
//# sourceMappingURL=LoginForm.js.map