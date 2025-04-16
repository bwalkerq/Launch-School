export class UserInterface {

  constructor(app) {
    this.app = app;
    this.contactsDisplay = document.querySelector('#contacts-display');
    this.contactTemplate = this.setupHandlebars();
    this.contactInfoForm = document.querySelector('#contact-information');
    this.contactInfoTitle = document.querySelector('#contact-information-title');
    this.newContact = document.querySelector('#new-contact');
    this.searchHeader = document.querySelector('#search-header');
    this.newTagDiv = document.querySelector('#new-tag-div')
    this.currentAction = null;
    this.editingContactId = null;
    this.addEventListeners();
  }

  addEventListeners() {
    this.contactInfoForm.addEventListener('submit', evt => this.onContactSubmit(evt));
    document.addEventListener('click', evt => this.handleClickAction(evt));
    // this.contactsDisplay.addEventListener('click', evt => this.handleClickAction(evt));
    document.querySelector('#add-contact').addEventListener('click', evt => this.onAddClick(evt));
    document.querySelector('#add-tag').addEventListener('click', evt => this.onAddTagClick(evt));
    this.newTagDiv.addEventListener('submit', evt => this.onTagSubmit(evt));
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
    await this.fillTagsOptions();
    this.openContactInfoForm()
  }

  onAddTagClick(evt) {
    this.openNewTagForm()
  }

  handleClickAction(event) {
    if (event.target.matches('.delete-link')) {
      this.editingContactId = event.target.parentElement.dataset.id;
      this.app.deleteContact(this.editingContactId);
      /* This is a good example use of dataset */
    } else if (event.target.matches('.edit-link')) {
      this.editingContactId = event.target.parentElement.dataset.id;
      this.onEditLinkClick(this.editingContactId).then();
    } else if (event.target.matches('.cancel-button')) {
      this.closeContactInfoForm();
    } else if (event.target.matches('#cancel-new-tag')){
      this.closeNewTagForm();
    } else {
      console.log('else happened in handleClickAction')
    }
  }

  openContactInfoForm() {
    this.searchHeader.style.display = 'none';
    this.contactsDisplay.style.display = 'none';
    this.newContact.style.display = 'block';
  }

  closeContactInfoForm() {
    this.searchHeader.style.display = 'block';
    this.contactsDisplay.style.display = 'block';
    this.newContact.style.display = 'none';
  }

  openNewTagForm() {
    this.searchHeader.style.display = 'none';
    this.contactsDisplay.style.display = 'none';
    this.newTagDiv.style.display = 'block';
  }

  closeNewTagForm() {
    this.searchHeader.style.display = 'block';
    this.contactsDisplay.style.display = 'block';
    this.newTagDiv.style.display = 'none';

  }

  async onEditLinkClick(id) {
    this.currentAction = 'edit';
    this.contactInfoTitle.textContent = "Edit contact:";
    await this.fillTagsOptions();
    let contactObject = await this.app.fetchContact(id);
    this.contactInfoForm.querySelector('#full-name').value = contactObject.full_name;
    this.contactInfoForm.querySelector('#email').value = contactObject.email;
    this.contactInfoForm.querySelector('#phone').value = contactObject.phone_number;
    this.contactInfoForm.querySelector('#tags')

    this.openContactInfoForm();
  }

  onContactSubmit(ev) {
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
    this.contactInfoForm.querySelector('#tags').innerHTML = '';
  }

  createContactObject(contactFormData) {
    return {
      full_name: contactFormData.get('full-name'),
      email: contactFormData.get('email'),
      phone_number: contactFormData.get('phone'),
      tags: contactFormData.getAll('tags').join(','),
    };
  }

  onTagSubmit(ev) {
    ev.preventDefault();
    const newTag = document.querySelector('#new-tag-input').value;
    this.app.addTag(newTag);
    console.log(this.app.tags)
    this.closeNewTagForm();
  }

  async fillTagsOptions() {
    const tagSelect = this.contactInfoForm.querySelector('#tags');
    let tags = this.app.tags
    tags.forEach(tag => {
      const newOption = new Option(tag, tag);
      tagSelect.add(newOption);
    })
  }

}



