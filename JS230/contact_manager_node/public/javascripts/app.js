import { APIRequestManager } from "./APIRequestManager.js";
import { UserInterface } from "./userInterface.js";

class Application {

  constructor() {
    this.api = new APIRequestManager();
    this.interface = new UserInterface(this);
    this.tags = new Set();
    this.fetchAndRenderContacts();
  }

  fetchAndRenderContacts() {
    this.api.fetchContacts().then((response) => {
      this.interface.renderContacts(response)
    });
    console.log('success')
  }

  async addContact(contactObject) {
    let response = await this.api.addContact(contactObject);
    // this.interface.resetAddContactForm()
    this.fetchAndRenderContacts();
  }

  async deleteContact(id) {
    let response = await this.api.deleteContact(id);
    this.fetchAndRenderContacts();
  }

  async fetchContact(id) {
    let contactObject = await this.api.fetchSingleContact(id)
    return contactObject;
  }

  async updateContact(id, contactObject) {
    contactObject.id = id;
    await this.api.updateContact(contactObject);
  }
}

document.addEventListener('DOMContentLoaded', e => {
  const app = new Application();
})
