import * as fs from "fs/promises";
import path from "path";
import shortid from "shortid";

import { handleError } from "./lib/handleerror.js";
import createDirname from "./lib/dirname.js";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.table(JSON.parse(data.toString()));
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(data);
    const contact = parseContacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(`Contact with ID: ${contactId} not found!`);
    }
    console.log(contact);
  } catch (error) {
    handleError(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(data);
    const uniq = parseContacts.find((contact) => contact.email === email);
    if (uniq) {
      throw new Error("такой контакт уже есть");
    }
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...parseContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("Contact added");
  } catch (error) {
    handleError(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(data);
    const newContacts = parseContacts.filter(
      (contact) => contact.id != contactId
    );
    if (parseContacts.length === newContacts.length)
      throw new Error(`Contact with id: ${contactId} not found`);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("Contact removed");
  } catch (error) {
    handleError(error);
  }
}

export default { listContacts, getContactById, removeContact, addContact };
