if (location.hash.indexOf("#access_token=") === 0) {
    localStorage.token = location.hash.substring(14, 99);
    localStorage.session = Date.now() + 86400;
    location.hash = "";
}

if (Date.now() <= parseInt(localStorage.session)) {
    $("#btn").hide();
    $.ajax({
        url: `https://api.vk.com/method/friends.search?order=random&count=5&fields=photo_200_orig&access_token=${localStorage.token}&v=5.103`,
        method: "GET",
        dataType: "JSONP",
        success: data => {
            let html = '';
            for (let i = 0; i < data.response.items.length; i++) {
                let friend = data.response.items[i];
                html +=
                    '<li>' +
                    '<div class="friend">' +
                    '<img src="' + friend.photo_200_orig + '\">' +
                    '<p>' + friend.first_name + ' ' + friend.last_name + '</p>' +
                    '</div>' +
                    '</li>';
            }
            $("#friends").html(html);
        }
    });
    $.ajax({
        url: `https://api.vk.com/method/users.get?access_token=${localStorage.token}&v=5.103`,
        method: "GET",
        dataType: "JSONP",
        success: data => {
            const btn = '<button type="button" onclick="localStorage.clear(); location.reload();" class="btn">Выйти</button>';
            $('#username').html('Привет, ' + data.response[0].first_name + ' ' + data.response[0].last_name + '! ' + btn).show();
        }
    });
}