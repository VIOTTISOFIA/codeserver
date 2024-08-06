import { Command } from "commander";

const args = new Command();
args
  .option("-p, --port <port>", "port", 8080)
  .option("--env <env>", "environment", "prod")
  .option("--persistence <pers>", "persistence", "mongo");

args.parse();

export default args.opts();
