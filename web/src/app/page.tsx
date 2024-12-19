"use client";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	example: string;
	exampleRequired: string;
};

const FormHook = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	console.log(watch("example")); // watch input value by passing the name of it

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* register your input into the hook by invoking the "register" function */}
			<input defaultValue="test" {...register("example")} />

			{/* include validation with required or other standard HTML validation rules */}
			<input {...register("exampleRequired", { required: true })} />
			{/* errors will return when field validation fails  */}
			{errors.exampleRequired && <span>This field is required</span>}

			<input type="submit" />
		</form>
	);
};

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<FormHook />
		</div>
	);
}
