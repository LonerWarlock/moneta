import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "@/components/SignInButton";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import { Wrench } from "lucide-react";


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
            Notes and More...
{/*      
   return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
       <Card className="w-[350px] text-center p-4">
         <CardHeader className="flex flex-col items-center justify-center pb-4">
           <Wrench className="w-10 h-10 text-destructive mb-3 animate-spin-slow" />
           <CardTitle className="text-3xl font-bold text-destructive">Site Under Maintenance</CardTitle>
           <CardDescription className="text-base mt-2">
             This service is temporarily unavailable.
*/}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <SignInButton text="Sign In With Google" image="/google.png"/>
{/* 
        <CardContent className="space-y-4 px-4">
          <p className="text-sm text-muted-foreground">
            In the meantime, you can access all the notes here:
          </p>
          <Link
            href="/notes"
            // Using an emerald color to highlight the Notes link
            className={cn(buttonVariants({ size: "lg" }), "w-full mt-2 bg-emerald-600 hover:bg-emerald-700")}
          >
            SPPU IT-2019 Notes
          </Link>
*/}
        </CardContent>
      </Card>
    </div>
  );
}