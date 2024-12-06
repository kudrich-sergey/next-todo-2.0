import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useLogout() {
  const router = useRouter();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => Api.authService.logout(),
    onSuccess: () => router.push("/auth"),
  });

  return { logout };
}
