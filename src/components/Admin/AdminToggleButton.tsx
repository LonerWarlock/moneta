"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShieldCheck } from "lucide-react";

type Props = {
  isAdmin: boolean;
};

const AdminToggleButton = ({ isAdmin }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  // ❌ Hide if not admin
  if (!isAdmin) return null;

  const isShowingAdmin = pathname === "/admin";

  const handleToggle = () => {
    router.push(isShowingAdmin ? "/dashboard" : "/admin");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      title={isShowingAdmin ? "Go to Dashboard" : "Go to Admin Console"}
      className="transition-all hover:scale-110 active:scale-95"
    >
      {isShowingAdmin ? (
        <LayoutDashboard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <ShieldCheck className="h-5 w-5 text-rose-600 dark:text-rose-400" />
      )}

      <span className="sr-only">
        {isShowingAdmin ? "Dashboard" : "Admin Console"}
      </span>
    </Button>
  );
};

export default AdminToggleButton;