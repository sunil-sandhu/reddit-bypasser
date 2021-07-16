const interface = require("./scrawly/api/interface");
const initiateRequest = require("./2captcha/initiateRequest");
const getRequestResults = require("./2captcha/getgetRequestResults");

const credentials = require("./credentials"); // username and password we're going to use when registering on Reddit
const apiKey = require("./2captcha/apiKey");

(async () => {
  await interface.init();
  await interface.visitPage("https://old.reddit.com/login");
  await interface.querySelectorInputAndType("#user_reg", credentials.username);
  await interface.querySelectorInputAndType("#passwd_reg", credentials.password);
  await interface.querySelectorInputAndType("#passwd2_reg", credentials.password);
  const requestId = await initiateRequest(apiKey);
  const response = await getRequestResults(apiKey, requestId);
  await interface.evaluatePage(
    `document.getElementById("g-recaptcha-response").innerHTML="${response}";`
  );

  await interface.querySelectorButtonAndClick("#register-form button[type=submit]");
})();
