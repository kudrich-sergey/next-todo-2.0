import { useQuery } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useRandomImages() {
  const { data, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: () => Api.imageService.getRandomImages(),
  });

  return { images: data, isLoading };
}
