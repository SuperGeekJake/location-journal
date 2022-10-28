import { Handler } from "@netlify/functions";

import { visits } from "../src/database";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(visits),
  };
};

export { handler };
