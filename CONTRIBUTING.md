# Contributing Guidelines

## Environment setup

- Install `npm` and `git` on your system.
    ```bash
    sudo apt update
    sudo apt installl npm git
    ```
- Clone this repository. Switch to `frontend` branch.
    ```bash
    git clone https://github.com/midas-research/achieve-iiitd
    cd achieve-iiitd
    git switch frontend
    ```
- Install all dependencies.
    ```
    npm install
    ```
    If there are some issues in installing dependencies, you can try `--force` flag.
    ```
    npm install --force
    ```
- To run the development server:
    ```
    npm start
    ```
    If you need more packages, use `npm install --save package-name`.
- In development server, you might not be able to login using actual credentials, since login is facilitated through token provided by `osa.iiitd.edu.in`. For that, manually visit [localhost:3000/oldlogin](localhost:3000/oldlogin). You can create a test user in `django` admin, and login using those credentials from here.

## Build and deploying to server

- Run `npm run build` to get the production build files in `build` folder.
- You have to copy these files to the server static files folder. You can use another temporary git repository for that.
  - `automateBuild.sh` is a shell script for automatically building the website and pushing to temporary git repository.
  - To use this script, create an empty repository on `github` and then type this in the main folder:
    ```bash
    mkdir build
    git clone <temp-git-repository-link> build
    ```
  - Avoid building the website on server machine.
- On server, we have an automated script for updating frontend static files. The path of the script is `~/achieve-iiitd/frontend.sh`. For this to work, you must have your temporary build repository linked to `~/achieve-iiitd/frontend` folder. If you are setting up for the first time, remove `frontend` folder, and run this:
  ```bash
  git clone <temp-git-repository-link> frontend
  ```

## Understanding Project Strucutre

The project uses `react` framework. In the `src/components` folder, we have all components which are used in multiple pages. In the `src/pages` folder, we have all different pages that the user can access. For routing, we are using `react-router`. Routes are definded in `App.jsx`.

### Redux as a central store

Following the `flux` architecture, we are using `redux` as a central store. All `redux` related code is located in `src/redux` folder. `redux` has three main components:

1. `store`: This is the central store which is present for the entire lifecycle of the application. The `redux` store is initialized in `src/redux/configureStore.js`. This central state is immutable and can only be mutated through suitable actions.

2. `actions`: `actions` are plain `javascript` objects, which when dispatched, trigger some action in the store. These `actions` and action creators associated with them are defined in `src/redux/actionCreators.js`. To maintain uniformity of action names across different files, we have defined all action names in `src/redux/actionTypes.js`.

3. `reducers`: These are functions which decide what needs to be done when an action is dispatched. We are using separate reducers for different requirements (eg. `src/redux/admin.js`, `src/redux/user.js`, etc), and finally combining these reducers in `src/redux/configureStore.js`.

### API Calls

There are many functions in the `src/redux/ActionCreators` which are not calling `redux` action creators. These are functions for simply fetching  resource from backend. These functions are being used by mulitple files, or are indirectly related to overall project. However, some pages may be directly accessing resources from backend as well. However, ideally all API call functions should be defined here.

The backend url is defined in `src/shared/baseUrl.js`.

## Libraries Used

- `reactstrap`, `bootstrap`: For layout and other styling we have used these libraries. Custom css for is defined in `src/App.scss`. Try to keep minimum custom css.
- `font-awesome`: For svg icons.
- `recharts`: For displaying pie chart (and maybe more in future) in `src/pages/UserProfile`.
- `cross-fetch`: For fetching resources from backend.
- `cookies-js`: For easy cookie itegration.