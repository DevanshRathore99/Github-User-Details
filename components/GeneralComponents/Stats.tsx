import React, { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, FileCode2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GithubContext } from '@/context/GithubContext'

const Stats = () => {

    const githubContext = useContext(GithubContext);

    if (!githubContext) {
      throw new Error("GithubContext is not provided");
    }
  
    const {
      githubUser,
    } = githubContext;
  
    const {
      public_repos,
      followers,
      following,
      public_gists    } = githubUser;


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FileCode2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Repositories</span>
                    </div>
                    <Badge variant="secondary">{public_repos}</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Followers</span>
                    </div>
                    <Badge variant="secondary">{followers}</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Following</span>
                    </div>
                    <Badge variant="secondary">{following}</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Gists</span>
                    </div>
                    <Badge variant="secondary">{public_gists}</Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export default Stats