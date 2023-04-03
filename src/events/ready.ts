import { Event } from "../structure/events";

export default new Event("ready", () => {
    console.log("Bot is online");
});