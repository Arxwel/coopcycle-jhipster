import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BasketComponentsPage, BasketDeleteDialog, BasketUpdatePage } from './basket.page-object';

const expect = chai.expect;

describe('Basket e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let basketComponentsPage: BasketComponentsPage;
  let basketUpdatePage: BasketUpdatePage;
  let basketDeleteDialog: BasketDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Baskets', async () => {
    await navBarPage.goToEntity('basket');
    basketComponentsPage = new BasketComponentsPage();
    await browser.wait(ec.visibilityOf(basketComponentsPage.title), 5000);
    expect(await basketComponentsPage.getTitle()).to.eq('coopcycleApp.basket.home.title');
    await browser.wait(ec.or(ec.visibilityOf(basketComponentsPage.entities), ec.visibilityOf(basketComponentsPage.noResult)), 1000);
  });

  it('should load create Basket page', async () => {
    await basketComponentsPage.clickOnCreateButton();
    basketUpdatePage = new BasketUpdatePage();
    expect(await basketUpdatePage.getPageTitle()).to.eq('coopcycleApp.basket.home.createOrEditLabel');
    await basketUpdatePage.cancel();
  });

  it('should create and save Baskets', async () => {
    const nbButtonsBeforeCreate = await basketComponentsPage.countDeleteButtons();

    await basketComponentsPage.clickOnCreateButton();

    await promise.all([
      basketUpdatePage.basketStateSelectLastOption(),
      basketUpdatePage.setExpectedDeliveryTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      basketUpdatePage.setDeliveryAddressInput('deliveryAddress'),
      basketUpdatePage.paymentSelectLastOption(),
      basketUpdatePage.deliverybasketsSelectLastOption(),
      basketUpdatePage.customerbasketsSelectLastOption(),
      basketUpdatePage.restaubasketsSelectLastOption()
    ]);

    expect(await basketUpdatePage.getExpectedDeliveryTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected expectedDeliveryTime value to be equals to 2000-12-31'
    );
    expect(await basketUpdatePage.getDeliveryAddressInput()).to.eq(
      'deliveryAddress',
      'Expected DeliveryAddress value to be equals to deliveryAddress'
    );

    await basketUpdatePage.save();
    expect(await basketUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await basketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Basket', async () => {
    const nbButtonsBeforeDelete = await basketComponentsPage.countDeleteButtons();
    await basketComponentsPage.clickOnLastDeleteButton();

    basketDeleteDialog = new BasketDeleteDialog();
    expect(await basketDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.basket.delete.question');
    await basketDeleteDialog.clickOnConfirmButton();

    expect(await basketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
