import { ArgsOf, GuardFunction } from "discordx";
import { bot } from "./main.js";

export const enumStringsToChoice = (e: Map<number, string>) =>
  Array.from(e.entries())
    .sort((a, b) => a[0] - b[0])
    .map((e) => e[1]);

export const getPrimaryGuild = () =>
  bot.guilds.fetch(process.env.PRIMARY_GUILD_ID!);

export const getAnnoucementsChannel = () =>
  bot.channels.fetch(process.env.ANNOUNCEMENTS_CHANNEL_ID!);

export const getUpdatesChannel = () =>
  bot.channels.fetch(process.env.UPDATES_CHANNEL_ID!);

export const getGeneralChannel = () =>
  bot.channels.fetch(process.env.GENERAL_CHANNEL_ID!);

export const MentionsBot: GuardFunction<ArgsOf<"messageCreate">> = async (
  [message],
  client,
  next
) => {
  const me = client.user?.id;
  if (!me || !message.mentions.has(me)) {
    return;
  }

  await next();
};

export const getRedisConnection = () => ({
  host: process.env.REDIS_HOST!,
  port: Number.parseInt(process.env.REDIS_PORT!),
  db: process.env.REDIS_DB ? Number.parseInt(process.env.REDIS_DB!) : 0,
  password: process.env.REDIS_PASSWORD,
});
