import { APIRequestManager } from "./APIRequestManager.js";
import { UserInterface } from "./userInterface.js";

class Application {

  constructor() {
    this.api = new APIRequestManager();
    this.interface = new UserInterface(this);
    this.tags = new Set();
    this.createTagsSet();
    this.fetchAndRenderContacts();
  }

  fetchAndRenderContacts() {
    this.api.fetchContacts().then((response) => {
      this.interface.renderContacts(response)
    });
  }

  async createTagsSet() {
    let contactsArray = await this.api.fetchContacts();
    let tagsArray = [];
    for (const contactsArrayElement of contactsArray) {
      for (const tag of contactsArrayElement.tags) {tagsArray.push(tag);}
    }
    tagsArray.sort();

    for (const tagsArrayElement of tagsArray) {
      this.tags.add(tagsArrayElement);
    }
  }

  async addContact(contactObject) {
    let response = await this.api.addContact(contactObject);
    this.interface.resetContactInfoForm() // does it make sense to call this here, or in the UI file?
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

  addTag(tag) {
    this.tags.add(tag);
  }
}

document.addEventListener('DOMContentLoaded', _ => {
  const app = new Application();
})
