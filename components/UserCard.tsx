'use client';

import { AvatarFallback } from '@radix-ui/react-avatar';

import { Avatar, AvatarImage } from './ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';

export default function UserCard() {
  return (
    <section>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg"
                alt="@arihantcodes"
              />
              <AvatarFallback>dv</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Username</CardTitle>
              <CardDescription>@devorbit</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm">hello@arihant.us</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Location</Label>
              <p className="text-sm">San Francisco, CA</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Bio</Label>
              <p className="text-sm">
                Software developer passionate about creating user-friendly
                applications.
              </p>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </CardFooter> */}
      </Card>
    </section>
  );
}
