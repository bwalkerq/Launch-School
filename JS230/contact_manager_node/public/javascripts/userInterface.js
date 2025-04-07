export class UserInterface {

  constructor(app) {
    this.app = app;
    this.contactsDisplay = document.querySelector('#contacts-display');
    this.contactTemplate = this.setupHandlebars();
    this.contactInfoForm = document.querySelector('#contact-information');
    this.contactInfoTitle = document.querySelector('#contact-information-title');
    this.currentAction = null;
    this.editingContactId = null;
    this.addEventListeners();
    this.fillTagsOptions();
  }

  addEventListeners() {
    this.contactInfoForm.addEventListener('submit', evt => this.onSubmit(evt));
    document.addEventListener('click', evt => this.handleClickAction(evt));
    document.querySelector('#add-contact').addEventListener('click', evt => this.onAddClick(evt));
  }

  setupHandlebars() {
    return Handlebars.compile(document.querySelector('#contacts').innerHTML);
  }

  renderContacts(list) {
    this.contactsDisplay.innerHTML = this.contactTemplate({contacts: list});
  }

  onAddClick(evt) {
    this.resetContactInfoForm();
    this.currentAction = 'add';
    this.contactInfoTitle.textContent = "Add contact:";
    this.openContactInfoForm()
  }

  handleClickAction(event) {
    if (event.target.matches('.delete-link')) {
      this.editingContactId = event.target.parentElement.dataset.id;
      this.app.deleteContact(this.editingContactId);
      /* This is a good example use of dataset */
    } else if (event.target.matches('.edit-link')) {
      this.editingContactId = event.target.parentElement.dataset.id;
      this.onEditLinkClick(this.editingContactId);
    } else if (event.target.matches('.cancel-button')) {
      this.closeContactInfoForm()
    }
  }

  openContactInfoForm() {
    document.querySelector('#contacts-display').style.display = 'none';
    document.querySelector('#search-header').style.display = 'none';
    document.querySelector('#new-contact').style.display = 'block';
  }

  closeContactInfoForm() {
    document.querySelector('#new-contact').style.display = 'none';
    document.querySelector('#search-header').style.display = 'block';
    document.querySelector('#contacts-display').style.display = 'block';
  }

  async onEditLinkClick(id) {
    this.currentAction = 'edit';
    this.contactInfoTitle.textContent = "Edit contact:";
    this.openContactInfoForm();
    let contactObject = await this.app.fetchContact(id);
    this.contactInfoForm.querySelector('#full-name').value = contactObject.full_name;
    this.contactInfoForm.querySelector('#email').value = contactObject.email;
    this.contactInfoForm.querySelector('#phone').value = contactObject.phone_number;
  }

  onSubmit(ev) {
    ev.preventDefault();
    const contactFormData = new FormData(this.contactInfoForm);
    const contactObject = this.createContactObject(contactFormData);

    if (this.currentAction === 'add') {
      this.app.addContact(contactObject);
    } else if (this.currentAction === 'edit') {
      this.app.updateContact(this.editingContactId, contactObject);
    }
  }

  resetContactInfoForm() {
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

  async fillTagsOptions() {
    const tagSet = await this.app.createTagsSet();
    tagSet.forEach(tag => {
      const newOption = new Option(tag, tag);
      this.contactInfoForm.querySelector('#tags').add(newOption);
    })
  }

}



