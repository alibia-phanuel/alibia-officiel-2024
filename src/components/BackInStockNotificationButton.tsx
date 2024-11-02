import { products } from "@wix/stores";
import { Button, ButtonProps } from "./ui/button";
import { useCreateBackInStockNotificationRequst } from "@/hooks/back-in-stock";
import { z } from "zod";
import { requiredString } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { env } from "@/env";
const formSchema = z.object({
  email: requiredString.email(),
});
type FormeValues = z.infer<typeof formSchema>;
interface BackInStockNotificationButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FormeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useCreateBackInStockNotificationRequst();
  async function onSubmit({ email }: FormeValues) {
    mutation.mutate({
      email,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      product,
      selectedOptions,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>
          Me notifier lorsque cet article sera disponible
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>notifier la disponible de cet article</DialogTitle>
          <DialogDescription>
            Saisissez votre adresse électronique et nous vous préviendrons
            lorsque ce produit sera à nouveau en stock.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={mutation.isPending}>
              Me notifier
            </LoadingButton>
          </form>
        </Form>
        {mutation.isSuccess && (
          <div className="py-2.5 text-green-500">
            Nous vous remercions ! Nous vous informerons lorsque ce produit sera
            à nouveau en stock.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
