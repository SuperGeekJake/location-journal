## Usage

You will need to create Google service account credentials and give it access to a spreadsheet. Then those values must be placed in a `.env` file in the root directory.

```bash
GOOGLE_CREDENTIALS="{\"type\": \"service_account\", ... }"
GOOGLE_SPREADSHEET_ID="TlkLIEsS9Twtb02z34Df1lYtyrfssM22-1DKfFeV5GB4"
```

Spreadsheet must adhere to the following format otherwise UI will break. Note: The date format does not matter, will be converted to a number in the response.

| Date       | Location Name  | Image Url                               | Featured | Description        |
| ---------- | -------------- | --------------------------------------- | -------- | ------------------ |
| 2022-04-13 | Ground Up Cafe | https://placekitten.com/150/150?image=7 | FALSE    | Best matcha latte! |

Then you can run the following to work locally.

```bash
$ pnpm install
$ pnpm start
```

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.<br>
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.
The page will reload if you make edits.<br>

### `pnpm build`

Builds the app for production to the `dist` folder.<br>
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `pnpm test`

Currently the only test is one used to output fake CSV data in a snapshot, which then can be copied into a CSV file and imported to Google Sheets.

## Deployment

You can deploy the `dist` and `functions` folders to Netlify, though the easiest method would be through the CLI tool. Make sure to set the ENV variables as well.
