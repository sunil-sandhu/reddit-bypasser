const request = require("request-promise-native");

async function initiateRequest(captchaApiKey) {
  const formData = {
    method: "userrecaptcha",
    googlekey: "6LeTnxkTAAAAAN9QEuDZRpn90WwKk_R1TRW_g-JC",
    key: captchaApiKey,
    pageUrl: "https://old.reddit.com/login",
    json: 1,
  };
  try {
    const response = await request.post("http://2captcha.com/in.php", { form: formData });
    return JSON.parse(response).request;
  } catch (error) {
    console.log(error);
  }
}

module.exports = initiateRequest;
