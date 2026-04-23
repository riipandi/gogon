import { Text } from 'react-email'
import { BaseTemplate } from '../components/base-layout'
import { Button } from '../components/button'
import { CardHeader } from '../components/card'
import { sharedPreviewProps, sharedTemplateProps } from '../constants'

interface EmailVerificationData {
  userFullName: string
  verificationLink: string
}

interface EmailVerificationProps {
  logoURL: string
  appName: string
  data: EmailVerificationData
}

export const EmailVerification = ({ logoURL, appName, data }: EmailVerificationProps) => (
  <BaseTemplate logoURL={logoURL} appName={appName}>
    <CardHeader title='Email Verification' />

    <Text>
      Hello {data.userFullName}, <br />
      Click the button below to verify your email address for {appName}. This link will expire in 24
      hours.
      <br />
    </Text>

    <Button href={data.verificationLink}>Verify</Button>
  </BaseTemplate>
)

export default EmailVerification

EmailVerification.TemplateProps = {
  ...sharedTemplateProps,
  data: {
    userFullName: '{{.Data.UserFullName}}',
    verificationLink: '{{.Data.VerificationLink}}'
  }
}

EmailVerification.PreviewProps = {
  ...sharedPreviewProps,
  data: {
    userFullName: 'John Doe',
    verificationLink: 'https://localhost:3000/user/verify-email?code=abcdefg12345'
  }
}
