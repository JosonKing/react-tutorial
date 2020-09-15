const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      slowMo: 100,    //放慢速度
      headless: false,
      defaultViewport: {width: 1920, height: 1080},
      ignoreHTTPSErrors: false, //忽略 https 报错
      // args: ['--start-fullscreen'] //全屏打开页面
  });
  const page = await browser.newPage();
  await page.goto('http://172.16.231.191:19500/html5/common/login/index.html#/');
  //输入账号密码
  const uniqueIdElement = await page.$('[name=username]');
  await uniqueIdElement.type('ws', {delay: 20});
  const passwordElement = await page.$('[name=password]', {delay: 20});
  await passwordElement.type('jg123456');
  //点击确定按钮进行登录
  let okButtonElement = await page.$('[type=submit]');
  //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
  await Promise.all([
      okButtonElement.click(),
      page.waitForNavigation()
  ]);
  console.log('admin 登录成功');
  let checkButtonElement = await page.$('.ant-btn-round');
  //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
  await Promise.all([
    checkButtonElement.click(),
      page.waitForNavigation()
  ]);
  console.log('查看巡检台账跳转成功');
  await delay(4000);
  await page.close();
  await browser.close();
})();

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}