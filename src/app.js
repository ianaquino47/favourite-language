const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");


const client_id = "f2a259d526eb109abdc6";
const client_secret = "92777e702b85a26f073b9db147ed62bab2729b5d";

const getRepos = async (username) => {
    let repos = [];

    //initial call
    const call = await fetchApi(`https://api.github.com/users/${username}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=100`);
    const data = call.data;

    //a linkheader exists if a user has more than 100 repos
    const linkHeader = call.linkHeader;

    //get list of repos
    repos = [...data.map(repo => repo.language)]

    //check if more than 100 repos
    if (linkHeader) {
        checkForMoreRepos(linkHeader, repos);
    }

    // return list of repositories
    return(repos);
}

const checkForMoreRepos = async (linkHeader, repos) => {
    //gets how many times to loop
    const str = linkHeader.split(",")[1].split(";")[0].substr(-2,1);
    const lastPage = parseInt(str);
    const times = lastPage;

    var new_link = getLinkForNextPage(linkHeader);
    for(var i=1; i < times; i++){
        const result = await fetchApi(new_link);
        const newdata = result.data.map(repo => repo.language);
        repos.push(...newdata);
        const linkHeader = result.linkHeader;
        new_link = getLinkForNextPage(linkHeader);
    }
}

//gets the link for the next page of repos from linkheader
const getLinkForNextPage = (linkHeader) => {
    links = linkHeader.split(",");
    urls = links.map( link => {
        return {
            url: link.split(";")[0].trim().slice(1,-1),
            title: link.split(";")[1].trim()
        };
    })
    
    urls.forEach(element => {
        if (element.title.includes("next")) {
            nextLink = element.url;
        }
    });

    return(nextLink);
}

const fetchApi = async (api_link) => {
    const api_call = await fetch(`${api_link}`);    
    const data = await api_call.json();
    const linkHeader = api_call.headers.get("link");
    return { data, linkHeader};
}


const showFavLanguage = async () => {
        const languages = await getRepos(inputValue.value);

        //tallies occurence of language
        const count = await languages.reduce(function (acc, curr) {
            acc[curr] ? acc[curr]++ : acc[curr] = 1;
            return acc;
        }, {});

        //compares occurences 
        const favLanguage = Object.keys(count).reduce((a,b) => count[a] > count[b] ? a : b);
    
        nameContainer.innerHTML = `Your favourite language is <span><strong>${favLanguage}</strong></span>.`
        console.log(languages);
}

searchButton.addEventListener("click", () => {
    showFavLanguage();
})