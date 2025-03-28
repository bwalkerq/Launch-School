export class UserInterface {

  constructor(app) {
    this.app = app;
    this.contactsDisplay = document.querySelector('#contacts-display');
    this.contactTemplate = this.setupHandlebars();
    this.contactInfoForm = document.querySelector('#contact-information');
    this.contactInfoTitle = document.querySelector('#contact-information-title');
    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelector('#contact-information')
      .addEventListener('submit', evt => this.onNewContactSubmit(evt));
    this.contactsDisplay.addEventListener('click', evt => this.handleClickAction(evt));
    document.querySelector('#add-contact').addEventListener('click', evt => this.onEditClick(evt));
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
      /* This is a good example use of dataset */
    } else if (event.target.matches('.edit-link')) {
      this.onEditClick(event)
    } else if (event.target.matches('.edit-link')) {
    }
  }

  showContactInfoForm() {
    document.querySelector('#contacts-display').style.display = 'none';
    document.querySelector('#new-contact').style.display = 'block';
  }

  hideContactInfoForm() {
    document.querySelector('#new-contact').style.display = 'none';
    document.querySelector('#contacts-display').style.display = 'block';

  }

  onEditClick(event) {
    /* the add-contact takes on a new title
    * the current information is populated */
    this.contactInfoTitle.textContent = "Edit contact:";
    this.showContactInfoForm();
  }

  onCancelClick(event) {

  }
}



