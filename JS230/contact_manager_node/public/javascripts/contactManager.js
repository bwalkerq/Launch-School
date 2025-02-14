document.addEventListener("DOMContentLoaded", ev =>{

  let contactTemplate = Handlebars.compile(document.querySelector('#contacts').innerHTML);
  const contactsDisplay = document.querySelector('#contacts-display')
  const contactInfoForm = document.querySelector('#contact-information');
  fetchAndRenderContacts();


  async function getContacts() {
    const response = await fetch('/api/contacts', {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  }

  function renderContacts(list) {
    contactsDisplay.innerHTML = contactTemplate({contacts: list});
  }

  async function initialize() {
    let contactList = await getContacts();
    contactList.forEach(contact => {
      contact.tags = contact.tags ? contact.tags.split(',') : [];
    })
    console.log(contactList); // Check the output here
    renderContacts(contactList);
  }
  initialize();

  // test contact
  let testContact = {
    full_name: 'Dossie Easton',
    email: 'dossie@cnm.com',
    phone_number: 'asdf',
    tags: 'ethical, non-mono'
  }
  async function addContact(contactObject) {
    const response = await fetch('/api/contacts' , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    });

    if (response.status === 200) {
      alert("Contact added successfully");
    } else {
      const text = await response.text();
      throw new Error(`Error adding contact" ${text}`);
    }
  }
  // addContact(testContact);

  let testUpdateContact = {
    full_name: 'Dossie Easton',
    email: undefined,
    phone_number: '12345555555',
    tags: 'ethical, non-mono',
    id: 5,
  }

  // updateContact(testUpdateContact);

  async function updateContact(contactObject) {
    const id = contactObject.id
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactObject)
    });

    if (response.status === 201) {
      alert("Contact updated successfully");
    } else {
      const text = await response.text();
      throw new Error(`Error updating contact" ${text}`);
    }
  }

  async function deleteContact(id) {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      alert("Contact deleted successfully");
    } else if (response.status === 400) {
      alert('Contact not found');
    } else {
      const text = await response.text();
      throw new Error(`Error deleting contact" ${text}`);
    }
  }

  // deleteContact(4)
})
