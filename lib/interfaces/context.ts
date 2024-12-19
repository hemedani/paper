import { type Infer, type LesanContenxt, object, type ObjectId } from "deps";
import { taxiPureFields, userPure } from "../models/mod.ts";

type Merge<A, B> = (
	& { [K in keyof A]: K extends keyof B ? B[K] : A[K] }
	& B
) extends infer O ? { [K in keyof O]: O[K] }
	: never;

const userPureObj = object(userPure);
type UserPure = Infer<typeof userPureObj>;

const taxiPurObj = object(taxiPureFields);
type TaxiPure = Infer<typeof taxiPurObj>;

export interface MyContext extends LesanContenxt {
	user: Merge<{
		_id: ObjectId;
		taxi: TaxiPure & { _id: ObjectId };
	}, Partial<UserPure>>;
	isInFeatures: boolean;
	isInLevels: boolean;
}
