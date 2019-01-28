var params = {};
location
    .search
    .substring(1)
    .split("&")
    .forEach(function (pair) {
        var p = pair.split("=");
        params[p[0]] = decodeURIComponent(p[1]);
    });

var botConnection = new BotChat.DirectLine({
    secret: 'NRmnsmwEKfs.cwA.yrU.4AdcTDTmH_qk0T-0SD6i_TLFBbUW3IE35R9o5_2g1PQ',
    token: params['t'],
    domain: params['domain'],
    webSocket: true
});

var bot = {
    id: params['botid'] || 'botid',
    name: params["botname"] || 'botname'
};

var logon_form = document.getElementById('logon-form');
var user_id = document.getElementById('user-id');

logon_form.onsubmit = e => {
    e.preventDefault();
    logon_form.style.display = 'none';

    var user = {
        id: localStorage['username'],
        name: localStorage['username']
	};

    BotChat.App({
        botConnection: botConnection,
        user: user,
        bot: bot,
    }, document.getElementById("BotChatGoesHere"));
};

