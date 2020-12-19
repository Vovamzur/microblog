const { By } = require("selenium-webdriver");
const { MicroblogPageObject } = require("./selenium-helpers");

let microblogPage;

beforeEach(async () => {
  microblogPage = await MicroblogPageObject.init();
});

afterEach(async () => {
  if (microblogPage) {
    await microblogPage.down()
  }
});

it("should add message", async () => {
  const msgTxt = "test msg" + Math.random();

  await microblogPage.addMessage(msgTxt);

  const containsMsg = await microblogPage.containsMessage(msgTxt)
  expect(containsMsg).toBe(true);
});

it("should like message", async () => {
  const msgTxt = "test likes msg" + Math.random();
  await microblogPage.addMessage(msgTxt);
  const msg = await microblogPage.getMessageElByText(msgTxt);

  await microblogPage.likeMessage(msgTxt);

  const likesEl = await msg.findElement(By.id("likes-count"));
  const likesCount = await likesEl.getText();
  expect(Number(likesCount)).toBe(1);
});

it('should dislike message', async () => {
  const msgTxt = "test dislikes msg" + Math.random();
  await microblogPage.addMessage(msgTxt);
  const msg = await microblogPage.getMessageElByText(msgTxt);

  await microblogPage.dislikeMessage(msgTxt);

  const dislikesEl = await msg.findElement(By.id("dislikes-count"));
  const dislikesCount = await dislikesEl.getText();
  expect(Number(dislikesCount)).toBe(1);
})

it('should add reply', async () => {
  const msgText = "msg for testing adding of some reply" + Math.random();
  const replyText = 'reply text' + Math.random();
  await microblogPage.addMessage(msgText);

  await microblogPage.addReplyToMessage(msgText, replyText);

  const containsReply = await microblogPage.containsReply(msgText, replyText)
  expect(containsReply).toBe(true);
})

it('should like reply', async () => {
  const msgText = "text of msg for test like for reply" + Math.random();
  const replyText = "reply likes text" + Math.random();
  await microblogPage.addMessage(msgText);
  await microblogPage.addReplyToMessage(msgText, replyText);
  const replyEl = await microblogPage.getReplyForMessage(msgText, replyText);

  await microblogPage.likeReply(msgText, replyText);

  const likesEl = await replyEl.findElement(By.id("likes-count"));
  const likesCount = await likesEl.getText();
  expect(Number(likesCount)).toBe(1);
})

it('should dislike reply', async () => {
  const msgText = "text of msg for test dislike for reply" + Math.random();
  const replyText = "reply dislikes text" + Math.random();
  await microblogPage.addMessage(msgText);
  await microblogPage.addReplyToMessage(msgText, replyText);
  const replyEl = await microblogPage.getReplyForMessage(msgText, replyText);

  await microblogPage.dislikeReply(msgText, replyText);

  const dislikesEl = await replyEl.findElement(By.id("dislikes-count"));
  const dislikesCount = await dislikesEl.getText();
  expect(Number(dislikesCount)).toBe(1);
})
