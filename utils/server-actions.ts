import { z } from "zod";

const serverError = z.strictObject({
  error: z.string(),
});
type ServerErrorResponse = z.infer<typeof serverError>;

type ActionHandlerReturn<TResult> = Promise<TResult | ServerErrorResponse>;

type ActionResult<T> = T extends ServerErrorResponse ? never : T;
type Handler<TInput, TResult> = (data: TInput) => ActionHandlerReturn<TResult>;
type ServerFn<TInput, TResult> = (
  data: TInput,
) => Promise<ActionResult<TResult>>;

const GENERIC_ERROR = "An unexpected error occurred. Please try again.";

export function createServerFn<TInput, TResult>(
  schema: z.ZodSchema<TInput>,
  handler: Handler<TInput, TResult>,
): ServerFn<TInput, TResult>;

export function createServerFn<TInput, TResult>(
  handler: Handler<TInput, TResult>,
): ServerFn<TInput, TResult>;

export function createServerFn<TInput, TResult>(
  arg1: z.ZodSchema<TInput> | Handler<TInput, TResult>,
  arg2?: Handler<TInput, TResult>,
): ServerFn<TInput, TResult> {
  let schema: z.ZodSchema<TInput> | undefined;
  let handler: Handler<TInput, TResult>;
  if (typeof arg1 === "function") {
    handler = arg1;
    schema = undefined;
  } else {
    schema = arg1;
    handler = arg2!;
  }

  // The resulting Server Action function
  return async (data: TInput): Promise<ActionResult<TResult>> => {
    let validatedData: TInput;

    try {
      // Input validation (if schema is present)
      if (schema) {
        validatedData = schema.parse(data);
      } else {
        validatedData = data;
      }

      const result = await handler(validatedData);
      const error = serverError.safeParse(result);

      // Check for explicit error object returned by the handler (Requirement #5)
      if (error.success) {
        console.error(
          "Server Action Handler returned programmatic error:",
          error.data.error,
        );
        throw new Error(error.data.error);
      }

      // Successful return
      return result as ActionResult<TResult>;
    } catch (error) {
      // Global error handling and logging (Requirement #4)
      const errorInstance =
        error instanceof Error ? error : new Error(String(error));

      if (error instanceof z.ZodError) {
        // Validation error
        console.error(
          "Validation Error in Server Action:",
          z.prettifyError(error),
        );
        throw new Error(`Validation Failed: ${z.prettifyError(error)}`);
      }

      // Log the unexpected internal error
      console.error(
        "Unexpected Server Action Error:",
        errorInstance.message,
        errorInstance,
      );

      // Throw a generic error for security and consistent client-side handling.
      throw new Error(GENERIC_ERROR);
    }
  };
}
