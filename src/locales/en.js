/**
 * README
 *
 * All translations are minimum 2-level nested. Do NOT place translation directly into root object.
 * All commonly used translations place in "common".
 * All button translations put under "button" object.
 * All form label translations put under "label" object.
 * Organize translations into GROUPS, that can be per feature, function or similar.
 *
 * First level objects keep in ALPHABETIC order with exception of "common".
 *
 * Do NOT name translations too long.
 *  Bad: afterAcceptYouWillRecieveEmailLink
 *  Good: successTextEmail, even better - nest it register: { successTextEmail: "" }
 *
 * Use variables/formatting and other features of the plugin.
 *
 * Read docs: https://kazupon.github.io/vue-i18n/guide/formatting.html
 */

export default {
  common: {
    error: "Error!",
    hello: "Hello",
    yes: "Yes",
    no: "No",
    noDataAvailable: "No data available.",
    noImage: "No image",
    org: "Organisation",
    sendEmail: "Send email",
    success: "Success!",
    user: "User",
    welcome: "Welcome!",
    cityLoadingText: "Your experience is loading...",
  },

  activities: {
    login: "Logged in",
  },

  buttons: {
    accept: "Accept",
    accepted: "Accept",
    addAnother: "Add another",
    addCategory: "Add category",
    addProduct: "Add product",
    addUser: "Add user",
    back: "Back",
    bundles: "Bundles",
    buy: "Buy",
    buyNow: "Buy now",
    cancel: "Cancel",
    cancelOrder: "Cancel order",
    close: "Close",
    confirm: "Confirm",
    continue: "Continue",
    createAccount: "Create Account",
    declined: "Reject",
    delete: "Delete",
    deleteOrder: "Delete order",
    deny: "Deny",
    details: "Details",
    edit: "Edit",
    forgotPassword: "Forgot password?",
    homepage: "Homepage",
    login: "Log in",
    logout: "Logout",
    makeCopy: "Make a copy",
    next: "Next",
    pending: "Pending",
    product: "Product",
    removeFromSaved: "Remove from saved products",
    returnToLogin: "Return to Login",
    rights: "Rights",
    save: "Save",
    seeAll: "See all",
    seeMore: "See more",
    setNewPassword: "Set new password",
    send: "Send",
    signUp: "Sign up",
    skip: "Skip",
    submit: "Submit",
    user: "User",
    verify: "Verify",
    viewActivity: "View activity",
  },

  categories: {
    title: "Categories",
    addCategory: "Add category",
    editCategory: "Edit category",
  },

  checkout: {
    bankTransferMessage:
      "Please transfer the amount using the reference below to the following bank account:",
    cancelText: "Are you sure that you want to cancel this order?",
    changeCurrency: "Change currency",
    checkout: "Checkout",
    contract: "Contract",
    contractAcceptText: "Are you sure you want to accept this contract?",
    contractAcceptTitle: "Accept contract",
    contractDenyText: "Are you sure you want to deny this contract?",
    contractDenyTitle: "Deny contract",
    contractDenied: "Contract denied!",
    orderCanceled: "Order canceled!",
    paymentFailed: "Payment failed!",
    paymentPending: "Payment pending!",
    previousPaymentFailed: "Previous payment failed.",
    thanksForOrder: "Thank you for your order!",
    trackYourOrder: "Track your order",
    yourOrderNumber: "Your order number is #{n}",
  },

  confirmDialog: {
    title: "Confirm action",
    text: "This action cannot be undone. Are you sure you want to continue?",
  },

  contracts: {
    contract: "Contract",
    contracts: "Contracts",
    listTooltipText: "The list of accepted contracts.",
    title: "Contracts",
    template: "Contract template",
    appendix: "Contract appendix",
  },

  city: {
    contentPalace: {
      title: "Content palace",
      text: "Your marketplace for professional B2B content trading. Producers, broadcasters, distributors, and publishers are invited to register and explore new content and business.\nOur platform offers a complete service, from ingest and onboarding, to negotiation, purchase, and delivery, utilizing the latest broadcast technology.\nWe look forward to working together with you!",
      button: "Enter",
    },
    exchangeBuilding: {
      title: "Exchange Building",
      text: "Enter a gateway to the world of cryptocurrencies!\nExchange your real-world money into cryptocurrencies, such as MILC’s Media Licensing Token (MLT), in a seamless way. Our trusted cryptocurrency exchange partners offer a secure and reliable marketplace to kick-start your very own crypto journey.",
      button: "Enter",
    },
    tower3: {
      title: "Community",
      text: "Do you want to know more about the community? Enter the community!",
      button: "Enter",
    },
    milcTower: {
      title: "Milc Tower",
      text: "Do you want to know more about the project and the team behind it? Our headquarters will direct you to our project homepage.",
      button: "Enter",
    },
    shoppingCenter: {
      title: "Shopping Center",
      text: "A shopping experience like in your favorite shopping mall. Opening soon!",
      button: "Enter",
    },
    supportBuilding: {
      title: "Support Building",
      text: "You need some help or have input and suggestions? Great, then drop us a message and we will come back to you!",
      button: "Enter",
    },
    communityBuilding: {
      title: "Community",
      text: "Do you want to know more about the community? Enter the community!",
      button: "Enter",
    },
    mouseInstructions: {
      pan: "PAN",
      rotate: "ROTATE",
      zoom: "ZOOM",
    },
    navigateConfirmation: {
      navigate: "NAVIGATE TO",
      cancel: "CANCEL",
    },
  },

  feedback: {
    title: "Feedback",
    dialogTitle: "Leave us a feedback",
    type: "Feedback type",
    anonymous: "Anonymous",
    showArchived: "Show archived",
    types: {
      general: "General feedback",
      bug: "Bug report",
      suggestion: "Suggestion",
    },
    statuses: {
      pending: "Pending",
      done: "Done",
      todo: "To-Do",
    },
  },

  forgotPassword: {
    heading: "Reset your password",
    subheading: "Link with instruction will be sent to your email",
    success: {
      heading: "Check your email",
      text1: "You will recieve an email with a reset password link.",
      text2: "Check your inbox and follow the reset password link.",
    },
  },

  labels: {
    accepted: "Accepted",
    active: "Active",
    activity: "Activity",
    address: "Address",
    allowRequests: "Allow requests?",
    amount: "Amount",
    assets: "Assets",
    availableFrom: "Available from",
    availableUntil: "Expires at",
    availableRights: "Available rights",
    awards: "Awards",
    bankName: "Bank name",
    boxOffice: "Box office",
    cast: "Cast",
    city: "City",
    contact: "Contact",
    content: "Content",
    copyrightInfo: "Copyright information",
    country: "Country",
    countryOrigin: "Country of origin",
    contentType: "Content type",
    createdAt: "Created at",
    date: "Date",
    dateAdded: "Date added",
    declined: "Rejected",
    description: "Organisation description",
    director: "Director",
    dubbing: "Available dubbing",
    dubFiles: "Dub files",
    email: "Email",
    facebook: "Facebook",
    festivals: "Festivals",
    filename: "Filename",
    files: "Files",
    filterBy: "Filter by",
    firstName: "First name",
    formats: "Available formats",
    gboGlobal: "Global GBO",
    gboDomestic: "Domestic GBO",
    gboInternational: "International GBO",
    genre: "Genre",
    hits: "Hits",
    holdback: "Holdbacks",
    holdbacks: "Holdbacks / Restrictions / Sold rights",
    iban: "IBAN",
    id: "ID",
    image: "Image",
    imdb: "IMDB",
    inactive: "Inactive",
    jobTitle: "Job title",
    keyArt: "Key art",
    keywords: "Keywords",
    lastName: "Last name",
    language: "Language",
    languages: "Languages",
    languageOriginal: "Original language",
    linkedin: "LinkedIn",
    links: "Links",
    logo: "Logo",
    longDescription: "Long description",
    movie: "Movie",
    name: "Name",
    order: "Order",
    orderDate: "Order date",
    organisation: "Organisation",
    orgName: "Organisation name",
    orgType: "Organisation type",
    orgLogo: "Organisation logo",
    orgRole: "Organisation role",
    ownerUser: "Owner user",
    password: "Password",
    passwordConfirm: "Confirm Password",
    passwordCurrent: "Current Password",
    passwordNew: "New Password",
    pending: "Pending",
    phone: "Phone number",
    phoneShort: "Phone",
    postalCode: "Postal code",
    price: "Price",
    producer: "Producer",
    product: "Product",
    productDetails: "Product details",
    products: "Products",
    productionImages: "Production images",
    productionStatus: "Production status",
    productionYear: "Production year",
    profileImage: "Profile image",
    promotionalVideos: "Promotional videos",
    reference: "Reference",
    region: "Region",
    registered: "Registered",
    registrationNumber: "Registration number",
    released: "Released",
    releaseYear: "Release year",
    resolution: "Resolution",
    reviewsPromotions: "Reviews / Promotions",
    rights: "Rights",
    role: "Role",
    runtime: "Runtime (hh:mm:ss)",
    search: "Search",
    screener: "Screener",
    shortDescription: "Short description",
    state: "State",
    status: "Status",
    subtitles: "Available subtitles",
    subtitleFiles: "Subtitle files",
    subtotal: "Subtotal",
    swift: "SWIFT (BIC)",
    synopsis: "Synopsis",
    telegram: "Telegram",
    telephone: "Telephone number",
    territories: "Territories",
    territory: "Territory",
    title: "Title",
    titleAlternative: "Alternative title",
    total: "Total",
    trailer: "Trailer",
    twitter: "Twitter",
    type: "Type",
    unreleased: "Unreleased",
    upload: "Upload",
    user: "User",
    userLogo: "User logo",
    vat: "VAT",
    vatCountry: "VAT per country",
    vatDomestic: "Domestic VAT",
    vatInternational: "International VAT",
    vatRules: "VAT rules",
    website: "Website link",
    worldwide: "Worldwide",
    writer: "Writer",
  },

  login: {
    forgotPassword: "Forgot password?",
    heading: "Welcome Back",
    loginFailed: "Invalid email or password.",
    subheading: "Login to your account",
    noAccount: "Don't have an account yet?",
    waitingApproval: {
      heading: "Waiting for approval",
      text: "Your registration application is still in processing. Thank you for your patience!",
    },
    denied: {
      heading: "Request denied",
      text: "Unfortunately your registration request has been denied.",
    },
    verificationNeeded: {
      heading: "Email not verified",
      text1:
        "We've sent account verification link to your email address. Please click on the link given in email to verify your account.",
      text2:
        "If you didn't receive email or your link expired, click on the button below to resend the link.",
      button: "Resend link",
    },
    userInactive: {
      heading: "Account inactive",
      text: "Sorry, you can't log in because your account is set to inactive. ",
    },
    twoFA: {
      heading: "Two-factor authentication",
      subheading:
        "Please enter the two-factor authentication (2FA) code that is sent to your email.",
    },
  },

  menu: {
    accounting: "Accounting",
    categories: "Categories",
    contracts: "Contracts",
    dashboard: "Dashboard",
    feedback: "Feedback",
    frontend: "Frontend",
    home: "Home",
    messages: "Messages",
    orders: "Orders",
    organisations: "Organisations",
    people: "People",
    products: "Products",
    savedProducts: "Saved",
    settings: "Settings",
    turnovers: "Turnovers",
    users: "Users",
  },

  messages: {
    title: "Messages",
  },

  notFound: {
    title: "Page Not Found",
    text: "Sorry, we can't find the page you're looking for.\nYou can either return to the previous page, visit our homepage or contact our support team.",
  },

  notifications: {
    all: "All",
    latest: "Latest notifications",
    markAsRead: "Mark as read",
    markAllAsRead: "Mark all as read",
    newNotificationsAlert: "You have new notifications!",
    noNotifications: "No notifications.",
    title: "Notifications",
    unread: "Unread",
  },

  orders: {
    billingInformation: "Billing information",
    contactInformation: "Contact information",
    deliveryInformation: "Delivery information",
    downloadMovie: "Download movie",
    downloadContract: "Download contract",
    downloadReceipt: "Download receipt",
    markAsPaid: "Mark as paid",
    orderDate: "Date of order",
    orderInformation: "Order information",
    orderStatus: "Order status",
    organisationInformation: "Organisation information",
    payment: "Payment",
    paymentType: "Payment type",
    subtotal: "Subtotal",
    title: "Orders",
    total: "Total",
    vat: "VAT",
    state: {
      new: "New",
      contract_accepted: "Contract accepted",
      contract_denied: "Contract denied",
      awaiting_payment: "Payment pending",
      paid: "Paid",
      payment_failed: "Payment failed",
      assets_sent: "Assets sent",
      assets_received: "Assets received",
      complete: "Completed",
      rejected: "Rejected",
      refunded: "Refunded",
      cancelled: "Canceled",
    },
    stateStepper: {
      contract: "Accept contract",
      payment: "Awaiting payment",
      paid: "Payment recieved",
      assets: "Assets transfer",
      completed: "Completed",
    },
  },

  org: {
    org: "Organisation",
    buyer: "Buyer",
    seller: "Seller",
    buyerAndSeller: "Buyer & Seller",
    both: "Both",
    title: "Organisations",
  },

  products: {
    title: "Products",
    noProducts:
      "You have no products. Click on the button in the upper right corner to add a new product.",
    noSavedProducts: "You have no saved products.",
    headings: {
      general: "General information",
      production: "Production & cast information",
      marketing: "Marketing assets",
      localization: "Localization",
      rights: "Rights information",
      bundles: "Rights bundle",
    },
    add: {
      title: "Add Product",
    },
    edit: {
      title: "Edit Product",
      fileUploadInfo:
        "Refresh the page a few minutes after the upload is complete, as it may take some time for the files to appear.",
    },
    list: {
      title: "My Products",
    },
    savedProducts: {
      title: "Saved Products",
    },
    contactSeller: {
      button: "Contact seller",
      title: "Have questions? Contact seller!",
      text: "Do you want to contact the seller and talk about this product? Write a message below and start chatting with the seller.",
    },
    bundles: {
      customBundle: "Custom bundle",
      customBundleTooltip:
        "This bundle is available for one organisation only.",
      customBundleTooltipBuyer:
        "Only your organisation can view and buy this bundle.",
      createCustomBundle: "Create custom bundle",
    },
  },

  people: {
    title: "People",
    headings: {
      name: "Name",
      email: "Email",
      status: "Status",
    },
    add: {
      title: "Add person",
    },
    edit: {
      title: "Edit person",
    },
  },

  resetPassword: {
    heading: "Set new password",
    subheading: "Write down your new password",
    success: {
      heading: "Password updated",
      text: "You have successfully changed your password. Use your new password to login.",
    },
  },

  register: {
    alreadyHaveAccount: "Already have an account?",
    user: {
      heading: "Create Account",
      subheading: "Enter user details",
    },
    org: {
      heading: "Create Account",
      subheading: "Enter organisation details",
    },
    success: {
      heading: "Please verify your email",
      text1: "Thank you for registering.",
      text2:
        "We've sent account verification link to your email address. Please click on the link given in email to verify your account.",
    },
    verified: {
      heading: "Your email is verified!",
      text1: "Thank you for verifying your email.",
      text2:
        "Your account needs approval from the admin. Once you are accepted you will recieve a notification email.",
    },
  },

  rules: {
    creditCard: "Invalid credit card number.",
    cvv: "Invalid card security code.",
    date: "Date must be in DD.MM.YYYY format and valid.",
    duration: "Duration must be in HH:MM:SS format.",
    email: "Must be a valid e-mail address.",
    expirationDate: "Invalid expiration date.",
    number: {
      greater: "Must be greater than {n}{suffix}.",
      less: "Must be less than {n}{suffix}.",
      min: "Must be a minimum of {n}{suffix}.",
      max: "Must be a maximum of {n}{suffix}.",
    },
    password:
      "At least 8 characters, must contain a number and a special character.",
    phone: "Must be a valid phone number.",
    required: "This field is required.",
    time24: "Time must be in hh:mm format.",
    same: "Must be the same as {field}.",
    selection: {
      max: "Maximum {n} selections.",
      min: "Minimum {n} selections.",
    },
    string: {
      size: "Must be {n} characters long.",
      max: "Maximum {n} characters.",
      min: "Minimum {n} characters.",
    },
    url: "Must be a valid URL.",
    year: "Must be a valid year.",
  },

  settings: {
    title: "Settings",
    requiredFieldsNotice:
      "Marked (*) fields are required and you will not be able to purchase or create a product if they are not set.",
    headings: {
      user: "User details",
      organisation: "Organisation details",
      changePassword: "Change password",
      billing: "Billing details",
    },
  },

  toast: {
    created: "Item created.",
    deleted: "Item deleted.",
    updated: "Item updated.",
  },

  users: {
    title: "Users",
  },
};
