<?php
include_once 'findphone.php';

$ff = new Findphone();
$input = "1-HoMe-SWeEt-HOME";
$expecting = "1-4663-79338-4663";
$output = $ff->getPhone($input);
echo("input: $input<br>expecting: $expecting<br>output: $output");
?>