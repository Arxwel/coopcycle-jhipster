import { element, by, ElementFinder } from 'protractor';

export class NotificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-notification div table .btn-danger'));
  title = element.all(by.css('jhi-notification div h2#page-heading span')).first();
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

export class NotificationUpdatePage {
  pageTitle = element(by.id('jhi-notification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));

  notificationSelect = element(by.id('field_notification'));
  notificationsSelect = element(by.id('field_notifications'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async notificationSelectLastOption(): Promise<void> {
    await this.notificationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async notificationSelectOption(option: string): Promise<void> {
    await this.notificationSelect.sendKeys(option);
  }

  getNotificationSelect(): ElementFinder {
    return this.notificationSelect;
  }

  async getNotificationSelectedOption(): Promise<string> {
    return await this.notificationSelect.element(by.css('option:checked')).getText();
  }

  async notificationsSelectLastOption(): Promise<void> {
    await this.notificationsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async notificationsSelectOption(option: string): Promise<void> {
    await this.notificationsSelect.sendKeys(option);
  }

  getNotificationsSelect(): ElementFinder {
    return this.notificationsSelect;
  }

  async getNotificationsSelectedOption(): Promise<string> {
    return await this.notificationsSelect.element(by.css('option:checked')).getText();
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

export class NotificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-notification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-notification'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
