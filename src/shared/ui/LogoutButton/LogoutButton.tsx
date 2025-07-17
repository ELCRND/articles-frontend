import { useRouter } from "next/navigation";

import { logout } from "@/shared/lib/utils/logout";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";

type Props = {
  className?: string;
};

export const LogoutButton = ({ className }: Props) => {
  const router = useRouter();
  return (
    <button
      className={className}
      onClick={() => {
        logout();
        router.replace("/auth");
      }}
    >
      <LogoutIcon />
    </button>
  );
};
