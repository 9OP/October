# October - take home challenge

## Start the project

With docker:

```sh
docker build . -t homework
docker run -p 8080:8080 homework
```

Without docker (requires Node):

```sh
npm install
npm run dev
```

Service is available at: `http://localhost:8080/api?company=<COMPANY-NAME>&postal_code=<POSTAL-CODE>`

## Test

On host:

```sh
npm run test
```

### Notes:

- The telephone numbers are scrapped via Puppeteer. There are 2 attempts to retrieve the phone number. One via 118000 and one via Google.
  There is a limitation, the telephone numbers are retrieved by using CSS selectors on the rendered app in Puppeteer.
  Those selectors are based on classes `$(".atel")` and `$(".mw31Ze")` which can change when new app versions of 118000 and Google are released.

- For some reason Puppeteer behaviour inside Docker is not the same as on my host. I recommand to run the app without Docker is possible.
