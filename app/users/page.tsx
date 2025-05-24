"use client"

import { Search, Github, Star, GitFork, FileCode2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { StarsChart } from "@/components/ChartComponents/stars-chart"
import { PopularityChart } from "@/components/GeneralComponents/popularity-chart"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAvatar } from "./UserAvatar"
import { GithubContext } from "@/context/GithubContext"
import { useContext, useState } from "react"
import LanguageChart from "@/components/ChartComponents/LanguageChart"
import Stats from "@/components/GeneralComponents/Stats"
import Profile from "@/components/GeneralComponents/Profile"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { useCallback } from "react"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import { useTheme } from 'next-themes'


export default function GitHubProfile() {
  const [user, setUser] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser(e.target.value);
  }, []);

  const githubContext = useContext(GithubContext);

  if (!githubContext) {
    throw new Error("GithubContext is not provided");
  }

  const {
    requests,
    searchGithubUser,
    repos,
    isLoading
  } = githubContext;

  // useEffect(() => {
  //   console.log('loading', isLoading);
  // }, [isLoading]); // Only logs when `isLoading` changes

  const simplifyRepos = (repos: any[]) => {
    return repos.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      description: repo.description,
      updatedAt: repo.updated_at,
    }));
  };

  const simplifiedRepos = simplifyRepos(repos);


  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 700); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredRepos = simplifiedRepos.filter((repo) =>
    repo.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
  // console.log(repos[0]);

  // stars and forks

  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = { label: name, value: forks };
    return total;
  }, {
    stars: {},
    forks: {}
  });

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  const { theme } = useTheme()

  const loaderColor = theme === 'dark' ? '#ffffff' : '#000000'

  return (

    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-4">
            <Github className="h-6 w-6" />
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                value={user}
                className="pl-10 pr-4 py-2 w-full"
                placeholder="Search"
                onChange={handleChange}
              />
              {user && (
                <Search onClick={() => user && searchGithubUser(user)} className=" cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground h-7 w-7 p-1 border rounded-lg" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground">Requests: {requests} / 60</div>
            <ModeToggle />
            <UserAvatar />
          </div>
        </div>
      </header>
      {isLoading ? (<div className="w-screen h-[90vh] flex items-center justify-center"><BarLoader  color={loaderColor} speedMultiplier={2} /></div>) :
        <main className="container px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Profile Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <Profile />
              <Stats />
              <LanguageChart />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="repositories">Repositories</TabsTrigger>
                  {/* <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger> */}
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Repositories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {simplifiedRepos.slice(0, 4).map((repo, index) => (
                          <RepoCard
                            key={index}
                            name={repo.name}
                            description={repo.description}
                            language={repo.language}
                            stars={repo.stars}
                            forks={repo.forks}
                            url={repo.url}
                          />
                        ))}
                        {/* <RepoCard
                          name="Twitter-clone-using-TailwindCSS"
                          description="A Twitter clone built with TailwindCSS"
                          language="JavaScript"
                          stars={0}
                          forks={0}
                        />
                        <RepoCard
                          name="portfolio-website"
                          description="My personal portfolio website"
                          language="TypeScript"
                          stars={0}
                          forks={0}
                        /> */}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Stars</CardTitle>
                        <CardDescription>Distribution of stars across Repositories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <StarsChart data={stars} />
                      </CardContent>
                      <CardFooter className="flex items-center justify-center gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                          Repositories
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Forks</CardTitle>
                        <CardDescription>Forks per repository</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <PopularityChart data={forks} />
                      </CardContent>

                    </Card>
                  </div>

                  {/* <Card>
                    <CardHeader>
                      <CardTitle>Contribution Activity</CardTitle>
                      <CardDescription>Recent contributions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                          <Code className="h-12 w-12 mb-4 opacity-20" />
                          <p>No recent activity</p>
                          <p className="text-sm">Contributions will appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}
                </TabsContent>

                <TabsContent value="repositories" className="space-y-6">
                  <Card className="h-[82vh] overflow-y-scroll">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="mb-3">Repositories</CardTitle>
                      </div>
                      <div className="flex items-center mt-2">
                        <Input
                          placeholder="Find a repository..."
                          className="max-w-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredRepos.map((repo) => (<>
                          <RepoListItem
                            name={repo.name}
                            description={repo.description}
                            language={repo.language}
                            stars={repo.stars}
                            forks={repo.forks}
                            updated={repo.updatedAt}
                            url={repo.url}
                          />
                          <Separator />
                        </>))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* <TabsContent value="projects">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <p>No projects yet</p>
                        <p className="text-sm">Create a new project to organize your work</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <p>No activity yet</p>
                        <p className="text-sm">Activity will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent> */}
              </Tabs>
            </div>
          </div>
        </main>
      }
    </div>
  )
}

function RepoCard({
  name,
  description,
  language,
  stars,
  forks,
  url
}: {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-2">
            <FileCode2 className="h-4 w-4 mr-2 text-muted-foreground" />
            <h3 className="font-medium text-primary truncate">
              <Link href={url} target="_blank" className="hover:underline">
                {name}
              </Link>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <span
                className={`h-3 w-3 rounded-full mr-2 ${language === "JavaScript"
                  ? "bg-yellow-400"
                  : language === "TypeScript"
                    ? "bg-blue-400"
                    : language === "HTML"
                      ? "bg-red-400"
                      : "bg-gray-400"
                  }`}
              ></span>
              <span className="text-xs text-muted-foreground">{language}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="h-3 w-3 mr-1" />
                <span>{stars}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <GitFork className="h-3 w-3 mr-1" />
                <span>{forks}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RepoListItem({
  name,
  description,
  language,
  stars,
  forks,
  updated,
  url,
}: {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  updated: string
  url: string
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-primary">
            <Link href={url} target="_blank" className="hover:underline">
              {name}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <span
                className={`h-3 w-3 rounded-full mr-2 ${language === "JavaScript"
                  ? "bg-yellow-400"
                  : language === "TypeScript"
                    ? "bg-blue-400"
                    : language === "HTML"
                      ? "bg-red-400"
                      : "bg-gray-400"
                  }`}
              ></span>
              <span className="text-xs text-muted-foreground">{language}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="h-3 w-3 mr-1" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <GitFork className="h-3 w-3 mr-1" />
              <span>{forks}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(updated), { addSuffix: true })}
            </div>
          </div>
        </div>
        {/* <Button variant="outline" size="sm">
          <Star className="h-3 w-3 mr-1" />
          Star
        </Button> */}
      </div>
    </div>
  )
}
