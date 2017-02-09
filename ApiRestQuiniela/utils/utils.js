

canVoteGame = function(game) {
    var now = new Date();
    var gameDate = new Date(game.date);
    now.setHours(0, 0, 0, 0);
    gameDate.setHours(0, 0, 0, 0);
    if (gameDate <= now) {
        return true;
    }
    return false;

};
