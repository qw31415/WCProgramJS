/**
 * @Author ius.
 * @Date 2025/9/5
 * @File fuckSign.js
 * @Contact qaq.al
 */

const axios = require("axios");
const CryptoJS = require("crypto-js");

// ======= 需要你填写/确认的参数 =======
const ACTIVITY_ID = 1704;
const RANDOM_CODE = "b53c645bf708462aaa12431c6f472151";
const WATCHWORD   = "桃桃安格斯牛";

const USER_TOKEN  = "";
const GRAY_SHOP_ID = "7901";

const AES_KEY = "aZ3uXd2hXupRxvHZ";
const IV_SEED = "1513D520B9C1459C";

// ======= 加密与请求 =======
const key = CryptoJS.enc.Utf8.parse(AES_KEY);
const iv  = CryptoJS.enc.Utf8.parse(IV_SEED);

function urlSafeEncode(b64) {
  return b64.replace(/\+/g, "%2B").replace(///g, "%2F");
}

function buildParams() {
  const payload = {
    activityId: ACTIVITY_ID,
    randomCode: RANDOM_CODE,
    watchword: WATCHWORD,
    timestamp: Date.now()
  };

  const cipherB64 = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  ).toString();

  return { ...payload, sign: urlSafeEncode(cipherB64) };
}

async function main() {
  const params = buildParams();

  const config = {
    method: "POST",
    url: "https://sss-web.tastientech.com/api/selfCoupon/watchword/exchange",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541015) XWEB/16389",
      "Content-Type": "application/json",
      "gray-shop-id": GRAY_SHOP_ID,
      "xweb_xhr": "1",
      "channel": "1",
      "version": "3.36.1",
      "user-token": USER_TOKEN,
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Referer": "https://servicewechat.com/wx557473f23153a429/457/page-frame.html",
      "Accept-Language": "zh-CN,zh;q=0.9"
    },
    data: JSON.stringify(params),
    timeout: 15000
  };

  console.log(">>> 请求参数：", params);

  try {
    const res = await axios.request(config);
    console.log("
>>> Status:", res.status);
    console.log(">>> Response Data:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("
*** Error status:", err.response.status);
      console.error("*** Error data:", err.response.data);
    } else {
      console.error("
*** Error:", err.message);
    }
  }
}

for (let i=0;i<20;i++){
    main();
}
