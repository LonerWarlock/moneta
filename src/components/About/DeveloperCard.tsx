// src/components/About/DeveloperCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Instagram, Mail } from "lucide-react"; 
import Image from 'next/image'; 
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; 

type Contributor = {
    name: string;
    role: string;
    email: string;
    image: string; 
    githubLink: string; 
    linkedinLink: string; 
    instagramLink: string; 
};

const DeveloperCard = ({ developer }: { developer: Contributor }) => {
    // Helper to get initials for AvatarFallback
    const initials = developer.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    return (
        <Card className="flex flex-col">
            {/* MODIFIED: Reduced vertical padding using py-2 (default p-4 was too large) */}
            <CardHeader className="flex flex-row items-start space-x-4 px-4 py-3 sm:px-6 sm:py-4"> 
                
                {/* Image/Avatar on the LEFT - Removed mt-1 for slightly tighter alignment */}
                <Avatar className="h-24 w-24 shrink-0"> 
                    {developer.image ? (
                        <div className="relative h-full w-full aspect-square">
                            <Image 
                                fill 
                                src={developer.image} 
                                alt={`Photo of ${developer.name}`} 
                                className='object-cover' 
                            />
                        </div>
                    ) : (
                        <AvatarFallback>
                            {/* Fallback to initials */}
                            {initials}
                        </AvatarFallback>
                    )}
                </Avatar>
                
                {/* Information on the RIGHT */}
                <div className="flex flex-col flex-grow ml-2">
                    <CardTitle className="text-xl">{developer.name}</CardTitle>
                    {/* MODIFIED: Removed mb-3 to tighten space between role and social icons */}
                    <CardDescription>{developer.role}</CardDescription> 
                    
                    {/* Social Links (4 Emoticons) BELOW Name/Role */}
                    <div className="flex items-center space-x-5 mt-3"> 
                        {/* Mail Link */}
                        {developer.email && (
                            <a 
                                href={`mailto:${developer.email}`} 
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        )}

                        {/* GitHub Link */}
                        {developer.githubLink && (
                            <a 
                                href={developer.githubLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        )}
                        
                        {/* LinkedIn Link */}
                        {developer.linkedinLink && (
                            <a 
                                href={developer.linkedinLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        )}
                        
                        {/* Instagram Link */}
                        {developer.instagramLink && (
                            <a 
                                href={developer.instagramLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        )}
                    </div>
                </div>
                
            </CardHeader>
            {/* CardContent is hidden */}
            <CardContent className="hidden" /> 
        </Card>
    );
};

export default DeveloperCard;