import commander from "commander";
const { Command } = commander;
const program = new Command();

program
  .version("0.0.1")
  .option("-a, --action <action>", "Action in the contacts")
  .option("-i, --id <id>", "contact's id")
  .option("-n, --name <Name>", "new user name")
  .option("-e, --email <Email>", "new user email")
  .option("-p, --phone <Phone>", "new user phone");

export default program;
