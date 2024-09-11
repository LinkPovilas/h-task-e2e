import { urlPath } from 'data/ui/url-path';
import { test as setup } from 'fixtures';

setup.fixme('authenticate', async ({ goToUrl }) => {
  await goToUrl(urlPath.homePage);
  // TODO: fix authentication setup
  // await assertTextIsVisible(alertMessage.signInOrSignUp);
  // await assertRememberMeIsNotChecked();
  // await signIn({ email: env.USER_EMAIL, password: env.USER_PASSWORD });
  // await assertTextIsVisible(noticeMessage.signedInSuccessfully);
  // await saveStorageState(authFilePath);
});
