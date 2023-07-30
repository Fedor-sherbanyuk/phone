class PhoneBook {
    #contacts = [];
    #searchedUsers = [];

    constructor(users) {
        // Validate users

        // add users to contacts
        users.forEach(user => {
            this.addContact(user);
        });

        // Add event listeners to contact book
        this.#setEvents();
    }

    addContact(user) {
        this.#contacts.push(new User(user));
    }

    call(contactId) {
        const contact = this.#contacts.find(contact => contact.id === contactId);
        if (contact) {
            console.log(`Calling ${contact.name} - Phone: ${contact.phone}`);
        } else {
            console.log(`Contact with ID ${contactId} not found.`);
        }
    }

    removeContact(contactId) {
        this.#contacts = this.#contacts.filter(contact => contact.id !== contactId);
        console.log(`Contact with ID ${contactId} removed.`);

        // Update the contact list on the page after removing the contact
        this.updateContactList(this.#contacts);
    }

    search(searchTerm) {
        this.#searchedUsers = this.#contacts.filter(contact => {
            return (
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phone.includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        this.updateContactList(this.#searchedUsers);
        this.updatePopupList(this.#searchedUsers);
    }

    updateContactList(contacts) {
        const contactsList = document.querySelector('.contacts__list ul');
        contactsList.innerHTML = '';

        contacts.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;
            listItem.className = 'list-group-item';

            const callButton = document.createElement('button');
            callButton.setAttribute('type', 'button');
            callButton.className = 'btn btn-success';
            callButton.innerHTML = '<i class="bi bi-telephone"></i>';
            listItem.appendChild(callButton);

            const removeButton = document.createElement('button');
            removeButton.setAttribute('type', 'button');
            removeButton.className = 'btn btn-danger';
            removeButton.innerHTML = '<i class="bi bi-trash"></i>';
            listItem.appendChild(removeButton);

            contactsList.appendChild(listItem);

            // Adding a custom attribute to store the contact's ID
            listItem.setAttribute('data-contact-id', contact.id);

            // Adding click event listener to call the contact
            callButton.addEventListener('click', event => {
                const selectedContactId = event.target.parentElement.getAttribute('data-contact-id');
                this.call(Number(selectedContactId));
            });

            // Adding click event listener to remove the contact
            removeButton.addEventListener('click', event => {
                const selectedContactId = event.target.parentElement.getAttribute('data-contact-id');
                this.removeContact(Number(selectedContactId));
            });
        });

        // Show/hide the popup based on the search results
        const popup = document.querySelector('.contacts__popup');
        if (contacts.length > 0) {
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    }

    #setEvents() {
        const searchInput = document.getElementById('contacts-search');
        searchInput.addEventListener('input', event => {
            const searchTerm = event.target.value.trim();
            if (searchTerm !== '') {
                this.search(searchTerm);
            } else {
                this.#searchedUsers = [];
                console.log('Search cleared.');
            }
        });

        const contactsList = document.querySelector('.contacts__list');
        contactsList.addEventListener('click', event => {
            const target = event.target;
            const contactId = target.closest('[data-contact-id]')?.getAttribute('data-contact-id');
            if (!contactId) return;

            if (target.classList.contains('btn-success')) {
                this.call(Number(contactId));
            } else if (target.classList.contains('btn-danger')) {
                this.removeContact(Number(contactId));
            }
        });
    }
}


const phoneBook = new PhoneBook(users);
