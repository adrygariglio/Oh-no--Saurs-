import { OhNoSaursPage } from './app.po';

describe('oh-no-saurs App', () => {
  let page: OhNoSaursPage;

  beforeEach(() => {
    page = new OhNoSaursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
