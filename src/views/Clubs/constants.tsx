export const clubListingHeaders = [
  "Clubs",
  "No.of Members",
  "Chatbot Status",
  "Club Status",
];

export const clubStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const clubHeaderColumnGrid = "53% 16% 16% 16%";

export const mockClubs = [
  {
    id: 1,
    profilePicture: "",
    chatbotSwitch: true,
    clubName: "The Ned",
    onboardingDate: "2024-01-15",
    clubEmail: "contact@thened.com",
    clubPhoneNumber: "2025551234",
    clubCountryCode: "+1",
    clubAddress: "734 15th St NW, Washington, DC 20005, United States",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@thened.com",
    phoneNumber: "2025555678",
    countryCode: "+1",
    description: "Luxury club in downtown DC",
  },
  {
    id: 2,
    profilePicture: "",
    chatbotSwitch: false,
    clubName: "The Ned",
    onboardingDate: "2024-02-20",
    clubEmail: "info@thened.com",
    clubPhoneNumber: "2025559876",
    clubCountryCode: "+1",
    clubAddress: "734 15th St NW, Washington, DC 20005, United States",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@thened.com",
    phoneNumber: "2025554321",
    countryCode: "+1",
    description: "Premium membership club",
  },
];

export const VALIDATION_REGEX = {
  ALPHABETS_ONLY: /^[A-Za-z\s]+$/,
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})?$/,
};

export const MAX_LENGTHS = {
  NAME: 50,
  CLUB_NAME: 100,
  EMAIL: 100,
  ADDRESS: 250,
  NOTES: 500,
};

export const ERROR_MESSAGES = {
  REQUIRED: {
    CLUB_NAME: "Club name is required",
    CLUB_EMAIL: "Club email address is required",
    CLUB_ADDRESS: "Club address is required",
    FIRST_NAME: "First name is required",
    LAST_NAME: "Last name is required",
    PRIMARY_EMAIL: "Primary contact email is required",
  },
  INVALID: {
    ALPHABETS_ONLY: "must contain only alphabets",
    EMAIL_FORMAT: "Invalid email format",
    EMAIL_CHARACTERS:
      "Email can only contain alphanumeric characters and (., -, _, @)",
    PHONE_NUMBER: "Invalid phone number format",
  },
  MAX_LENGTH: {
    CLUB_NAME: `Club name must not exceed ${MAX_LENGTHS.CLUB_NAME} characters`,
    NAME: (field: string) =>
      `${field} must not exceed ${MAX_LENGTHS.NAME} characters`,
    EMAIL: `Email address must not exceed ${MAX_LENGTHS.EMAIL} characters`,
    ADDRESS: `Club address must not exceed ${MAX_LENGTHS.ADDRESS} characters`,
    NOTES: `Notes must not exceed ${MAX_LENGTHS.NOTES} characters`,
  },
};
