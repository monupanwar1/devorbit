'use client';

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

// 🔹 Define the props cleanly — can also be imported from your actions
export interface GithubUser {
  avatar_url: string;
  login: string;
  html_url: string;
  email: string | null;
  blog: string | null;
  location: string | null;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface UserCardProps {
  user?: GithubUser | null;
}

export default function UserCard({ user }: UserCardProps) {
  // ✅ Handle null / undefined safely
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
            <AvatarImage src={user.avatar_url} alt={user.name ?? 'User'} />
            <AvatarFallback>
              {user.login?.[0]?.toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">
              {user.name ?? 'Unknown User'}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              @{user.login}
            </CardDescription>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {user.bio && (
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          )}

          {/* Location / Email / Blog */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
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
                  className="hover:underline truncate"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          {/* Followers / Following / Repos */}
          <div className="flex flex-wrap gap-6 text-sm mt-3">
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
