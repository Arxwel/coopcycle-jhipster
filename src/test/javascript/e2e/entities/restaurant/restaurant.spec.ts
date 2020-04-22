import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RestaurantComponentsPage,
  /* RestaurantDeleteDialog, */
  RestaurantUpdatePage
} from './restaurant.page-object';

const expect = chai.expect;

describe('Restaurant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let restaurantComponentsPage: RestaurantComponentsPage;
  let restaurantUpdatePage: RestaurantUpdatePage;
  /* let restaurantDeleteDialog: RestaurantDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Restaurants', async () => {
    await navBarPage.goToEntity('restaurant');
    restaurantComponentsPage = new RestaurantComponentsPage();
    await browser.wait(ec.visibilityOf(restaurantComponentsPage.title), 5000);
    expect(await restaurantComponentsPage.getTitle()).to.eq('coopcycleApp.restaurant.home.title');
    await browser.wait(ec.or(ec.visibilityOf(restaurantComponentsPage.entities), ec.visibilityOf(restaurantComponentsPage.noResult)), 1000);
  });

  it('should load create Restaurant page', async () => {
    await restaurantComponentsPage.clickOnCreateButton();
    restaurantUpdatePage = new RestaurantUpdatePage();
    expect(await restaurantUpdatePage.getPageTitle()).to.eq('coopcycleApp.restaurant.home.createOrEditLabel');
    await restaurantUpdatePage.cancel();
  });

  /* it('should create and save Restaurants', async () => {
        const nbButtonsBeforeCreate = await restaurantComponentsPage.countDeleteButtons();

        await restaurantComponentsPage.clickOnCreateButton();

        await promise.all([
            restaurantUpdatePage.setNameInput('name'),
            restaurantUpdatePage.setAddressInput('address'),
            restaurantUpdatePage.setTelInput('+33386130168'),
            restaurantUpdatePage.setDescriptionInput('description'),
            restaurantUpdatePage.restaurantsSelectLastOption(),
        ]);

        expect(await restaurantUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await restaurantUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
        expect(await restaurantUpdatePage.getTelInput()).to.eq('+33386130168', 'Expected Tel value to be equals to +33386130168');
        expect(await restaurantUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

        await restaurantUpdatePage.save();
        expect(await restaurantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await restaurantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Restaurant', async () => {
        const nbButtonsBeforeDelete = await restaurantComponentsPage.countDeleteButtons();
        await restaurantComponentsPage.clickOnLastDeleteButton();

        restaurantDeleteDialog = new RestaurantDeleteDialog();
        expect(await restaurantDeleteDialog.getDialogTitle())
            .to.eq('coopcycleApp.restaurant.delete.question');
        await restaurantDeleteDialog.clickOnConfirmButton();

        expect(await restaurantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
