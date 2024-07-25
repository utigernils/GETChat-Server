checkBackendService();

function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}

function createMessage(title, content, sender) {
    var main = document.querySelector("messages");

    var message = document.createElement("div");
    message.className = "message";

    var messageMain = document.createElement("div");
    messageMain.className = "message-main";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 48 48");

    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M9.34 29.634a1.535 1.535 0 100-3.07 1.535 1.535 0 000 3.07zM13.945 12.747h17.4a1.023 1.023 0 100-2.047h-17.4a1.024 1.024 0 000 2.047zM13.945 20.934h17.4a1.023 1.023 0 100-2.047h-17.4a1.024 1.024 0 000 2.047zM9.34 13.258a1.535 1.535 0 100-3.07 1.535 1.535 0 000 3.07zM9.34 21.446a1.535 1.535 0 100-3.07 1.535 1.535 0 000 3.07z");
    path1.setAttribute("fill", "currentColor");

    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M47.08 16.49a3.182 3.182 0 00-.747-1.007l-.838-.849a3.246 3.246 0 00-2.366-1.01 3.25 3.25 0 00-2.332.996l-2.998 3.025V4.047c0-.547-.213-1.06-.6-1.447s-.9-.6-1.447-.6H5.047c-.547 0-1.06.213-1.447.6S3 3.5 3 4.047v39.915c0 .54.218 1.068.6 1.449.386.386.9.598 1.447.598h30.705c.547 0 1.061-.212 1.447-.598.38-.381.6-.909.6-1.449V28.994l8.585-8.69c.038-.03.074-.064.108-.1a3.304 3.304 0 00.909-2.43 3.3 3.3 0 00-.321-1.284zM35.752 43.963H5.047V4.047h30.705v15.662l-7.332 7.396c-.05-.008-.095-.03-.146-.03H13.945a1.024 1.024 0 000 2.047H26.42l-1.052 1.061a1.028 1.028 0 00-.24.38l-2.313 6.552a1.024 1.024 0 001.308 1.305l6.507-2.314c.145-.052.277-.136.385-.245l4.737-4.794v12.895zm9.525-25.597c-.05.13-.117.249-.205.357a.893.893 0 00-.05.047L29.724 34.256l-4.263 1.516 1.522-4.31 15.281-15.415a1.206 1.206 0 011.761.012l.902.91a1.272 1.272 0 01.35 1.397z");
    path2.setAttribute("fill", "currentColor");

    svg.appendChild(path1);
    svg.appendChild(path2);

    var messageContent = document.createElement("div");
    messageContent.className = "message-content";

    var messageTitle = document.createElement("h2");
    messageTitle.textContent = title;

    var messageText = document.createElement("p");
    messageText.textContent = content;

    messageContent.appendChild(messageTitle);
    messageContent.appendChild(messageText);

    var messageFooter = document.createElement("div");
    messageFooter.className = "message-footer";

    var senderInfo = document.createElement("p");
    senderInfo.textContent = "Gesendet von " + sender + " um " + getFormattedTime();

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Nachricht löschen";
    deleteButton.addEventListener("click", function() {
        message.remove();
    });

    messageFooter.appendChild(senderInfo);
    messageFooter.appendChild(deleteButton);

    messageMain.appendChild(svg);
    messageMain.appendChild(messageContent);

    message.appendChild(messageMain);
    message.appendChild(messageFooter);

    main.appendChild(message);

    setTimeout(function() {
        message.classList.add("shown");
    }, 1);

    window.scrollTo(0, document.body.scrollHeight);
}

function removeMessages() {
    var main = document.querySelector("messages");
    main.innerHTML = "";
}

function setServerState(stateMSG, stateCriticality) {
    var stateDisplay = document.querySelector("h4");
    var color;
    switch(stateCriticality) {
        case 'low':
            color = 'green';
            break;
        case 'medium':
            color = 'orange';
            break;
        case 'high':
            color = 'red';
            break;
        default:
            color = 'black';
    }
    stateDisplay.innerHTML = `GETChat von Utigernils | <span class="state-msg" style="color: ${color}">${stateMSG}</span>`;
}

function checkBackendService() {
    console.log("Überprüfen der Verbindung zum Backend...")
    try {
        if (eel.callMeBack() == null){
            console.log("erfolg!");
        }
    } catch (error) {
        console.log(error)
        setServerState("Backend-Service nicht aktiv", "high");
    }
}

eel.expose(setServerState);
eel.expose(createMessage);

document.getElementById("deleteAll").addEventListener("click", removeMessages);

setInterval(checkBackendService, 10000);

