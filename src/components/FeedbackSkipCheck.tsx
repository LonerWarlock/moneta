"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackSkipCheck({ hasGivenFeedback }: { hasGivenFeedback: boolean }) {
  const router = useRouter();

  useEffect(() => {
    // If the user has already submitted feedback in the database, stop here.
    if (hasGivenFeedback) return;

    // Check sessionStorage to see if they've already encountered the prompt this session.
    const sessionSeen = sessionStorage.getItem("moneta-feedback-session-seen");

    if (!sessionSeen) {
      // Mark as seen for this session immediately so redirects don't loop[cite: 1].
      sessionStorage.setItem("moneta-feedback-session-seen", "true");
      router.push("/feedback");
    }
  }, [hasGivenFeedback, router]);

  return null;
}