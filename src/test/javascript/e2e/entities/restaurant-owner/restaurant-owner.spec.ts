import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RestaurantOwnerComponentsPage, RestaurantOwnerDeleteDialog, RestaurantOwnerUpdatePage } from './restaurant-owner.page-object';

const expect = chai.expect;

describe('RestaurantOwner e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let restaurantOwnerComponentsPage: RestaurantOwnerComponentsPage;
  let restaurantOwnerUpdatePage: RestaurantOwnerUpdatePage;
  let restaurantOwnerDeleteDialog: RestaurantOwnerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RestaurantOwners', async () => {
    await navBarPage.goToEntity('restaurant-owner');
    restaurantOwnerComponentsPage = new RestaurantOwnerComponentsPage();
    await browser.wait(ec.visibilityOf(restaurantOwnerComponentsPage.title), 5000);
    expect(await restaurantOwnerComponentsPage.getTitle()).to.eq('coopcycleApp.restaurantOwner.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(restaurantOwnerComponentsPage.entities), ec.visibilityOf(restaurantOwnerComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RestaurantOwner page', async () => {
    await restaurantOwnerComponentsPage.clickOnCreateButton();
    restaurantOwnerUpdatePage = new RestaurantOwnerUpdatePage();
    expect(await restaurantOwnerUpdatePage.getPageTitle()).to.eq('coopcycleApp.restaurantOwner.home.createOrEditLabel');
    await restaurantOwnerUpdatePage.cancel();
  });

  it('should create and save RestaurantOwners', async () => {
    const nbButtonsBeforeCreate = await restaurantOwnerComponentsPage.countDeleteButtons();

    await restaurantOwnerComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await restaurantOwnerUpdatePage.save();
    expect(await restaurantOwnerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await restaurantOwnerComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RestaurantOwner', async () => {
    const nbButtonsBeforeDelete = await restaurantOwnerComponentsPage.countDeleteButtons();
    await restaurantOwnerComponentsPage.clickOnLastDeleteButton();

    restaurantOwnerDeleteDialog = new RestaurantOwnerDeleteDialog();
    expect(await restaurantOwnerDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.restaurantOwner.delete.question');
    await restaurantOwnerDeleteDialog.clickOnConfirmButton();

    expect(await restaurantOwnerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
