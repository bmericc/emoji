<?php
include "emoji.class.php";

$str = "Nisan 󾮖 ";

$emoji = new Emoji();
$emojiName =  $emoji->covertEmojiToName($str);
echo $emoji->covertNameToEmoji($emojiName);



?>
