"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SendHorizonal, ChevronLeft, Loader2 } from "lucide-react";

const FeedbackPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [collegeType, setCollegeType] = useState("PICT");
    const [otherCollege, setOtherCollege] = useState("");
    const [gradYear, setGradYear] = useState("");

    // 1. Corrected Navigation Logic: Move side effects into useEffect[cite: 1]
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleSkip = () => {
        // Set session flag to prevent immediate redirection back from the Dashboard[cite: 1]
        sessionStorage.setItem("skipFeedback", "true");
        router.push("/dashboard");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            college: collegeType === "PICT" ? "PICT" : otherCollege,
            graduationYear: parseInt(gradYear),
            supportRating: parseInt(formData.get("supportRating") as string),
            scoresIncreased: formData.get("scoresIncreased") === "yes",
            semesterCatchUp: formData.get("semesterCatchUp") === "yes",
        };

        if (!data.college || isNaN(data.graduationYear) || isNaN(data.supportRating)) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Thank you for your feedback!");
                sessionStorage.setItem("skipFeedback", "true");
                router.push("/dashboard");
                router.refresh();
            } else {
                toast.error("Failed to save feedback. Please try again.");
            }
        } catch (error) {
            toast.error("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Prevent UI flickering while checking authentication[cite: 1]
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    // If unauthenticated, return null while the useEffect redirect happens[cite: 1]
    if (status === "unauthenticated") return null;

    return (
        <main className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Got a Minute?
                </h1>

                <Button
                    variant="ghost"
                    size="lg"
                    className="text-black dark:text-white border-2 dark:border-white border-black hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={handleSkip}
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to Dashboard
                </Button>
            </div>

            <div className="mt-8 flex justify-center">
                <Card className="w-full max-w-4xl border-2 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">A Quick Check-in</CardTitle>
                        <CardDescription className="text-base">
                            Mind sharing your thoughts? This is a super-short form that helps us make the app better for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">
                                    Which college are you from?
                                </Label>
                                <Select onValueChange={setCollegeType} defaultValue="PICT">
                                    <SelectTrigger className="h-12 text-base">
                                        <SelectValue placeholder="Select College" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PICT" className="text-base">PICT</SelectItem>
                                        <SelectItem value="OTHER" className="text-base">OTHER</SelectItem>
                                    </SelectContent>
                                </Select>
                                {collegeType === "OTHER" && (
                                    <Input
                                        placeholder="Enter your college name"
                                        value={otherCollege}
                                        onChange={(e) => setOtherCollege(e.target.value)}
                                        className="h-12 text-base"
                                        required
                                    />
                                )}
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">
                                    Which year do you pass out?
                                </Label>
                                <Select onValueChange={setGradYear} required>
                                    <SelectTrigger className="h-12 text-base">
                                        <SelectValue placeholder="Select Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["2026", "2027", "2028", "2029", "2030"].map((year) => (
                                            <SelectItem key={year} value={year} className="text-base">{year}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-semibold block">
                                    On a scale of 1-10, how much do you support this initiative?
                                </Label>
                                <RadioGroup name="supportRating" className="flex flex-wrap gap-6 mt-4" required>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <div key={num} className="flex items-center space-x-2">
                                            <RadioGroupItem value={num.toString()} id={`r${num}`} className="w-4 h-4" />
                                            <Label htmlFor={`r${num}`} className="text-base cursor-pointer">{num}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-semibold block">
                                    Did your academic scores increase after starting to use the app?
                                </Label>
                                <RadioGroup name="scoresIncreased" className="flex space-x-8 mt-2" required>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="yes" id="s-yes" className="w-5 h-5" />
                                        <Label htmlFor="s-yes" className="text-base cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="no" id="s-no" className="w-5 h-5" />
                                        <Label htmlFor="s-no" className="text-base cursor-pointer">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-semibold block leading-tight">
                                    Did the notes help you catch up to the entire semester&apos;s worth of content in a few days?
                                </Label>
                                <RadioGroup name="semesterCatchUp" className="flex space-x-8 mt-2" required>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="yes" id="c-yes" className="w-5 h-5" />
                                        <Label htmlFor="c-yes" className="text-base cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="no" id="c-no" className="w-5 h-5" />
                                        <Label htmlFor="c-no" className="text-base cursor-pointer">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="flex gap-4 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12 text-base"
                                    onClick={handleSkip}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 text-base bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <SendHorizonal className="w-4 h-4 mr-2" />
                                    )}
                                    Submit Review
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default FeedbackPage;