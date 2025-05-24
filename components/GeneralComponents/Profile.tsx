import React, { useContext } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubContext } from '@/context/GithubContext'
import Link from 'next/link'

const Profile = () => {

    const githubContext = useContext(GithubContext);

    if (!githubContext) {
        throw new Error("GithubContext is not provided");
    }

    const {
        githubUser,
    } = githubContext;
    // console.log(githubUser);

    const { name, login, avatar_url, html_url } = githubUser;

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={avatar_url || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-muted-foreground mb-4">@{login}</p>
                    <Button className="w-full">
                        <Link href={html_url} target="_blank" rel="noopener noreferrer">
                            Follow
                        </Link>
                    </Button>

                    {/* <div className="w-full space-y-3">
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>earth</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Link2 className="h-4 w-4 mr-2" />
                            <span>No website</span>
                        </div>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile