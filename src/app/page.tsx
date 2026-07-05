import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "@/components/SignInButton";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { Wrench } from "lucide-react";

export default async function Home() {
    
  // return redirect("/dashboard");

  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader className="text-center">
          <CardTitle>Moneta</CardTitle>
          <CardDescription>
            Notes and More...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <SignInButton text="Sign In With Google" image="/google.png" />
        </CardContent>
      </Card>
    </div>
  );
}
