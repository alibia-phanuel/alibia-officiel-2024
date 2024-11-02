import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <div
      title="Compte PayPal en cours de vérification système indisponible pour le moment"
      className="cursor-pointer"
    >
      <Button
        disabled={loading || disabled}
        className={cn(" items-center gap-2 flex", className)}
        {...props}
      >
        {loading && <Loader2 className="size-5 animate-spin" />}
        {props.children}
      </Button>
    </div>
  );
}
