import { element, by, ElementFinder } from 'protractor';

export class RoleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-role div table .btn-danger'));
  title = element.all(by.css('jhi-role div h2#page-heading span')).first();
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

export class RoleUpdatePage {
  pageTitle = element(by.id('jhi-role-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  userrolesSelect = element(by.id('field_userroles'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async userrolesSelectLastOption(): Promise<void> {
    await this.userrolesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userrolesSelectOption(option: string): Promise<void> {
    await this.userrolesSelect.sendKeys(option);
  }

  getUserrolesSelect(): ElementFinder {
    return this.userrolesSelect;
  }

  async getUserrolesSelectedOption(): Promise<string> {
    return await this.userrolesSelect.element(by.css('option:checked')).getText();
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

export class RoleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-role-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-role'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
