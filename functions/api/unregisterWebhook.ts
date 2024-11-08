interface IEnv {
  BOT_TOKEN: string; // Get it from @BotFather https://core.telegram.org/bots#6-botfather
  BOT_SECRET: string; // A-Z, a-z, 0-9, _ and -
}

/**
 * Remove webhook
 * https://core.telegram.org/bots/api#setwebhook
 */
export const onRequest: PagesFunction<IEnv> = async (ctx) => {
  const r: { ok: boolean } = await (
    await fetch(apiUrl(ctx.env.BOT_TOKEN, "setWebhook", { url: "" }))
  ).json();
  return new Response("ok" in r && r.ok ? "Ok" : JSON.stringify(r, null, 2));
};

/**
 * Return url to telegram api, optionally with parameters added
 */
function apiUrl(
  botToken: string,
  methodName: string,
  params: Record<string, string>,
) {
  let query = "";
  if (params) {
    query = "?" + new URLSearchParams(params).toString();
  }
  return `https://api.telegram.org/bot${botToken}/${methodName}${query}`;
}
