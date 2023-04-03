"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../structure/events");
exports.default = new events_1.Event("ready", () => {
    console.log("Bot is online");
});
