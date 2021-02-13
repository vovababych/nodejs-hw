import contacts from "./contacts.js";
import program from "./lib/commander.js";
import createDirname from "./lib/dirname.js";

const { __dirname, __filename } = createDirname(import.meta.url);
program.parse();
const args = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(Number(id));
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(args);
