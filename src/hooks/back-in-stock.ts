import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import {
  BackInStockNotificationREquestValues,
  createBackInStockNotificationREquest,
} from "@/wix-api/backInStockNotifications";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useCreateBackInStockNotificationRequst() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (value: BackInStockNotificationREquestValues) =>
      createBackInStockNotificationREquest(wixBrowserClient, value),
    onError(error) {
      console.log(error);
      if (
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast({
          variant: "destructive",
          description: "You are already subscirbed to this product.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again",
        });
      }
    },
  });
}
