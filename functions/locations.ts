import { Handler } from "@netlify/functions";

import { locations } from "../src/database";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(locations),
  };
};

export { handler };
