import { element, by, ElementFinder } from 'protractor';

export class UserAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-account div table .btn-danger'));
  title = element.all(by.css('jhi-user-account div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class UserAccountUpdatePage {
  pageTitle = element(by.id('jhi-user-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  emailInput = element(by.id('field_email'));
  passwordInput = element(by.id('field_password'));
  addressInput = element(by.id('field_address'));
  phoneInput = element(by.id('field_phone'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPasswordInput(password: string): Promise<void> {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput(): Promise<string> {
    return await this.passwordInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UserAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
