#React/Typescript/Antd boilerplate

In the project directory, you can run:

### `npm i` followed by `npm start`

### For Running Testcases you can run

`npm run test`

### For dev builds you can run

`npm run build`

### For staging builds you can run

`npm run build:staging`

### For production builds you can run

`npm run build:production`

## Project directory structure

### `src/assets`

Contains images and icons

### `src/enums/`

Contains all enumerators used in the application

### `src/interceptor/`

Contains `axiosInterceptor` for API requests and responses.

### `src/models/`

Contains all the models with the backend alias used in the application.

### `src/routes/`

Contains all the Application routes and API endpoints.

### `src/services/`

Contains all the services which in-turn has the corresponding API calls.

### `src/shared/components/`

Contains Reusable/shared components (Eg: `InputField`, `DropdownField`)

### `src/shared/utils/`

Contains helper methods like `jsonToFormDataConverter` and `createReducer`

### `src/shared/validation/`

Contains generic utilities for Yup Validations.

### `src/store/actions/`

Contains all action dispatchers to reducers.

### `src/store/containers/`

Contains all container files which maps the store props and action dispatchers to application components.

### `src/store/definitions/`

Contains all action definition constants

### `src/store/reducers/`

Contains all reducers which mutates the properties of application store. The `appReducer` combines all the other reducers and passed to the root component

### `src/styles/`

Contains reusable styles and variables used across the application

### `src/views/`

Contains presentational components. Each component has its own `.tsx` and `.scss` files

### `src/shared/components/StripePayment`

This directory houses components related to Stripe payments, with comments provided for reference. Each component corresponds to specific elements required for Stripe payments. As your project evolves and new requirements emerge, you can utilize or customize these components as needed.

Feel free to explore and integrate the appropriate elements based on your specific payment processing needs.

### `src/services/StripeService`

This module encapsulates essential methods for managing Stripe payments, including the creation of payment methods and confirmation of payment intents. It serves as a foundational component for handling various payment flows. As your payment requirements evolve, consider extending this service by adding new methods to accommodate specific scenarios.

Feel free to customize this service to align with your application's evolving payment processing needs.
