// src/app/about/page.tsx
import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeveloperCard from "@/components/About/DeveloperCard";
import { BookOpen, Code, Lightbulb, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "About Moneta | Quiz and Notes App",
    description: "Learn about the Moneta development team, the mission, and the contributors behind the SPPU IT-2019 notes.",
};

// Define a common type for Developers and Contributors
type Contributor = {
    name: string;
    role: string; 
    email: string;
    image: string; // <-- NEW: Added image property
    githubLink: string;
    linkedinLink: string;
    instagramLink: string;
};

const developers: Contributor[] = [
    {
        name: "Soham Phatak",
        role: "Lead Developer",
        email: "phataksoham2109@gmail.com",
        // Placeholder image URL - REPLACE THIS with the actual image link
        image: "/soham.jpg", 
        githubLink: "https://github.com/LonerWarlock",
        linkedinLink: "https://www.linkedin.com/in/soham-phatak",
        instagramLink: "https://www.instagram.com/sohamphatak21/",
    },
    {
        name: "Prafulla Bhand",
        role: "Frontend Developer",
        email: "bhandprafulla@gmail.com",
        // Placeholder image URL - REPLACE THIS with the actual image link
        image: "/prafulla.jpg", 
        githubLink: "https://github.com/Prafullabhand",
        linkedinLink: "https://www.linkedin.com/in/prafulla-bhand-508257290?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagramLink: "https://www.instagram.com/_prafulla29_xs/",
    }
];

const noteContributors: Contributor[] = [
    { 
        name: "Soham Phatak", 
        role: "SPPU IT-2019 Notes", 
        email: "phataksoham2109@gmail.com",
        image: "/soham.jpg",
         githubLink: "https://github.com/LonerWarlock",
        linkedinLink: "https://www.linkedin.com/in/soham-phatak",
        instagramLink: "https://www.instagram.com/sohamphatak21/",
    },
];

const AboutPage = async () => { 
    //const session = await getAuthSession();
    // if (!session?.user) {
    //     return redirect("/");
    // }
    
    return (
        <main className="p-8 mx-auto max-w-6xl">
            <div className="flex items-center justify-between pb-4 border-b-2 border-dashed mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    About Moneta
                </h1>
                <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>

            {/* Section 1: Our Mission */}
            <section className="mb-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-2xl">
                            <BookOpen className="h-6 w-6" />
                            <span>Our Mission</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">
                            Moneta is designed to be your comprehensive study companion, blending interactive quizzes with curated academic resources. Our goal is to help students learn and retain knowledge effectively and quickly.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <Separator className="my-8" />

            {/* Section 2: The Developers */}
            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-6 flex items-center space-x-2">
                    <Code className="h-7 w-7 text-green-500" />
                    <span>Our Creators</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {developers.map((dev, index) => (
                        <DeveloperCard key={index} developer={dev} />
                    ))}
                </div>
            </section>

            <Separator className="my-8" />

            {/* Section 3: Note Contributors */}
            <section>
                <h2 className="text-3xl font-semibold mb-6 flex items-center space-x-2">
                    <Heart className="h-7 w-7 text-red-500" />
                    <span>Our Note-masters</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noteContributors.map((contributor, index) => (
                        <DeveloperCard key={index} developer={contributor} />
                    ))}
                </div>
                <div className="text-center pt-8 text-muted-foreground">
                    A massive thank you to all contributors who share their resources with the community!
                </div>
            </section>
        </main>
    );
};

export default AboutPage;