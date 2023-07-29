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
        const index = this.#contacts.findIndex(contact => contact.id === contactId);
        if (index !== -1) {
            this.#contacts.splice(index, 1);
            console.log(`Contact with ID ${contactId} removed.`);
        } else {
            console.log(`Contact with ID ${contactId} not found.`);
        }
    }

    search(searchTerm) {
        this.#searchedUsers = this.#contacts.filter(contact => {
            return (
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phone.includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        const updateContactList = (contacts) => {
            const contactsList = document.querySelector('.contacts__list ul');
            contactsList.innerHTML = '';

            contacts.forEach(contact => {

            });
        };

        updateContactList(this.#searchedUsers);

        // После выполнения поиска, обновим список всплывающего окна
        this.updatePopupList(this.#searchedUsers);
    }

    updatePopupList(contacts) {
        const popupList = document.querySelector('.contacts__popup ul');
        popupList.innerHTML = '';

        contacts.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;
            listItem.className = 'list-group-item';
            popupList.appendChild(listItem);

            // Adding a custom attribute to store the contact's ID
            listItem.setAttribute('data-contact-id', contact.id);

            // Adding click event listener to call the contact
            listItem.addEventListener('click', event => {
                const selectedContactId = event.target.getAttribute('data-contact-id');
                const input = document.getElementById('contacts-search');
                popupList.innerHTML=selectedContactId;
                this.call(Number(selectedContactId));
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
            const contactId = target.closest('[data-user-id]')?.dataset.userId;
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
