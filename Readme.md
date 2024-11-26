# Steps to Run Locally

1. Clone the github repository.
2. Run `npm install`
3. Run `npm run dev` to start the environment in dev mode.
4. Run `npm run build` to build the project and get the compiled files (found in the folder `\dist`)
5. Run `npm run start` to start the project using only the compiled js files.

## Note
- To deploy the project, first run `npm run build` then `vercel`. If you don't run `npm run build`, vercel won't deploy it correctly.