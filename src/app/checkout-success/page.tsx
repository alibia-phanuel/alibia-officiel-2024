import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout successs",
};

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1>We received your order</h1>
      <p>A summary of your order was sent to Your email address.</p>
    </main>
  );
}
