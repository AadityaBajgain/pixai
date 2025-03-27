import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'


const SignInPage = () => {
  return (
    <div>
      <SignIn signUpUrl='/sign-up'/>
    </div>
  )
}

export default SignInPage
