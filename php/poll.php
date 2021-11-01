<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
$content = json_decode(file_get_contents("./poll_result.json"), true)[0];
$vote_updated = false;
if (isset($_GET["vote"]) && $_GET["vote"]) {addVote($_POST["vote_response"], $content);}

function addVote($vote_response, $content) {
    if (in_array($vote_response, $content)) {
        $content[$vote_response]++;
    } else {
        $error = "vote option does not exist";
    }
    $updated_vote = json_encode($dacontentta);
    file_put_contents('poll_result.json', $updated_vote);
    $vote_updated = true;
}

$poll_results["option_1"] = $content["option_1"];
$poll_results["option_2"] = $content["option_2"];

if (!isset($error)) {
    $data = [];
    $data["vote_results"] = $poll_results;
    if ($vote_updated) {
        $data["vote_updated"] = true;
    } else {
        $data["vote_updated"] = false;
    }
} else {
    $data[] = $error;
}

echo json_encode($data);
?>
