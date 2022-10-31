import { Handler } from "@netlify/functions";
import * as google from "@googleapis/sheets";

export const handler: Handler = async (event, context) => {
  try {
    if (!process.env.GOOGLE_CREDENTIALS)
      throw new Error("Bad environment config: Missing credentials");
    const googleCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    if (!process.env.GOOGLE_SPREADSHEET_ID)
      throw new Error("Bad environment config: Missing spreadsheet ID");
    const googleSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const auth = new google.auth.GoogleAuth({
      credentials: googleCredentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    // Acquire an auth client, and bind it to all future calls
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const spreadsheet = await sheets.spreadsheets.values.get({
      spreadsheetId: googleSpreadsheetId,
      range: "Visits!A1:E101",
      valueRenderOption: "FORMULA",
      dateTimeRenderOption: "SERIAL_NUMBER",
    });

    const values = spreadsheet.data.values;
    if (!values) throw new Error("No data");

    // Convert the column headers into prop names
    const props = values[0].map((name: string, index: number) => {
      if (!name) throw new Error(`No header value at ${COLUMNS[index]}1`);
      return camelize(name);
    });

    const data = values.slice(1).reduce((result, row, i) => {
      const id = i + 1;
      result[id] = {
        ...props.reduce((rowProps, name, pIndex) => {
          rowProps[name] = row[pIndex];
          return rowProps;
        }, {} as { [key: string]: any }),
        id,
      };
      return result;
    }, {} as Record<number, { id: number; [key: string]: any }>);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Cache-Control": "s-maxage=1, stale-while-revalidate",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

const COLUMNS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const camelize = (str: string) =>
  str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index: number) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
