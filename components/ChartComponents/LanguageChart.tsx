import React, { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LanguagesChart } from "@/components/languages-chart"
import { GithubContext } from '@/context/GithubContext';

type LanguageStats = {
    label: string;
    value: number; // will now hold percentage
    stars: number;
};

const LanguageChart = () => {

    const githubContext = useContext(GithubContext);
    const { repos } = githubContext || { repos: [] };

    let languages = repos.reduce<Record<string, LanguageStats>>((total, item) => {
        const { language, stargazers_count } = item;
        if (!language) return total;

        if (!total[language]) {
            total[language] = { label: language, value: 1, stars: stargazers_count };
        } else {
            total[language].value += 1;
            total[language].stars += stargazers_count;
        }

        return total;
    }, {});

    // Total count of repos with a language
    const totalLanguageRepos = Object.values(languages).reduce(
        (sum, lang) => sum + lang.value,
        0
    );

    // Convert value to percentage (keep 2 decimal places)
    Object.values(languages).forEach(lang => {
        lang.value = parseFloat(((lang.value / totalLanguageRepos) * 100).toFixed(2));
    });

    // Get top 5 by percentage
    const mostUsed = Object.values(languages)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    // console.log(mostUsed);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Languages</CardTitle>
                <CardDescription>Code distribution by language</CardDescription>
            </CardHeader>
            <CardContent>
                <LanguagesChart data={mostUsed} />
            </CardContent>
        </Card>
    )
}

export default LanguageChart