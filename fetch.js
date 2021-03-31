
const fetchGitHubUsers = async (userName) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${userName}`);
        return response.data;
    } catch (error) {
        errorMessage();
        setTimeout(cleanErrorMessage, 4000);
    }
}

const table = document.getElementById("myTable");
const getForm = document.querySelector('form');

const errorMessage = () => {
    const pError = document.createElement('p');
    pError.textContent = 'This user doesn\'t exist, try again';
    table.appendChild(pError);
}

const cleanErrorMessage = () => {
    const pError = document.querySelector('p');
    pError.remove();
}

getForm.addEventListener('submit', (e) => {
    const inputSubmitted = document.getElementById('githubuser').value;
    const userFromApi = fetchGitHubUsers(inputSubmitted);
    console.log(userFromApi)
    render(userFromApi);
    getForm.reset();
    e.preventDefault();
})

const render = async (userFromApi) => {
    const user = await userFromApi;
    userInfo = {
        userName: user.login,
        avatar: user.avatar_url,
        bio: user.bio,
        htmlUrl: user.url
    };
    const row = table.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.textContent = userInfo.userName;
    cell2.innerHTML = `<img src=${userInfo.avatar}>`;
    cell3.textContent = userInfo.bio;
    cell4.textContent = userInfo.htmlUrl;
}


