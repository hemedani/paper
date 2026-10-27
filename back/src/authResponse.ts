import { authErrorCodes } from "@paper/lib";

type StructuredAuthError = {
	code: string;
	message: string;
};

const isStructuredAuthError = (
	value: unknown,
): value is StructuredAuthError => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const candidate = value as { code?: unknown; message?: unknown };
	return typeof candidate.code === "string" &&
		typeof candidate.message === "string" &&
		(authErrorCodes as readonly string[]).includes(candidate.code);
};

const normalizeAuthErrorResponse = async (
	request: Request,
	response: Response,
): Promise<Response> => {
	if (response.ok || new URL(request.url).pathname !== "/lesan") {
		return response;
	}

	let payload: unknown;
	try {
		payload = await response.clone().json();
	} catch {
		return response;
	}

	const message = (payload as {
		body?: { message?: unknown };
	})?.body?.message;

	if (!isStructuredAuthError(message)) {
		return response;
	}

	const headers = new Headers(response.headers);
	headers.set("content-type", "application/json");
	headers.set("cache-control", "no-store");
	headers.delete("content-length");
	headers.delete("content-encoding");

	return new Response(
		JSON.stringify({
			success: false,
			body: {
				code: message.code,
				message: message.message,
			},
		}),
		{
			status: response.status,
			headers,
		},
	);
};

type ServeHandler = (
	request: Request,
	info?: unknown,
) => Response | Promise<Response>;
type ServeOptions = Deno.ServeOptions;

// Lesan only serializes `error.message` and exposes no error hook. Wrap the
// server handler to hoist AuthError payloads into `body.code`/`body.message`
// while leaving every other response untouched.
export const installAuthErrorResponseHandler = () => {
	const originalServe = Deno.serve.bind(Deno);

	const wrap =
		(handler: ServeHandler): ServeHandler => async (request, info) =>
			await normalizeAuthErrorResponse(
				request,
				await handler(request, info),
			);

	const serve = (
		first: ServeOptions | ServeHandler,
		second?: ServeHandler,
	) => typeof first === "function"
		? originalServe(wrap(first))
		: originalServe(first, wrap(second as ServeHandler));

	Object.defineProperty(Deno, "serve", {
		value: serve as unknown as typeof Deno.serve,
		configurable: true,
		writable: true,
	});
};
