const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");


const client_id = "f2a259d526eb109abdc6";
const client_secret = "92777e702b85a26f073b9db147ed62bab2729b5d";

const getRepos = async (username) => {
    //list of all user repositories
    let repos = [];

    //initial api call
    const api_call = await fetch(`https://api.github.com/users/${username}/repos?client_id=${client_id}&client_secret=${client_secret}&per_page=100`); 
    //convert to json
    const data = await api_call.json();
    //linkHeader (exists if more than 100 repositories)
    const linkHeader = api_call.headers.get("link");

    //get list of repos
    repos = [...data.map(repo => repo.language)]

    //check if more than 100 repos
    checkForMoreRepos(linkHeader, repos);

    //return list of repositories
    return(repos);
}

const checkForMoreRepos = (linkHeader, repos) => {
    if (linkHeader) {
        const new_link = getLinkForNextPage(linkHeader);
        fetchApi(new_link).then((res) => {
            const newdata = res.data.map(repo => repo.language);
            repos.push(...newdata);
        })
    };
}

const getLinkForNextPage = (linkHeader) => {
    links = linkHeader.split(",");
    urls = links.map( link => {
        return {
            url: link.split(";")[0].trim().slice(1,-1),
            title: link.split(";")[1].trim()
        };
    })

    urls.forEach(element => {
        if (!element.title.includes("next")) {
            return;
        }
        nextLink = element.url;
    });

    if (typeof nextLink !== 'undefined') {
        return(nextLink);
    };
}

const fetchApi = async (api_link) => {
    const api_call = await fetch(`${api_link}`);    
    const data = await api_call.json();
    return { data }
}


const showFavLanguage = async () => {
        const res = await getRepos(inputValue.value);
        console.log(res);
        const count = await res.reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
    
            return acc;
        }, {});

    
        const favLanguage = Object.keys(count).reduce((a,b) => count[a] > count[b] ? a : b);
    
        nameContainer.innerHTML = `Your favourite language is <span><strong>${favLanguage}</strong></span>.`
}

searchButton.addEventListener("click", () => {
    showFavLanguage();
})