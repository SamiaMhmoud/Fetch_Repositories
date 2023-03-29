//Main Variables
let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    showData= document.querySelector(".show-data");

getButton.onclick = () =>{
    gitrepos();
}


function gitrepos() {
    //If value is impty
    if(theInput.value === "") {
        showData.innerHTML = `<span> Please Write Githab Username.</span>`
    }else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((data) => {
            //Empty The Container
            showData.innerHTML = '';
    
            //Loop on Repositories
            data.forEach(repo => {
                console.log(repo);
                //Create Main Div
                let mainDiv = document.createElement("div");
                let buttonContainer = document.createElement("div");
                //Create Repo Name Text 
                let repoText = document.createTextNode(repo.name);
                //Append Repo Text To Main Div 
                mainDiv.appendChild(repoText);
                //Create Repo URL 
                let repoUrl = document.createElement("a"); 
                //Create Repo URL Text 
                let theUrlText = document.createTextNode("Visit");
                //Append Repo URL Text To Repo URL
                repoUrl.appendChild(theUrlText);
                //Add The Hyper Text Refrance
                repoUrl.href = `https://github.com//${theInput.value}/${repo.name}`;
                //Set Attribute Blank
                repoUrl.setAttribute('target', '_blank');
                //Append Repo URL To Button Container
                buttonContainer.appendChild(repoUrl);

                //Create Count Span
                let starsSpan = document.createElement('span');
                //Create The Stars Count Text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                //Append Stars Text To Stars Span
                starsSpan.appendChild(starsText);
                //Append Stars Span To Button Container
                buttonContainer.appendChild(starsSpan);

                //Add Class Name To Button Container
                buttonContainer.className = 'button-box';
                //Append Button Container To Main Div
                mainDiv.appendChild(buttonContainer);
                //Add Class Name To Main Div
                mainDiv.className = 'repo-box';
                //Append Main Div To Show Data
                showData.appendChild(mainDiv);
            });
        });
    }
} 

