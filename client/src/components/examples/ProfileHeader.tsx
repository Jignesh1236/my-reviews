import ProfileHeader from '../ProfileHeader';

export default function ProfileHeaderExample() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-md border border-card-border">
      <ProfileHeader
        avatarUrl="https://avatars.githubusercontent.com/u/186457314?v=4"
        name="Jignesh D Maru"
        username="jignesh1236"
      />
    </div>
  );
}
