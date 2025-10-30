interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
  username: string;
}

export default function ProfileHeader({ avatarUrl, name, username }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 pb-6 border-b border-border">
      <img
        src={avatarUrl}
        alt={name}
        className="w-20 h-20 rounded-full border-2 border-border"
        data-testid="img-avatar"
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground" data-testid="text-profile-name">
          {name}
        </h2>
        <p className="text-base text-muted-foreground" data-testid="text-profile-username">
          @{username}
        </p>
      </div>
    </div>
  );
}
