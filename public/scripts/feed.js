define(function(require) {
    var common = require("./common");
    document.getElementById("special").onclick = common.logout;
    alert(common.getCookies().uid);
});


