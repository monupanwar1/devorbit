'use client';

import Link from 'next/link';

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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
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
            <div className="mt-2 flex flex-col">
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
