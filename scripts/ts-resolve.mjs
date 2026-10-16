/*
 * Lets Node load the TypeScript data files directly. They import each other
 * without extensions ("./event"), as the Next.js bundler allows; this retries
 * a relative import that has no extension with ".ts". Used by the principal
 * pack test and print script.
 */
import { register } from "node:module";

const hook = `
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (err) {
    if (err?.code === "ERR_MODULE_NOT_FOUND" && /^\\.{1,2}\\//.test(specifier) && !/\\.[cm]?[jt]sx?$/.test(specifier)) {
      return next(specifier + ".ts", context);
    }
    throw err;
  }
}`;

register(`data:text/javascript,${encodeURIComponent(hook)}`);
