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

// fs.readFile(contactsPath, (err, data) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   if (!fs.existsSync("./test")) {
//     fs.mkdirSync("./test");
//   }
//   fs.writeFile(
//     "./test/test.js",
//     `${data.toString()} console.log('update')`,
//     (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//     }
//   );
// });

// fs.unlink("test/test.js", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   fs.rmdir("test", (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("delete done");
//   });
// });

// console.log("консолька в contacts ");

// const [operation, ...numbers] = process.argv.slice(2);

// switch (operation) {
//   case "sum":
//     console.log(numbers.reduce((acc, num) => acc + Number(num), 0));
//     break;
//   case "minus":
//     console.log(numbers.reduce((acc, num) => Number(acc) - Number(num)));
//     break;
//   default:
//     throw new Error("xa-xa");
// }
