"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const stage = new telegraf_1.Scenes.Stage();
const allScenes = (bot) => {
    bot.use(stage.middleware());
};
exports.default = allScenes;
