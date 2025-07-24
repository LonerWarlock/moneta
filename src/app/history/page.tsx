import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HistoryComponent from "@/components/HistoryComponent";

const HistoryPage = async () => {
    const session = await getAuthSession();
    if(!session?.user){
        return redirect("/");
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">History</CardTitle>
                        <Link href='/dashboard' className={buttonVariants()}>
                            <LucideLayoutDashboard className="mr-2" />
                                Back to Dashboard
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="max-h-[80vh] overflow-scroll">
                    <HistoryComponent limit={100} userId={session.user.id} />
                </CardContent>
            </Card>
        </div>
    );
}

export default HistoryPage;