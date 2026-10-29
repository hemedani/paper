import { lesan, MongoClient, redis } from "deps";
import {
	articles,
	authors,
	blogs,
	categories,
	files,
	keywords,
	publications,
	tags,
	users,
} from "@paper/lib";
import { functionsSetup } from "./src/mod.ts";
import { installAuthErrorResponseHandler } from "./src/authResponse.ts";

export const myRedis = await redis.connect({
	hostname: "127.0.0.1",
	port: 6379,
});

export const coreApp = lesan();
const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
const db = client.db("paper");
coreApp.odm.setDb(db);

export const article = articles();
export const blog = blogs();
export const user = users();
export const file = files();
export const publication = publications();
export const tag = tags();
export const author = authors();
export const keyword = keywords();
export const category = categories();

export const { setAct, setService, getAtcsWithServices } = coreApp.acts;

export const { selectStruct, getSchemas } = coreApp.schemas;

functionsSetup();
installAuthErrorResponseHandler();

coreApp.runServer({
	port: 1382,
	typeGeneration: true,
	playground: true,
	staticPath: ["/uploads"],
	cors: [
		"http://localhost:1382",
		"http://localhost:3000",
		"http://localhost:4000",
		"http://194.5.192.166:3000",
		"http://94.184.45.192:3000",
	],
});
