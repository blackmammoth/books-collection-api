# Steps to Run Locally

1. Clone the github repository.
2. Run `npm install`
3. Run `npm run dev` to start the environment in dev mode.
4. Run `npm run build` to build the project and get the compiled files (found in the folder `\dist`)
5. Run `npm run start` to start the project using only the compiled js files.

# API Details

- To create a user: `POST \auth\signup`
  - The body must contain

```json
{
    "name": <STRING USERNAME>,
    "password": <PASSWORD MUST BE GREATER THAN 4 CHARACTERS>,
    "role": <USER ROLE TYPE, should be admin/user>
}
```

- To login a user and recieve a jwt token: `POST \auth\login`
  - The body contains

```json
{
    "name": <STRING USERNAME>,
    "password": <PASSWORD MUST BE GREATER THAN 4 CHARACTERS>,
}
```

- After receiving the token, copy and paste it inside `Bearer` inside the `Authorization` header when making a request to the following book api routes:
  - To get all books: `GET \api\books\all` - This route is protected and only users with the role `admin` can access it.
  - To create a book: `POST \api\books` - This route is protected and only users with the role `admin` and `user` can access it.
  - To update a book: `PUT \api\books\{id}` - This route is protected and only users with the role `admin` and `user` can access it.
  - To delete a book: `DELETE \api\books\{id}` - This route is protected and only users with the role `admin` can access it.
  - `GET \api\books\recomendations` - This route is protected and only users with the role `admin` and `user` can access it.

## Note

- To deploy the project, first run `npm run build` then `vercel`. If you don't run `npm run build`, vercel won't deploy it correctly.
