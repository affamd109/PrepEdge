import { inngest } from "./client";

// The createFunction method takes three objects as arguments:
// 1. Metadata about the function, including its ID.
// 2. The event that triggers the function.
// 3. The function itself, which receives the event and a step object to manage the workflow.

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
