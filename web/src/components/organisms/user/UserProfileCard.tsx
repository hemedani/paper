import { userSchema } from "@/types/declarations/selectInp";
import ProfileHeader from "./profile/ProfileHeader";
import PersonalInfo from "./profile/PersonalInfo";
import ContactInfo from "./profile/ContactInfo";
import SummarySection from "./profile/SummarySection";

interface UserProfileCardProps {
  user: userSchema;
  showAvatar?: boolean;
  className?: string;
  isAdminContext?: boolean;
}

const UserProfileCard = ({
  user,
  showAvatar = true,
  className = "",
  isAdminContext = false,
}: UserProfileCardProps) => {
  // Determine the edit links based on context
  const pureEditLink = isAdminContext
    ? `/admin/users/edit/pure/${user._id}`
    : "/user/edit/pure";
  const relationEditLink = isAdminContext
    ? `/admin/users/edit/relation/${user._id}`
    : "/user/edit/relation";

  return (
    <div className={`space-y-4 ${className}`}>
      <ProfileHeader
        user={user}
        showAvatar={showAvatar}
        pureEditLink={pureEditLink}
        relationEditLink={relationEditLink}
      />

      <div className="rounded-[24px] border border-[#F0F0F2] bg-white p-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PersonalInfo user={user} />
          <ContactInfo user={user} />
          <SummarySection user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
