export const availableLanguages = ['he', 'en'];

export let currentLanguage = 'en'; // Default language is English
export let currentTextDirection = 'ltr';

export const setLanguage = (language) => {
    currentLanguage = language;
};
export const diraction  = {
  dir: {
    he: 'rtl',
    en: 'ltr',
  },
}
export const translations  = {
      WelcomeLogin: {
        he: 'שלום , ',
        en: 'Welcome , ',
      },
      Guest: {
        he: 'אורח',
        en: 'Guest',
      },
      Email: {
        he: 'מייל',
        en: 'Email',
      },
      Start: {
        he: 'התחל',
        en: 'Start',
      },
      Welcome1: {
        he: `חקור את היופי`,
        en: `Explore beauty`,
      },
      Welcome2: {
        he: `דרך עינייך`,
        en: `through your eyes.`,
      },
      Password: {
        he: 'סיסמא',
        en: 'Password',
      },
      Admin: {
        he: 'אדמין',
        en: 'Admin',
      },
      About: {
        he: 'אודות',
        en: 'About',
      },
      CreateAccount: {
        he: 'יצירת חשבון',
        en: 'Create Account',
      },
      EmailRegistration: {
        he: 'או הכנס אימייל להרשמה',
        en: 'or use your email for registration',
      },
      UseYourAccount: {
        he: 'או השתמש בחשבון שלך',
        en: 'or use your account',
      },
      SignUp: {
        he: 'הירשם',
        en: 'Sign Up',
      },
      SignIn: {
        he: 'היכנס',
        en: 'Sign In',
      },
      ForgetPassword: {
        he: '? שכחת את הסיסמא',
        en: 'Forgot your password ?',
      },
      SendVerification: {
        he: 'אפס סיסמא',
        en: 'Send verification',
      },
      WelcomeBack: {
        he: '! ברוכים הבאים',
        en: 'Welcome Back !',
      },
      LoginPersonalInfo: {
        he: 'כדי לשמור על קשר איתנו, התחבר/י עם המידע האישי שלך',
        en: 'To keep connected with us please login with your personal info',
      },
      HelloFriend: {
        he: '! שלום לך',
        en: 'Hello, Friend!',
      },
      PersonalDetails: {
        he: 'הזינו את פרטיכם האישיים והתחילו איתנו את המסע שלכם',
        en: 'Enter your personal details and start journey with us',
      },
      //Hello, Friend!
};