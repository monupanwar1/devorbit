'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
// import { useState } from 'react';

// import { useRouter } from 'next/navigation';

// import { authClient } from '@/lib/auth-client';
import { Github, Mail } from 'lucide-react';
import Link from 'next/link';
// import { Alert, AlertDescription } from './ui/alert';
// import { Spinner } from './ui/spinner';

// import { IconLoader } from '@tabler/icons-react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  // const router = useRouter();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  // async function handleSubmit(e: any) {
  //   e.preventDefault();

  //   const { data, error } = await authClient.signIn.email(
  //     {
  //       /**
  //        * The user email
  //        */
  //       email,
  //       /**
  //        * The user password
  //        */
  //       password,
  //       /**
  //        * a url to redirect to after the user verifies their email (optional)
  //        */
  //       callbackURL: '/dashboard',
  //       /**
  //        * remember the user session after the browser is closed.
  //        * @default true
  //        */
  //       rememberMe: false,
  //     },
  //     {
  //       onRequest: (ctx) => {
  //         setLoading(true);
  //       },
  //       onSuccess: (ctx) => {
  //         // redirect to the dashboard
  //         //alert("Logged in successfully");
  //       },
  //       onError: (ctx) => {
  //         // display the error message
  //         setError(ctx.error.message);
  //         setLoading(false);
  //       },
  //     },
  //   );
  // }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* {error && (
            <Alert className="mb-4 border border-red-500" variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Button
                  variant="outline"
                  className="rounded-md
            "
                >
                  <Github className="w-5 h-5 text-neutral-950" /> Github
                </Button>
                <Button variant="outline" className="rounded-md">
                  <Mail className="w-5 h-5 text-neutral-950" /> Google
                </Button>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  // onChange={(e) => setEmail(e.target.value)}
                  // value={email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  // onChange={(e) => setPassword(e.target.value)}
                  // value={password}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {/* <Button disabled={loading} type="submit" className="w-full">
                  {loading ? <Spinner /> : 'Login'}
                </Button> */}
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
