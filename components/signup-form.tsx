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
// import { Github } from '@deemlol/next-icons';
// import { useState } from 'react';

// import { useRouter } from 'next/navigation';

// import { authClient } from '@/lib/auth-client';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from './ui/alert';
// import { Spinner } from './ui/spinner';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  // const router = useRouter();

  // const [fullname, setFullname] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  // async function handleSubmit(e: any) {
  //   e.preventDefault();

  //   const { data, error } = await authClient.signUp.email(
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
  //        * remember the user session after the browser is closed.
  //        * @default true
  //        */
  //       name: fullname,
  //     },
  //     {
  //       onRequest: (ctx) => {
  //         setLoading(true);
  //       },
  //       onSuccess: (ctx) => {
  //         // redirect to the dashboard
  //         //alert("Logged in successfully");
  //         router.push('/dashboard');
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
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
              <div className="grid gap-3">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  // onChange={(e) => setFullname(e.target.value)}
                  // value={fullname}
                  id="name"
                  type="text"
                  placeholder="Achour Meguenni"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  // onChange={(e) => setEmail(e.target.value)}
                  // value={email}
                  id="email"
                  type="email"
                  placeholder="me@example.com"
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
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="underline underline-offset-4">
                Login
              </Link>
            </div>
            <div className="flex flex-col mt-2">
              {/* <Button disabled={loading} type="submit" className="w-full">
                {loading ? <Spinner /> : 'Sign Up'}
              </Button> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
