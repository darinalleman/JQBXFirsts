import { AngularTwoSpotifyPage } from './app.po';

describe('angular-two-spotify App', () => {
  let page: AngularTwoSpotifyPage;

  beforeEach(() => {
    page = new AngularTwoSpotifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
