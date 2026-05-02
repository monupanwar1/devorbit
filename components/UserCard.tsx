'use client';

import { Button } from '@base-ui/react';
import {
  FolderGit2,
  Link as LinkIcon,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';

import { GithubUser } from '@/types/type';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

interface UserCardProps {
  user?: GithubUser | null;
}

export default function UserCard({ user }: UserCardProps) {
  // ✅ Handle null / undefined safely
  if (!user) {
    return (
      <section className="w-full">
        <Card className="mx-auto w-full max-w-7xl">
          <CardHeader>
            <CardTitle>No user found</CardTitle>
            <CardDescription>
              Please search for a GitHub username above.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    );
  }

  return (
    <section className="shadow-t-2xl mx-auto w-full max-w-7xl shadow-neutral-900">
      <Card className="p-4 shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-x-4">
          <div className="flex items-center justify-between space-x-4 md:space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar_url} alt={user.name ?? 'User'} />
              <AvatarFallback>
                {user.login?.[0]?.toUpperCase() ?? '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">
                {user.name ?? 'Unknown User'}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                @{user.login}
              </CardDescription>
            </div>
          </div>

          <div>
            <Button className="bg-accent flex items-center justify-center rounded-md px-4 py-2 font-medium hover:bg-gray-200">
              ✨ Summarize
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {user.bio && (
            <p className="text-muted-foreground text-sm">{user.bio}</p>
          )}

          {/* Location / Email / Blog */}
          <div className="text-muted-foreground grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2">
                <LinkIcon size={16} />
                <a
                  href={
                    user.blog.startsWith('http')
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:underline"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          {/* Followers / Following / Repos */}
          <div className="mt-3 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>
                <strong>{user.followers ?? 0}</strong> followers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>
                <strong>{user.following ?? 0}</strong> following
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 size={16} />
              <span>
                <strong>{user.public_repos ?? 0}</strong> repos
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
