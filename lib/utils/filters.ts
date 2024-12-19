import { taxiColorArray } from "../models/mod.ts";
import { systemModelArray } from "../models/taxi.ts";

export const filterSystemModelFA2EN = (str: string) => {
	switch (str) {
		case "سمند":
			return systemModelArray[0];
		case "پژو":
			return systemModelArray[1];
		case "پرايد":
			return systemModelArray[2];
		case "نارون":
			return systemModelArray[3];
		case "هیوندای":
		case "هيونداي":
			return systemModelArray[4];
		case "دليكا":
			return systemModelArray[5];
		case "سایپا":
		case "سايپا":
			return systemModelArray[6];
		case "تويوتا":
		case "تویوتا":
			return systemModelArray[7];
		case "غزال":
			return systemModelArray[8];
		case "پروتون":
			return systemModelArray[9];
		case "پارس خودرو":
			return systemModelArray[10];
		case "فولکس":
			return systemModelArray[11];
		case "رنو":
			return systemModelArray[12];
		case "برلیانس جین بی":
			return systemModelArray[13];
		case "ايستانا":
			return systemModelArray[14];
		case "جك":
			return systemModelArray[15];
		case "پيکان":
			return systemModelArray[16];
		case "كيا":
			return systemModelArray[17];
		case "سایر":
			return systemModelArray[18];
		default:
			return "notListed";
	}
};

export const filterTaxiColorFA2EN = (str: string) => {
	switch (str) {
		case "زرد روغني":
			return taxiColorArray[0];
		case "زرد خورشيدي":
			return taxiColorArray[1];
		case "سبز فسفري":
			return taxiColorArray[2];
		case "نقره اي":
			return taxiColorArray[3];
		case "زرد":
			return taxiColorArray[4];
		case "سفيد":
			return taxiColorArray[5];
		case "سبز متاليک":
			return taxiColorArray[6];
		case "نقره اي متاليک":
			return taxiColorArray[7];
		case "سبز":
			return taxiColorArray[8];
		case "سفيد روغني":
			return taxiColorArray[9];
		case "سفيد صدفي":
			return taxiColorArray[10];
		case "مشکی روغنی":
			return taxiColorArray[11];
		case "نارنجي":
			return taxiColorArray[12];
		case "خاکستری":
			return taxiColorArray[13];
		case "قرمز":
			return taxiColorArray[14];
		case "سایر":
			return taxiColorArray[15];
		default:
			return "notListed";
	}
};

export const filterTaxiTypeEN2FA = (str: string) => {
	switch (str) {
		case "khati":
			return "خطی";
		case "gardeshi":
			return "گردشی";
		case "forodgah":
			return "فرودگاه";
		case "rahAhan":
			return "راه آهن";
		case "terminal":
			return "ترمینال";
		case "vije":
			return "ویژه";
		case "telephoni":
			return "تلفنی";
	}
};

export const filterVehicleTypeEN2FA = (str: string) => {
	switch (str) {
		case "van":
			return "ون";
		case "savari":
			return "سواری";
	}
};
