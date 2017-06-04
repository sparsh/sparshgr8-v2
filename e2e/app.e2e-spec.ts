import { Sparshgr8V2Page } from './app.po';

describe('sparshgr8-v2 App', () => {
  let page: Sparshgr8V2Page;

  beforeEach(() => {
    page = new Sparshgr8V2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
