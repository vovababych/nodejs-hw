import commander from "commander";
const { Command } = commander;
const program = new Command();

program
  .version("0.0.1")
  .option("-a, --action <action>", "Action in the contacts")
  .option("-i, --id <id>", "Contact's id")
  .option("-n, --name <Name>", "New user name")
  .option("-e, --email <Email>", "New user email")
  .option("-p, --phone <Phone>", "New user phone");

export default program;
