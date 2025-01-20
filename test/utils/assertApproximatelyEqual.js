import { strict as assert } from "assert";

export default function assertApproximatelyEqual(actual, expected, message) {
  if ((Object.is(actual, 0) && Object.is(expected, -0)) || (Object.is(actual, -0) && Object.is(expected, 0))) {
    return;
  }
  assert.strictEqual(actual, expected, message);
}