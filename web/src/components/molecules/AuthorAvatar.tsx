// Author avatar component
export const AuthorAvatar = ({ name, size = 8 }: { name: string; size?: number }) => {
  // Generate color based on name
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-medium text-xs w-${size} h-${size}`}
      style={{ backgroundColor: stringToColor(name) }}
    >
      {initials}
    </div>
  );
};


