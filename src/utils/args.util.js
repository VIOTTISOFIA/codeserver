import { Command } from "commander";

const args = new Command();
args.option("-p <port>", "port", 8080);
args.option("--env <env>", "enviroment", "production");
args.option("--persistance <pers>", "persistance", "mongo");

args.parse();
export default args.opts();
