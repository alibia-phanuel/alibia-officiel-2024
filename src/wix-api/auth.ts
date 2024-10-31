import { env } from "@/env";
import { WixClient } from "@/lib/wix-client.base";
import { OauthData } from "@wix/sdk";

export async function generateOAuthData(
  wixClient: WixClient,
  orinPath?: string
) {
  return wixClient.auth.generateOAuthData(
    env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/wix",
    env.NEXT_PUBLIC_BASE_URL + "/" + (orinPath || "")
  );
}

export async function getLoginUrl(wixClient: WixClient, oAuthData: OauthData) {
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
  });

  return authUrl;
}

export async function getLogoutUrl(wixClent: WixClient) {
  const { logoutUrl } = await wixClent.auth.logout(env.NEXT_PUBLIC_BASE_URL);

  return logoutUrl;
}
