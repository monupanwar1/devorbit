'use client';

import { GithubUser } from '@/actions/github';
import {
  FolderGit2,
  Link as LinkIcon,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export default function UserCard({ user }: { user?: GithubUser | null }) {
  // ✅ Safely handle when user is undefined or null

  if (!user) {
    return (
      <section className="w-full">
        <Card className="w-full max-w-7xl mx-auto">
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
    <section className="w-full max-w-7xl mx-auto">
      <Card className="p-4 shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={user.avatar_url}
              alt={user.name[0]?.toUpperCase()}
            />
            <AvatarFallback>
              {user?.login?.[0]?.toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">
              {user?.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              @{user?.login}
            </CardDescription>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {user?.bio && (
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
            {user?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user?.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            )}
            {user?.blog && (
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
                  className="hover:underline truncate"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 text-sm mt-3">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>
                <strong>{user?.followers ?? 0}</strong> followers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>
                <strong>{user?.following ?? 0}</strong> following
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 size={16} />
              <span>
                <strong>{user?.public_repos ?? 0}</strong> repos
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
