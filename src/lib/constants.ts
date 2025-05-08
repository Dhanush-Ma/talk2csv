export const FORM_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "Password must be at least 6 characters long.",
  INVALID_USERNAME: "Username is required.",
  INVALID_FILE: "Please upload a valid CSV file.",
  INVALID_FILE_TYPE: "Only CSV files are allowed.",
  INVALID_FILE_SIZE: (size: number) => `File must be less than ${size}MB.`,
  MAXIMUM_NO_OF_TAGS: "You can only add up to 3 tags.",
};

export const ERROR_MESSAGES = {
  ACCOUNT_CREATION_FAILED:
    "Something went wrong while creating the account. Please try again.",
  GENERAL_ERROR: "Something went wrong. Please try again later.",
  CHAT_CREATION_FAILED:
    "Something went wrong while creating the chat. Please try again.",
  CHAT_DELETION_FAILED:
    "Something went wrong while deleting the chat. Please try again.",
  CHAT_RENAME_FAILED:
    "Something went wrong while renaming the chat. Please try again.",
};

export const ONBOARDING = {
  ROLES: [
    "Data Analyst",
    "Business Analyst",
    "Product Manager",
    "Founder / Entrepreneur",
    "Student / Learner",
    "Researcher",
    "Marketing Professional",
    "Finance / Operations",
    "Developer / Engineer",
    "Educator / Instructor",
    "Consultant",
    "Other",
  ],
  ACQUISITION_SOURCES: [
    "Twitter / X",
    "LinkedIn",
    "Product Hunt",
    "Google Search",
    "YouTube / Podcast",
    "Newsletter",
    "Friend / Colleague",
    "Online Community (e.g. Reddit, Discord)",
    "Blog or Article",
    "Other",
  ],
};
