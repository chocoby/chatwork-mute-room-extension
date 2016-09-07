//@ sourceMappingURL=contentscript.map
(function() {
    var excludeRooms, handleDOM, timer, unreadRoomsName;

    excludeRooms = [];
    unreadRoomsName = [];

    timer = 0;

    getMentionCounts = function() {
        return $("#_roomListArea .mention").length;
    }

    getUnreadRoomsName = function() {
        var l_unreadRoomsName = $.map($("#_roomListItems .roomUnread .chatListTitleArea"), $.text);

        if (l_unreadRoomsName.length == 0) {
            l_unreadRoomsName = ["No message!"];
        }

        return l_unreadRoomsName;
    }

    setCustomTitle = function() {
        document.title = "[" + unreadRoomsName.length + "](" + getMentionCounts() + ") - " + unreadRoomsName.join("|");
    }

    handleDOM = function() {
        if (timer) {
            return;
        }
        timer = setTimeout(function() {
            unreadRoomsName = getUnreadRoomsName();

            $.each(excludeRooms, function(_, roomId) {
                var badgeDomObj, domObj, selector;

                selector = "#_roomListItems li[data-rid=" + roomId + "]";
                domObj = $(selector);
                if (domObj.length === 1) {
                    domObj = domObj[0];

                    unreadRoomsName.splice(unreadRoomsName.indexOf($(selector + " .chatListTitleArea").text()), 1);

                    $(domObj).removeClass("roomUnread");
                    badgeDomObj = $(domObj).find('.chatListMeta ul.incomplete');
                    if (badgeDomObj.length === 1) {
                        return badgeDomObj[0].remove();
                    }
                }
            });

            setCustomTitle();

            return timer = 0;
        }, 5);
        return null;
    };

    $(document).ready(function() {
        return chrome.runtime.sendMessage({
            mode: "initialize"
        }, function(response) {
            if (response.status === "success") {
                excludeRooms = response.options.excludeRooms;

                unreadRoomsName = getUnreadRoomsName();

                setCustomTitle();

                return $("#_roomListArea").on("DOMNodeInserted", function(event) {
                    return handleDOM();
                });
            }
        });
    });

}).call(this);
