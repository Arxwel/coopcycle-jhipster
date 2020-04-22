import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserAccountComponentsPage, UserAccountDeleteDialog, UserAccountUpdatePage } from './user-account.page-object';

const expect = chai.expect;

describe('UserAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userAccountComponentsPage: UserAccountComponentsPage;
  let userAccountUpdatePage: UserAccountUpdatePage;
  let userAccountDeleteDialog: UserAccountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserAccounts', async () => {
    await navBarPage.goToEntity('user-account');
    userAccountComponentsPage = new UserAccountComponentsPage();
    await browser.wait(ec.visibilityOf(userAccountComponentsPage.title), 5000);
    expect(await userAccountComponentsPage.getTitle()).to.eq('coopcycleApp.userAccount.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userAccountComponentsPage.entities), ec.visibilityOf(userAccountComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserAccount page', async () => {
    await userAccountComponentsPage.clickOnCreateButton();
    userAccountUpdatePage = new UserAccountUpdatePage();
    expect(await userAccountUpdatePage.getPageTitle()).to.eq('coopcycleApp.userAccount.home.createOrEditLabel');
    await userAccountUpdatePage.cancel();
  });

  it('should create and save UserAccounts', async () => {
    const nbButtonsBeforeCreate = await userAccountComponentsPage.countDeleteButtons();

    await userAccountComponentsPage.clickOnCreateButton();

    await promise.all([
      userAccountUpdatePage.setNameInput('name'),
      userAccountUpdatePage.setSurnameInput('surname'),
      userAccountUpdatePage.setEmailInput('zv%wC@=b&lt;DA/.;~?Q/'),
      userAccountUpdatePage.setPasswordInput('password'),
      userAccountUpdatePage.setAddressInput('address'),
      userAccountUpdatePage.setPhoneInput('0173108519')
    ]);

    expect(await userAccountUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await userAccountUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await userAccountUpdatePage.getEmailInput()).to.eq(
      'zv%wC@=b&lt;DA/.;~?Q/',
      'Expected Email value to be equals to zv%wC@=b&lt;DA/.;~?Q/'
    );
    expect(await userAccountUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');
    expect(await userAccountUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await userAccountUpdatePage.getPhoneInput()).to.eq('0173108519', 'Expected Phone value to be equals to 0173108519');

    await userAccountUpdatePage.save();
    expect(await userAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserAccount', async () => {
    const nbButtonsBeforeDelete = await userAccountComponentsPage.countDeleteButtons();
    await userAccountComponentsPage.clickOnLastDeleteButton();

    userAccountDeleteDialog = new UserAccountDeleteDialog();
    expect(await userAccountDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.userAccount.delete.question');
    await userAccountDeleteDialog.clickOnConfirmButton();

    expect(await userAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
