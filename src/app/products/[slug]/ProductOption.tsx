import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";


interface ProductOptionProps {
  product: products.Product;
  selectedOption: Record<string, string>;
  setSelectedOption: (option: Record<string, string>) => void;
}

export default function ProductOption({
  product,
  selectedOption,
  setSelectedOption,
}: ProductOptionProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          <legend>
            <Label asChild>
              <span>{option.name}</span>
            </Label>
          </legend>
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {option.choices?.map((choice) => (
                <div key={choice.description}>
                  <input
                    type="radio"
                    id={choice.description}
                    name={option.name}
                    value={choice.description}
                    checked={
                      selectedOption[option.name || ""] === choice.description
                    }
                    onChange={() => {
                      setSelectedOption({
                        ...selectedOption,
                        [option.name || ""]: choice.description || "",
                      });
                    }}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={choice.description}
                    className={cn(
                      "items-center flex justify-center min-w-14 cursor-pointer gap-1.5 border p-2 peer-checked:border-primary",
                      !checkInStock(product, {
                        ...selectedOption,
                        [option.name || ""]: choice.description || "",
                      }) && "opacity-50"
                    )}
                  >
                    {choice.description}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}
