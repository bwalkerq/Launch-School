export class UserInterface {

  constructor(app) {
    this.app = app;
    this.contactsDisplay = document.querySelector('#contacts-display');
    this.contactTemplate = this.setupHandlebars();
    this.contactInfoForm = document.querySelector('#contact-information');
    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelector('#contact-information')
      .addEventListener('submit', evt => this.onNewContactSubmit(evt))
    this.contactsDisplay.addEventListener('click', evt => this.handleClickAction(evt))
  }

  setupHandlebars() {
    return Handlebars.compile(document.querySelector('#contacts').innerHTML);
  }

  onNewContactSubmit(ev) {
    ev.preventDefault();
    const contactFormData = new FormData(this.contactInfoForm);
    const contactObject = this.createContactObject(contactFormData);
    this.app.addContact(contactObject);
  }

  resetAddContactForm() {
    this.contactInfoForm.reset();
  }

  createContactObject(contactFormData) {
    return {
      full_name: contactFormData.get('full-name'),
      email: contactFormData.get('email'),
      phone_number: contactFormData.get('phone'),
      tags: contactFormData.getAll('tags').join(','),
    };
  }

   renderContacts(list) {
    this.contactsDisplay.innerHTML = this.contactTemplate({contacts: list});
  }

  handleClickAction(event) {
    if (event.target.matches('.delete-link')) {
      this.app.deleteContact(event.target.parentElement.dataset.id);
    } else if (event.target.matches('.edit-link')) {  //add the class to the edit buttons

    }
  }

}



const addContactAnchor = document.querySelector('#add-contact')
addContactAnchor.addEventListener('click', evt => {
  document.querySelector('#new-contact').style.display = 'block';
  document.querySelector('#contacts-display').style.display = 'none';
})
