const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { addConsoleHandler } = require('selenium-webdriver/lib/logging');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const CLINT_URL = "http://localhost:3000";
const TIMEOUT = 3000

class MicroblogPageObject {
  static async init() {
    const driver = new Builder().forBrowser("chrome").build();
    driver.get(CLINT_URL);
    await new Promise(resolve => setTimeout(resolve, 3000))
    return new MicroblogPageObject(driver);
  }

  constructor(driver) {
    this.driver = driver;
  }

  async down() {
    await this.driver.quit();
  }

  async addMessage(msgText) {
    const msgInput = await this.driver.findElement(By.id("msg-input"));
    const addMsgBtn = await this.driver.findElement(By.id("add-msg-button"));
    await msgInput.sendKeys(msgText);
    await addMsgBtn.click();
    await this.driver.wait(async () => {
      const containsMessage = await this.containsMessage(msgText)
      return containsMessage
    }, TIMEOUT)
    return this;
  }

  async getMessageElByText(msgText) {
    const msg = await this.driver.findElement(
      By.xpath(
        `//div[contains(@class, 'message-item') and div/div/div[text()='${msgText}']]`
      )
    );
    return msg
  }

  async getReplyForMessage(msgText, replyText) {
    const msgEl = await this.getMessageElByText(msgText)
    const reply = await msgEl.findElement(
      By.xpath(
        `//div[contains(@class, 'reply-item') and div/div[text()='${replyText}']]`
      )
    );
    return reply
  }

  async addReplyToMessage(msgText, replyText) {
    const msgEl = await this.getMessageElByText(msgText);
    const replyButton = await msgEl.findElement(By.id('reply-button'))
    await replyButton.click()
    const replyInput = await msgEl.findElement(By.id("reply-input"));
    const addReplyButton = await msgEl.findElement(By.id("add-reply-button"));
    await replyInput.sendKeys(replyText);
    await addReplyButton.click();
    await this.driver.wait(async () => {
      const containsReply = await this.containsReply(msgText, replyText)
      return containsReply
    }, TIMEOUT)
    return this;
  }

  async likeMessage(msgText) {
    const msgEl = await this.getMessageElByText(msgText);
    const likesEl = await msgEl.findElement(By.id("likes-count"));
    const startLikesCount = Number(await likesEl.getText())
    const likeBtn = await msg.findElement(By.id("like-btn"));
    await likeBtn.click();
    await this.driver.wait(async () => {
      const currentLikeCount = Number(await likesEl.getText())
      return currentLikeCount === startLikesCount + 1
    }, TIMEOUT)
    return this;
  }

  async dislikeMessage(msgText) {
    const msgEl = await this.getMessageElByText(msgText);
    const dislikesEl = await msgEl.findElement(By.id("dislikes-count"));
    const startDislikesCount = Number(await dislikesEl.getText())
    const dislikeBtn = await msgEl.findElement(By.id("dislike-btn"));
    await dislikeBtn.click();
    await this.driver.wait(async () => {
      const currentDislikeCount = Number(await dislikesEl.getText())
      return currentDislikeCount === startDislikesCount + 1
    }, TIMEOUT)
    return this;
  }

  async likeReply(msgText, replyText) {
    const replyEl = await this.getReplyForMessage(msgText, replyText);
    const likesEl = await replyEl.findElement(By.id("likes-count"));
    const startLikesCount = Number(await likesEl.getText())
    const likeBtn = await replyEl.findElement(By.id("like-button"));
    await likeBtn.click();
    await this.driver.wait(async () => {
      const currentLikeCount = Number(await likesEl.getText())
      return currentLikeCount === startLikesCount + 1
    }, TIMEOUT)
    return this;
  }

  async dislikeReply(msgText, replyText) {
    const replyEl = await this.getReplyForMessage(msgText, replyText);
    const dislikesEl = await replyEl.findElement(By.id("dislikes-count"));
    const startLikesCount = Number(await dislikesEl.getText())
    const dislikeBtn = await replyEl.findElement(By.id("dislike-button"));
    await dislikeBtn.click();
    await this.driver.wait(async () => {
      const currentDislikeCount = Number(await dislikesEl.getText())
      return currentDislikeCount === startLikesCount + 1
    }, TIMEOUT)
    return this;
  }

  async containsMessage(msgText) {
    try {
      const msgEl = await this.getMessageElByText(msgText)
      return Boolean(msgEl);
    } catch {
      return false
    }
  }

  async containsReply(msgText, replyText) {
    try {
      const replyEl = await this.getReplyForMessage(msgText, replyText)
      return Boolean(replyEl);
    } catch {
      return false
    }
  }
}

module.exports = {
  MicroblogPageObject
}
