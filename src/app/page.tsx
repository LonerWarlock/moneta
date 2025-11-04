// import { Button } from "@/components/ui/button";
import SignInButton from "@/components/SignInButton";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";

// import { prisma } from "@/lib/db";

export default async function Home() {
  
  const session = await getAuthSession();
  if(session?.user) {
    return redirect("/dashboard");
  }
  
  return (<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <Card className="w-[300px]">
      <CardHeader className="text-center">
        <CardTitle>Moneta</CardTitle>
        <CardDescription>
          Moneta is a content distribution app that helps you learn and retain knowledge through interactive quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <SignInButton text="Sign In With Google" image="/google.png"/>  
      </CardContent>
    </Card>
  </div>);
}